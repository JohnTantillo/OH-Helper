"""
Author: Stephen Malinowski
Purpose: Server for OH-Helper Application
Technology: Contains both flask socketed and non-socketed connections

"""

from flask import Flask, make_response, Blueprint, send_file, send_from_directory, request, redirect
from pymongo import database
from database import MongoBase
from flask_sockets import Sockets
import sys
import json
from TicketQueue import Ticket
from TicketQueue import PriorityQueue


html = Blueprint(r'html', __name__, static_folder="oh-helper-frontend/build/", static_url_path="/")
ws = Blueprint(r'ws', __name__)
ALLOWED_EXTENSIONS = {'txt', 'pdf', 'png', 'jpg', 'jpeg', 'gif'}
student_queue = PriorityQueue([])

indexFilepath = "index.html"
@html.route('/')
def serveIndex():
    return html.send_static_file("index.html")

@html.route('/login', methods=(["post"]))
def loginHandle():
    print(request.json)
    Outcome = MongoBase.log_in(request.json["email"],request.json["password"])
    accType = Outcome[1] #Student/TA/Instructor
    Continue_to_page = Outcome[0] #True or False
    if Continue_to_page:
        print("Yeah It Login")
        user_info = MongoBase.Account_information_public(request.json["email"])  #[i["Name"], i["Ubit"], i["accType"]]
        return json.dumps({'Successful': True, 'AccType': accType, 'Username': user_info[0], 'Ubit': user_info[1]})
    else:
        print("Does Not Login")
        return json.dumps({'Successful': False, 'AccType': accType, 'Username': "NONE", 'Ubit': "NONE"}) #[i["Name"], i["Ubit"], i["accType"]]


@html.route('/password_reset', methods=(["post"]))
def Password_Reset_Handle():
    MongoBase.Password_Reset(request.json["email"], request.json["new_password"]) #Neel Plug your function name in here
    return json.dumps({"success":True})                                                                   #Also return a bool for your function here

@html.route('/getStudents', methods=(["post"]))
def studentGetter():
    Students = MongoBase.studentFind()
    return json.dumps(Students) #Format is "{'online_students': [studentObject]}"

 #This is an alternate version to cards
# @html.route('/new_card', methods=(["post"]))
# def New_Card():
#     Card_Person_Name = request.json["Name"]
#     Card_Issue = request.json["Issue"]
#     Card_Label = request.json["Label"]
#     #Tillos function call / jazz with these things
#     Cards.append({"Name": "Test", "Question": "Test Question", "Label": Card_Label}) #This is a sample appending



@html.route('/role', methods=(["post"])) #32
def roleHandle():
    MongoBase.accType_Update(request.json["email"], request.json["role"]) #ROLE NEEDS TO BE ALL LOWERCASE EITHER student OR teacher
    return json.dumps({"success" : True})

@html.route('/register', methods=(["post"]))
def registerHandle():
    print(request.json)
    MongoBase.register(request.json["email"],request.json["password"], request.json["accType"], request.json["name"], request.json["ubit"])
    return redirect('/login')

email_to_socket = {}
username_to_team = {}
list_of_sockets = []
socket_to_email = {}
Cards_Backlog = []


@ws.route('/connected')
def socket_connected(socket):
    print("Socket connected!", flush=True)

@ws.route('/websocket')
def socket_helper(socket):
    global Cards_Backlog
    list_of_sockets.append(socket)
    for ind_sockets in list_of_sockets:
        if not ind_sockets.closed:
            ind_sockets.send(json.dumps(student_queue.get_all_info())) #Send out current collection of cards # This may need to be changed to student_queue
    while not socket.closed:                            # While this socket is not closed do the following
        message = socket.receive()
        if message is not None:
            Message_Contents_Parsed = Message_Breakdown(message)
            for sock in list_of_sockets:
                if not sock.closed and Message_Contents_Parsed == 0:
                    sock.send(json.dumps(student_queue.get_all_info()))
                else:
                    sock.send(json.dumps(Message_Contents_Parsed)) # This represents the amount of Active TAs Returned as a JSON String
                    # sock.send(json.dumps({Cards_Backlog})) #tells all sockets to put this in.
    list_of_sockets.remove(socket)


#breaks down socket message and directs accordingly
def Message_Breakdown(message):
    global Cards_Backlog
    dejsonify = json.loads(message) #Takes message assuming it is not empty
    Card_Person_Name = dejsonify["Name"] #Breakdown of message contents
    Card_Issue = dejsonify["Issue"]
    Card_Label = dejsonify["Label"]
    Card_Action = dejsonify["Action"]
    #Tillos function call / jazz with these things
    #With the output getting sent in a message looking like the following #HEADS UP JOHN
    if Card_Action == "Remove":
        #Tillo Does Remove Here
        student_queue.admit_next()
        return 0
        # Cards_Backlog = [{"Name": Card_Person_Name, "Question": Card_Issue, "Label": Card_Label, "Priority": "1"}]
    if Card_Action == "Add":
        #Tillo Does Add Here
        Card_Label = MongoBase.cleansing([Card_Label])[0]
        Card_Person_Name = MongoBase.cleansing([Card_Person_Name])[0]
        Card_Issue = MongoBase.cleansing([Card_Issue])[0]
        tic = Ticket(Card_Label, Card_Person_Name, Card_Issue)
        student_queue.insert(tic)
        return 0
        # Cards_Backlog = [{"Name": Card_Person_Name, "Question": Card_Issue, "Label": Card_Label, "Priority": "1"}]
    if Card_Action == "Active TAs":
        TAs = MongoBase.studentFind()
        return TAs

app = Flask(__name__, static_folder="oh-helper-frontend/build/", static_url_path="/")
sockets = Sockets(app)
app.register_blueprint(html, url_prefix=r'/')
sockets.register_blueprint(ws, url_prefix=r'/')

# RUN THIS VERSION FOR LOCALHOST
# if __name__ == '__main__':
#     from gevent import pywsgi
#     from geventwebsocket.handler import WebSocketHandler
#     server = pywsgi.WSGIServer(('', 8000), app, handler_class=WebSocketHandler)
#     server.serve_forever()

#Run THIS VERSION FOR HEROKU

if __name__ == "__main__":
    from gevent import pywsgi
    from geventwebsocket.handler import WebSocketHandler
    port = int(sys.argv[1]) if len(sys.argv) > 1 else 5000
    server = pywsgi.WSGIServer(('', port), app, handler_class=WebSocketHandler)
    server.serve_forever()

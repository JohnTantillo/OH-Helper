"""
Author: Stephen Malinowski
Purpose: Server for OH-Helper Application
Technology: Contains both flask socketed and non-socketed connections

"""

from flask import Flask, make_response, Blueprint, send_file, send_from_directory, request, redirect
from database import MongoBase
from flask_sockets import Sockets
import sys
import json

html = Blueprint(r'html', __name__, static_folder="oh-helper-frontend/build/", static_url_path="/")
ws = Blueprint(r'ws', __name__)
ALLOWED_EXTENSIONS = {'txt', 'pdf', 'png', 'jpg', 'jpeg', 'gif'}


indexFilepath = "index.html"
@html.route('/')
def serve_index():
    return html.send_static_file("index.html")

@html.route('/login', methods=(["post"]))
def Login_handle():
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


@html.route('/role', methods=(["post"])) #32
def Role_handle():
    MongoBase.Role_Update(request.json["email"], request.json["role"])
    return True

@html.route('/register', methods=(["post"]))
def Register_handle():
    print(request.json)
    MongoBase.register(request.json["email"],request.json["password"], request.json["accType"], request.json["name"], request.json["ubit"])
    return redirect('/login')

email_to_socket = {}
username_to_team = {}
list_of_sockets = []
socket_to_email = {}
username_to_cookie = {}
cookie_to_email = {}

@ws.route('/websocket')
def socket_helper(socket):
    useremail = ""                                     #empty variable for tying socket to user_email & Lookups
    cookie_id = request.cookies.get('cookie_id')        #Cookie given from dunaske
    if cookie_id in cookie_to_email.keys():        #Searches for cookie in code
        useremail = cookie_to_email[cookie_id]
    else:
        return json.dumps({"ERROR": True})             #Cookie is not associated with any Username... which is a problem thus throw error
    email_to_socket[useremail] = socket              
    list_of_sockets.append(socket)                      #Keeps track of sockets
    socket_to_email[socket] = useremail
    users = list(email_to_socket.keys())                #Used to organize Amount of users, can be used to help with TAs being online as well
    for ind_sockets in list_of_sockets:                 #Broadcasts active users on connection immediatly
        if not ind_sockets.closed:
            ind_sockets.send(json.dumps({"users": users}))
    while not socket.closed:                            # While this socket is not closed do the following
        message = socket.receive()
        socket.send(json.dumps({"Status": "SOCKET CONNECTION WORKING"})) #Here will be where tillos pqueue is sending back stuff (most likely)
    email_to_socket.pop(useremail)                                       #Socket is done so now we are cleaning up old information.....   
    socket_to_email.pop(socket)
    list_of_sockets.remove(socket)

    
app = Flask(__name__, static_folder="oh-helper-frontend/build/", static_url_path="/")
sockets = Sockets(app)
app.register_blueprint(html, url_prefix=r'/')
sockets.register_blueprint(ws, url_prefix=r'/')


# RUN THIS VERSION FOR LOCALHOST
# if __name__ == '__main__':
#     app.run(host='0.0.0.0', port=8000,debug=True)

#Run THIS VERSION FOR HEROKU

if __name__ == "__main__":
    from gevent import pywsgi
    from geventwebsocket.handler import WebSocketHandler
    port = int(sys.argv[1]) if len(sys.argv) > 1 else 5000
    server = pywsgi.WSGIServer(('', port), app, handler_class=WebSocketHandler)
    server.serve_forever()
    

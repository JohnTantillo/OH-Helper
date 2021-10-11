from flask import Flask, make_response, Blueprint, send_file, send_from_directory, request, redirect
from database import MongoBase
import sys
import json

html = Blueprint(r'html', __name__, static_folder="oh-helper-frontend/build/", static_url_path="/")
ALLOWED_EXTENSIONS = {'txt', 'pdf', 'png', 'jpg', 'jpeg', 'gif'}

indexFilepath = "index.html"
@html.route('/')
@html.route('/pages/register')
@html.route('/pages/main')
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
        return json.dumps({'Role': accType}) 
    else:
        print("Does Not Login")
        return html.send_static_file("index.html")



@html.route('/role', methods=(["post"])) #32
def Role_handle():
    MongoBase.Role_Update(request.json["email"], request.json["role"])
    return True


@html.route('/register', methods=(["post"]))
def Register_handle():
    print(request.json)
    MongoBase.register(request.json["email"],request.json["password"], request.json["accType"], request.json["name"], request.json["ubit"])
    return redirect('/login')

app = Flask(__name__, static_folder="oh-helper-frontend/build/", static_url_path="/")
app.register_blueprint(html, url_prefix=r'/')




# RUN THIS VERSION FOR LOCALHOST
# if __name__ == '__main__':
#     app.run(host='0.0.0.0', port=8000,debug=True)

#Run THIS VERSION FOR HEROKU

if __name__ == "__main__":
    port = int(sys.argv[1]) if len(sys.argv) > 1 else 5000
    print(port)
    app.run(host="0.0.0.0", port=port)

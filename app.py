from flask import Flask, make_response, Blueprint, send_file, send_from_directory, request, redirect
from flask_sockets import Sockets
import sys

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
    return ""

    
@html.route('/register', methods=(["post"]))
def Register_handle():
    return ""

app = Flask(__name__, static_folder="oh-helper-frontend/build/", static_url_path="/")
app.register_blueprint(html, url_prefix=r'/')

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8000,debug=True)

# app = Flask(__name__)

# @app.route('/') 
# def index():
#     total_viewers = MongoBase.Update_Statistics("Total_Users", 1)
#     return "Hello World! (CSE 442 Team Placeholder) there has been " + str(total_viewers) + " to the site"

# if __name__ == "__main__":
#     port = int(sys.argv[1]) if len(sys.argv) > 1 else 5000
#     print(port)
#     app.run(host="0.0.0.0", port=port)

from flask import Flask

app = Flask(__name__)

@app.route('/') 
def index():
    return 'Hello World! (CSE 442 Team Placeholder)'

app.run(host='0.0.0.0', port=8000)
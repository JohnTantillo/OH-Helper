from flask import Flask
from database import MongoBase

app = Flask(__name__)

@app.route('/') 
def index():
    total_viewers = MongoBase.Update_Statistics("Total_Users", 1)
    return 'Hello World! (CSE 442 Team Placeholder) there has been ' + str(total_viewers) + ' total viewers of the website'

app.run(host='0.0.0.0', port=8000)
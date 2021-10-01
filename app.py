from flask import Flask
from database import MongoBase
import sys

app = Flask(__name__)

@app.route('/') 
def index():
    total_viewers = MongoBase.Update_Statistics("Total_Users", 1)
    return "Hello World! (CSE 442 Team Placeholder) there has been " + str(total_viewers) + " to the site"

if __name__ == "__main__":
    port = int(sys.argv[1]) if len(sys.argv) > 1 else 5000
    print(port)
    app.run(host="0.0.0.0", port=port)

from flask import Flask

app = Flask(__name__)

import home
import weather
import calendar_route
import database_api
import wardrobe

if __name__ == '__main__':
   app.run(debug=True,host="0.0.0.0",port=80)
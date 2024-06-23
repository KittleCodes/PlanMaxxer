from flask import Flask

app = Flask(__name__)

import home
import weather
import calendar_route

if __name__ == '__main__':
   app.run(debug=True,host="127.0.0.1",port=7575)
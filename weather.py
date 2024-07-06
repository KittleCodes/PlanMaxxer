from __main__ import app
from flask import jsonify
import requests
import time
from dotenv import load_dotenv
load_dotenv()

import os
api_token = os.environ.get("api-token")

lastWeatherUpdate = 0

cachedWeather = {}

print(time.time())

@app.route('/weather')
def weather():
    return '''
<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <title>PlanMaxxer - Weather</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous">
    <style>
    ::-webkit-scrollbar {
        width: 10px;
    }

    ::-webkit-scrollbar-track {
        background: #f1f1f1; 
    }

    ::-webkit-scrollbar-thumb {
        background: #888; 
    }

    ::-webkit-scrollbar-thumb:hover {
        background: #555; 
    }
    .hour {
    	background-color: #8282ff;
        border-radius: 10px;
        padding: 1%;
        box-shadow: 0px 0px 5px 1px #8282ff;
        color: white;
        text-align: center;
        margin-bottom: 10px;
        margin-left: 5px;
        margin-right: 5px;
        min-width: 150px;
    }
    .hour img {
    	width: 50%;
    }
    .remove-all-margin {
        margin:0 !important;
        padding:0 !important;
    }
    </style>
  </head>
  <body>
    <nav class="navbar" style="background-color: #3bdddb;">
        <div class="container-fluid" >
            <span class="navbar-brand mb-0 h1">PlanMaxxer - Weather</span>
            <a class="nav-link" aria-current="page" href="/">Return Home</a>
        </div>
    </nav>
    <div id="loader" style="position: absolute;margin: auto;top: 0;right: 0;bottom: 0;left: 0;width: 100px;height: 100px;"><div class="spinner-grow" role="status"></div><div class="spinner-grow" role="status"></div><div class="spinner-grow" role="status"></div></div>
    <main id="main" class="flex-shrink-0" style="padding: 1%;display: none;">
    <div class="card">
        <div class="card-header" style="background-color: #6464e5; color: white;">
            <h3 class="card-title" id="address">Address</h3>
        </div>
        <div class="card-body" style="max-height: 300px; overflow-y: auto;background-color: #a8a8ff;">
            <div class="row flex-nowrap">
                <div class="col hour">
                    <img id="conditionImage" style="width: 57px;"></img>
                    <h4 id="condition">Condition</h4>
                    <h5 id="temperature">Temp</h5>
                </div>
                <div class="col hour">
                    <img src="/static/weatherIcons/feelslike.svg" style="width: 57px;"></img>
                    <h4>Feels Like</h4>
                    <h5 id="feelslike">0</h5>
                </div>
                <div class="col hour">
                    <img src="/static/weatherIcons/humidity.svg" style="width: 57px;"></img>
                    <h4>Humidity</h4>
                    <h5 id="humidity">0</h5>
                </div>
                <div class="col hour">
                    <img src="/static/weatherIcons/dewpoint.svg" style="width: 57px;"></img>
                    <h4>Dew Point</h4>
                    <h5 id="dewpoint">0</h5>
                </div>
                <div class="col hour">
                    <img src="/static/weatherIcons/rain.svg" style="width: 57px;"></img>
                    <h4>Rain</h4>
                    <h5 id="rain">0</h5>
                </div>
                <div class="col hour">
                    <img src="/static/weatherIcons/rainchance.svg" style="width: 57px;"></img>
                    <h4>Rain Chance</h4>
                    <h5 id="rainchance">0</h5>
                </div>
                <div class="col hour">
                    <img src="/static/weatherIcons/snow.svg" style="width: 57px;"></img>
                    <h4>Snow</h4>
                    <h5 id="snow">0</h5>
                </div>
                <div class="col hour">
                    <img src="/static/weatherIcons/snowdepth.svg" style="width: 57px;"></img>
                    <h4>Snow Depth</h4>
                    <h5 id="snowdepth">0</h5>
                </div>
                <div class="col hour">
                    <img src="/static/weatherIcons/windgust.svg" style="width: 57px;"></img>
                    <h4>Wind Gust</h4>
                    <h5 id="windgust">0</h5>
                </div>
                <div class="col hour">
                    <img src="/static/weatherIcons/windspeed.svg" style="width: 57px;"></img>
                    <h4>Wind Speed</h4>
                    <h5 id="windspeed">0</h5>
                </div>
                <div class="col hour">
                    <img src="/static/weatherIcons/winddir.svg" style="width: 57px;"></img>
                    <h4>Wind Direction</h4>
                    <h5 id="winddir">0</h5>
                    <h5 id="compass">0</h5>
                </div>
                <div class="col hour">
                    <img src="/static/weatherIcons/pressure.svg" style="width: 57px;"></img>
                    <h4>Pressure</h4>
                    <h5 id="pressure">0</h5>
                </div>
                <div class="col hour">
                    <img src="/static/weatherIcons/visibility.svg" style="width: 57px;"></img>
                    <h4>Visibility</h4>
                    <h5 id="visibility">0</h5>
                </div>
                <div class="col hour">
                    <img src="/static/weatherIcons/cloudcover.svg" style="width: 57px;"></img>
                    <h4>Cloud Cover</h4>
                    <h5 id="cloudcover">0</h5>
                </div>
                <div class="col hour">
                    <img src="/static/weatherIcons/uvindex.svg" style="width: 57px;"></img>
                    <h4>UV Index</h4>
                    <h5 id="uvindex">0</h5>
                </div>
            </div>
        </div>
    </div>
        <div class="container remove-all-margin" style="min-width: 100%;">
    <div class="card">
        <div class="card-header" style="background-color: #6464e5; color: white;">
            <h4 class="card-title">Hourly Weather Data</h4>
        </div>
        <div class="card-body" style="max-height: 300px; overflow-y: auto;background-color: #a8a8ff;">
            <div class="row flex-nowrap" id="hourly">
                <div class="col hour" id="hour-template" style="display: none;">
                    <h5 id="time">0:00:00</h5>
                    <p id="temp"><b>20°C</b></p>
                    <img id="status" src="">
                </div>
            </div>
        </div>
    </div>
    <div class="card">
        <div class="card-header" style="background-color: #6464e5; color: white;">
            <h4 class="card-title">15-Day Weather Data</h4>
        </div>
        <div class="card-body" style="max-height: 300px; overflow-y: auto;background-color: #a8a8ff;">
            <div class="row flex-nowrap" id="daily">
                <div class="col hour" id="day-template" style="display: none;">
                    <h5 id="time">0:00:00</h5>
                    <p id="temp"><b>20°C</b></p>
                    <img id="status" src="">
                </div>
            </div>
        </div>
    </div>
    </main>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz" crossorigin="anonymous"></script>
    <script src="/static/js/weather.js"></script>
  </body>
</html>
'''

@app.route('/weather/api/get-weather/<lat>/<lon>')
def weather_api(lat, lon):
    global lastWeatherUpdate
    global cachedWeather
    if lastWeatherUpdate + 300 <= time.time():
        # add check later for location so people dont run something silly
        request = requests.get(f"https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/{lat}%2C{lon}?unitGroup=us&key={api_token}&contentType=json", timeout=10)
        lastWeatherUpdate = time.time()
        cachedWeather = request.json()
        return jsonify(cachedWeather)
    else:
        return jsonify(cachedWeather)
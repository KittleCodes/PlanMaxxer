var $ = (id) => {return document.getElementById(id);}

const addressElement = $("address");
const hourlyElement = $("hourly");
const hourTemplateElement = $("hour-template");
const dailyElement = $("daily");
const dayTemplateElement = $("day-template");

const conditionImageElement = $("conditionImage");
const conditionElement = $("condition");
const temperatureElement = $("temperature");
const feelslikeElement = $("feelslike");
const humidityElement = $("humidity");
const dewpointElement = $("dewpoint");
const rainElement = $("rain");
const rainchanceElement = $("rainchance");
const snowElement = $("snow");
const snowdepthElement = $("snowdepth");
const windgustElement = $("windgust");
const windspeedElement = $("windspeed");
const winddirElement = $("winddir");
const compassElement = $("compass");
const pressureElement = $("pressure");
const visibilityElement = $("visibility");
const cloudcoverElement = $("cloudcover");
const uvindexElement = $("uvindex");

let current;

function Get(yourUrl){
    var Httpreq = new XMLHttpRequest();
    Httpreq.open("GET",yourUrl,false);
    Httpreq.send(null);
    return Httpreq.responseText;          
}

function formatTime(date) {
    let hours = date.getHours();
    let minutes = date.getMinutes();
    let ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12;

    minutes = minutes < 10 ? '0' + minutes : minutes;

    return hours + ':' + minutes + ' ' + ampm;
}

function degToCompass(num) {
    var val = Math.floor((num / 22.5) + 0.5);
    var arr = ["N", "NNE", "NE", "ENE", "E", "ESE", "SE", "SSE", "S", "SSW", "SW", "WSW", "W", "WNW", "NW", "NNW"];
    return arr[(val % 16)];
}

function showHourly(data, day)
{
    data.days[day].hours.forEach(hourData => {
        if (hourData.datetimeEpoch > current.datetimeEpoch) {
            const hourTime = new Date(hourData.datetimeEpoch*1000);
            const hourElement = hourTemplateElement.cloneNode(true);
            hourElement.style = "";
            hourElement.querySelector('#time').innerText = formatTime(hourTime);
            hourElement.querySelector('#temp').innerText = hourData.temp+"°F";
            hourElement.querySelector('#status').src = "/static/conditions/"+hourData.icon+".svg";
            hourlyElement.appendChild(hourElement);
        }
    });
}

function showDay(current)
{
    addressElement.innerText += " - "+new Date(current.datetimeEpoch*1000)
    conditionImageElement.src = "/static/conditions/"+current.icon+".svg";
    conditionElement.innerText = current.conditions;
    temperatureElement.innerText = current.temp+"°F";
    feelslikeElement.innerText = current.feelslike+"°F";
    humidityElement.innerText = current.humidity+"%";
    dewpointElement.innerText = current.dew+"°F";
    rainElement.innerText = current.precip+" in";
    rainchanceElement.innerText = current.precipprob+"%";
    snowElement.innerText = current.snow+" in";
    snowdepthElement.innerText = current.snowdepth+" in";
    windgustElement.innerText = current.windgust+" mph";
    windspeedElement.innerText = current.windspeed+" mph";
    winddirElement.innerText = current.winddir+"°";
    compassElement.innerText = degToCompass(current.winddir);
    pressureElement.innerText = current.pressure+" hPa";
    visibilityElement.innerText = current.visibility+" mi";
    cloudcoverElement.innerText = current.cloudcover+"%";
    uvindexElement.innerText = current.uvindex;

    hourTemplateElement.querySelector('#time').innerText = formatTime(new Date(current.datetimeEpoch*1000));
    hourTemplateElement.querySelector('#temp').innerText = current.temp+"°F"
    hourTemplateElement.querySelector('#status').src = "/static/conditions/"+current.icon+".svg"
}

function getWeather()
{
    var data = JSON.parse(Get("/weather/api"));

    addressElement.innerText = data.resolvedAddress;

    current = data.currentConditions;
    showDay(current);

    conditionImageElement.src = "/static/conditions/"+current.icon+".svg";
    conditionElement.innerText = current.conditions;
    temperatureElement.innerText = current.temp+"°F";
    feelslikeElement.innerText = current.feelslike+"°F";
    humidityElement.innerText = current.humidity+"%";
    dewpointElement.innerText = current.dew+"°F";
    rainElement.innerText = current.precip+" in";
    rainchanceElement.innerText = current.precipprob+"%";
    snowElement.innerText = current.snow+"%";
    snowdepthElement.innerText = current.snowdepth+" in";
    windgustElement.innerText = current.windgust+" mph";
    windspeedElement.innerText = current.windspeed+" mph";
    winddirElement.innerText = current.winddir+"°";
    compassElement.innerText = degToCompass(current.winddir);
    pressureElement.innerText = current.pressure+" hPa";
    visibilityElement.innerText = current.visibility+" mi";
    cloudcoverElement.innerText = current.cloudcover+"%";
    uvindexElement.innerText = current.uvindex;

    hourTemplateElement.querySelector('#time').innerText = formatTime(new Date(current.datetimeEpoch*1000));
    hourTemplateElement.querySelector('#temp').innerText = current.temp+"°F"
    hourTemplateElement.querySelector('#status').src = "/static/conditions/"+current.icon+".svg"

    showHourly(data, 0)

    data.days.forEach(dayData => {
        const dayTime = new Date(dayData.datetimeEpoch*1000);
        const dayElement = dayTemplateElement.cloneNode(true);
        dayElement.style = "";
        dayElement.querySelector('#time').innerText = dayTime.getMonth()+"/"+dayTime.getDate();
        dayElement.querySelector('#temp').innerText = dayData.temp+"°F";
        dayElement.querySelector('#status').src = "/static/conditions/"+dayData.icon+".svg";
        dailyElement.appendChild(dayElement);
        dayElement.addEventListener('click', function (event) { addressElement.innerText = data.resolvedAddress; showDay(dayData); showHourly(data, data.days.indexOf(dayData))  });
    });
}

getWeather();
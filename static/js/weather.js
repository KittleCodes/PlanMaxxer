var $ = (id) => {return document.getElementById(id);}

const loader = $("loader");
const main = $("main");

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
let status;
let viewingDate = new Date().getMonth()+"/"+new Date().getDate();

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
    const hourTemp = hourTemplateElement.cloneNode(true);
    hourlyElement.innerHTML = "";
    hourlyElement.appendChild(hourTemp);

    data.days[day].hours.forEach(hourData => {
        const hourTime = new Date(hourData.datetimeEpoch*1000);
        const hourElement = hourTemplateElement.cloneNode(true);
        hourElement.style = "";
        hourElement.querySelector('#time').innerText = formatTime(hourTime);
        hourElement.querySelector('#temp').innerText = hourData.temp+"°F";
        hourElement.querySelector('#status').src = "/static/conditions/"+hourData.icon+".svg";
        hourlyElement.appendChild(hourElement);
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
}

function getWeather()
{
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
        dayElement.id = dayTime.getMonth()+"/"+dayTime.getDate();
        dayElement.querySelector('#time').innerText = dayTime.getMonth()+1+"/"+dayTime.getDate();
        dayElement.querySelector('#temp').innerText = dayData.temp+"°F";
        dayElement.querySelector('#status').src = "/static/conditions/"+dayData.icon+".svg";
        dailyElement.appendChild(dayElement);

        dayElement.addEventListener('click', function (event) {
            addressElement.innerText = data.resolvedAddress;
            showDay(dayData);
            showHourly(data, data.days.indexOf(dayData));
            $(viewingDate).style = "background-color: #8282ff;";
            dayElement.style = "background-color: #6666d4;";
            viewingDate = dayElement.id;
        });
    });

    loader.style = "display: none;";
    main.style = "padding: 2%;";
}


var data;
function success(position) {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    
    data = JSON.parse(Get("/weather/api/get-weather/"+latitude+"/"+longitude));
    status = "";

    getWeather(data);
}
    
function error() {
    status = "Unable to retrieve your location";
}
    
if (!navigator.geolocation) {
    status = "Geolocation is not supported by your browser";
} else {
    status = "Locating…";
    navigator.geolocation.getCurrentPosition(success, error);
}
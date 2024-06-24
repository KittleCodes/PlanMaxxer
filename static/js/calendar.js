var $ = (id) => {return document.getElementById(id);}

const calendar = $("calendar");
const rowTemp = $("row");
const dayTemp = $("day");
const header = $("header");

let dayModal = new bootstrap.Modal('#dayModal', {});
let addEventModel = new bootstrap.Modal("#addEventModal", {});
let addEventButton = $("addEvent");

let lastmonth = $("lastmonth");
let nextmonth = $("nextmonth");
let lastyear = $("lastyear");
let nextyear = $("nextyear");

const date = new Date();
const currentMonth = date.getMonth();
const currentYear = date.getFullYear();

let viewingMonth = currentMonth;
let viewingYear = currentYear;

const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
];

function addLeadingZero(value) {
    return value < 10 ? '0' + value : value;
}

function Get(yourUrl){
    var Httpreq = new XMLHttpRequest();
    Httpreq.open("GET",yourUrl,false);
    Httpreq.send(null);
    return Httpreq.responseText;          
}

function containsSpecifiedDate(str, year, month, day) {
    let regex = new RegExp(`${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`);
    return regex.test(str);
}

function filterArraysWithSpecifiedDate(arrays, year, month, day) {
    return arrays.filter(array => 
        array.some(item => 
            typeof item === 'string' && containsSpecifiedDate(item, year, month, day)
        )
    );
}

function fillCalendar(month, year)
{
    currentDate = new Date(year, month);
      
    const monthName = monthNames[currentDate.getMonth()];
    const year1 = currentDate.getFullYear();
      
    const formattedDate = `${monthName}, ${year1}`;
    header.innerText = formattedDate;
    let firstDay = (new Date(year, month)).getDay();
    let daysInMonth = 32 - new Date(year, month, 32).getDate();

    var row = rowTemp.cloneNode(true);
    [...document.getElementsByClassName("dayrow")].map(n => n && n.remove());
    calendar.appendChild(row);

    for (i = 0; i < firstDay; i++)
    {
        const day = dayTemp.cloneNode(true);
        day.style = "";
        day.querySelector('#date').innerText = "";
        day.querySelector('#expand').src = "";
        day.querySelector('#addevent').src = "";
        day.querySelector('#events').innerText = "";
        row.appendChild(day);
    }

    for (let days = 1; days <= daysInMonth; days++) {
        if ((firstDay + days - 1) % 7 === 0) {
            row = rowTemp.cloneNode(true);
            row.innerHTML = "";
            calendar.appendChild(row);
        }
        let day = dayTemp.cloneNode(true);
        day.style = "";

        if (year == currentYear && month == currentMonth && days == date.getDate())
        {
            day.style = "background-color: #a8a8f7;";
        }

        let filteredArrays = filterArraysWithSpecifiedDate(data, year, month, days);
        if (filteredArrays.length > 0)
        {
            day.querySelector("#events").querySelector("#event").innerText = "";
            for (let i = 0; i < filteredArrays.length; i++) {
                let event = day.querySelector("#events").querySelector("#event").cloneNode(true);
                event.innerText = filteredArrays[i][1];
                event.style = "background-color: "+filteredArrays[i][7]+"; border-radius: 100px; margin-bottom: 5px;";
                day.querySelector("#events").appendChild(event);
            };
        }
        day.querySelector("#date").innerText = days;
        row.appendChild(day);
    }

    for (days = row.childElementCount; days < 7; days++)
    {
        const day = dayTemp.cloneNode(true);
        day.style = "";
        day.querySelector('#date').innerText = "";
        day.querySelector('#expand').src = "";
        day.querySelector('#addevent').src = "";
        day.querySelector('#events').innerText = "";
        row.appendChild(day);
    }
}

var data = JSON.parse(Get("/db/calendar/events"));
console.log(data);

fillCalendar(currentMonth, currentYear);

lastmonth.onclick = () => 
{
    viewingMonth -= 1;
    fillCalendar(viewingMonth, viewingYear);
}
nextmonth.onclick = () => 
{
    viewingMonth += 1;
    fillCalendar(viewingMonth, viewingYear);
}
lastyear.onclick = () => 
{
    viewingYear -= 1;
    fillCalendar(viewingMonth, viewingYear);
}
nextyear.onclick = () => 
{
    viewingYear += 1;
    fillCalendar(viewingMonth, viewingYear);
}

$("dayModal").addEventListener('show.bs.modal', event => {
    const parent = event.relatedTarget.parentElement;
    const child = parent.querySelector('#date');
    $("modal-date").innerText = viewingMonth + "/" + child.innerText + "/" + viewingYear;

    [...document.getElementsByClassName("temporary")].map(n => n && n.remove());

    let filteredArrays = filterArraysWithSpecifiedDate(data, viewingYear, viewingMonth, child.innerText);

    if (filteredArrays.length > 0)
    {
        //day.querySelector("#events-body").querySelector("#event-card").innerText = "";

        for (let i = 0; i < filteredArrays.length; i++) {
            let event = $("events-body").querySelector("#event-card").cloneNode(true);
            event.style = "";
            event.classList.add("temporary");
            event.querySelector(".card-header").style = "background-color: "+filteredArrays[i][7]+";";
            event.querySelector("#event-title").innerText = filteredArrays[i][1];
            event.querySelector("#event-description").innerText = filteredArrays[i][2];
            //event.innerText = filteredArrays[i][1];
            //event.style = "background-color: "+filteredArrays[i][7]+"; border-radius: 100px; margin-bottom: 5px;";
            $("events-body").appendChild(event);
        };
    }
});

$("addEventModal").addEventListener('show.bs.modal', event => {
    const dateParent = event.relatedTarget.parentElement.parentElement;
    const dateElement = dateParent.querySelector('#date');
    $("in-date").value = viewingYear+"-"+(addLeadingZero(viewingMonth))+"-"+(addLeadingZero(dateElement.innerText))+"T00:00";
    $("in-date2").value = viewingYear+"-"+(addLeadingZero(viewingMonth))+"-"+(addLeadingZero(dateElement.innerText))+"T00:00";
});

addEventButton.onclick = () => {
    const in_name = $("in-name").value;
    const in_desc = $("in-desc").value;
    const in_date = $("in-date").value;
    const in_date2 = $("in-date2").value;
    const in_all_day = $("in-all_day").checked;
    console.log(in_all_day);
    const in_repeat_option = $("in-repeat_option").value;
    const in_color = $("in-color").value;

    var xhr = new XMLHttpRequest();
    xhr.open("POST", "/db/calendar/add_event", true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(JSON.stringify({
        name: in_name,
        desc: in_desc,
        date: in_date,
        date2: in_date2,
        all_day: in_all_day,
        repeat_option: in_repeat_option,
        color: in_color
    }));

    addEventModel.hide();
    data = JSON.parse(Get("/db/calendar/events"));
    fillCalendar(viewingMonth, viewingYear);
}
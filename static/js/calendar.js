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

function checkEvents(year, month, day) {
    const matchingEvents = [];
    const searchDate = new Date(year+"/"+month+"/"+day);
    console.log(year + "/" + addLeadingZero(month) + "/" + addLeadingZero(day));
    console.log(searchDate);
    // Iterate through each event
    data.forEach(event => {
      const eventId = event[0];
      const eventName = event[1];
      const eventDescription = event[2];
      const startDateTime = new Date(event[3]);
      const endDateTime = event[4] !== "Never" ? new Date(event[4]) : null;
      const allDay = event[5];
      const repeat = event[6];
      const color = event[7];
  
      // Check if the event occurs on the specified day
      console.log("============================" + eventName);
      //console.log(startDateTime.getFullYear() + "/" + (startDateTime.getMonth() + 1) + "/" + startDateTime.getDate());
      //console.log(year + "/" + month + "/" + day);
      console.log(startDateTime.getDay())
      console.log(searchDate.getDay())
      console.log("============================");
      if (
        startDateTime.getFullYear() == year &&
        startDateTime.getMonth() + 1 == month &&
        startDateTime.getDate() == day
      ) {
        matchingEvents.push({
          eventId,
          eventName,
          eventDescription,
          startDateTime,
          endDateTime,
          allDay,
          color
        });
      }
  
      // Check for repeating events
      switch (repeat) {
        case 1: // Daily
          console.log(startDateTime)
          console.log(searchDate)
          if (
            startDateTime < searchDate
          ) {
            matchingEvents.push({
              eventId,
              eventName,
              eventDescription,
              startDateTime,
              endDateTime,
              allDay,
              color
            });
          }
          break;
        case 2: // Weekly
          if (
              startDateTime < searchDate &&
              startDateTime.getDay() == searchDate.getDay()
          ) {
            matchingEvents.push({
              eventId,
              eventName,
              eventDescription,
              startDateTime,
              endDateTime,
              allDay,
              color
            });
          }
          break;
        case 3: // Monthly
          if (
              startDateTime < searchDate &&
              startDateTime.getDate() == searchDate.getDate()
          ) {
            matchingEvents.push({
              eventId,
              eventName,
              eventDescription,
              startDateTime,
              endDateTime,
              allDay,
              color
            });
          }
          break;
        case 4: // Yearly
          if (
              startDateTime < searchDate &&
              startDateTime.getMonth() == searchDate.getMonth() &&
              startDateTime.getDate() == searchDate.getDate()
          ) {
            matchingEvents.push({
              eventId,
              eventName,
              eventDescription,
              startDateTime,
              endDateTime,
              allDay,
              color
            });
          }
          break;
        default:
          break;
      }
    });
  
    return matchingEvents;
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

function convertTo12HourFormat(dateTimeString) {
    // Create a new Date object from the dateTimeString
    let dateObj = new Date(dateTimeString);

    // Extract hours and minutes from the date object
    let hours = dateObj.getHours();
    let minutes = dateObj.getMinutes();

    // Determine AM/PM and convert hours to 12-hour format
    let period = hours >= 12 ? 'PM' : 'AM';
    let hours12 = hours % 12;
    hours12 = hours12 === 0 ? 12 : hours12; // Convert 0 to 12 for midnight

    // Format the time as hh:mm AM/PM
    let formattedTime = hours12 + ':' + (minutes < 10 ? '0' : '') + minutes + ' ' + period;

    return formattedTime;
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

        let filteredArrays = checkEvents(year, month + 1, days);//filterArraysWithSpecifiedDate(data, year, month, days);
        console.log(filteredArrays);
        if (filteredArrays.length > 0)
        {
            day.querySelector("#events").querySelector("#event").innerText = "";
            for (let i = 0; i < filteredArrays.length; i++) {
                let event = day.querySelector("#events").querySelector("#event").cloneNode(true);
                event.innerText = filteredArrays[i].eventName;
                event.style = "background-color: "+filteredArrays[i].color+"; border-radius: 100px; margin-bottom: 5px;";
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
    $("modal-date").innerText = viewingMonth + 1 + "/" + child.innerText + "/" + viewingYear;

    [...document.getElementsByClassName("temporary")].map(n => n && n.remove());

    let filteredArrays = checkEvents(viewingYear, viewingMonth + 1, child.innerText);//filterArraysWithSpecifiedDate(data, viewingYear, viewingMonth, child.innerText);
    console.log(filteredArrays);
    if (filteredArrays.length > 0)
    {
        //day.querySelector("#events-body").querySelector("#event-card").innerText = "";

        for (let i = 0; i < filteredArrays.length; i++) {
            let event = $("events-body").querySelector("#event-card").cloneNode(true);
            event.style = "";
            event.classList.add("temporary");
            event.querySelector(".card-header").style = "background-color: "+filteredArrays[i].color+";";
            event.querySelector("#event-title").innerText = filteredArrays[i].eventName;
            event.querySelector("#event-description").innerText = filteredArrays[i].eventDescription;

            if (filteredArrays[i].allDay == "True")
            {
                event.querySelector("#event-time").innerText = "All Day"
            } else
            {
                event.querySelector("#event-time").innerText = convertTo12HourFormat(filteredArrays[i].startDateTime) + " - " + convertTo12HourFormat(filteredArrays[i].endDateTime);
            }
            //event.innerText = filteredArrays[i][1];
            //event.style = "background-color: "+filteredArrays[i][7]+"; border-radius: 100px; margin-bottom: 5px;";
            $("events-body").appendChild(event);
        };
    }
});

$("addEventModal").addEventListener('show.bs.modal', event => {
    const dateParent = event.relatedTarget.parentElement.parentElement;
    const dateElement = dateParent.querySelector('#date');
    $("in-date").value = viewingYear+"-"+(addLeadingZero(viewingMonth + 1))+"-"+(addLeadingZero(dateElement.innerText))+"T00:00";
    $("in-date2").value = viewingYear+"-"+(addLeadingZero(viewingMonth + 1))+"-"+(addLeadingZero(dateElement.innerText))+"T00:00";
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
    xhr.open("POST", "/db/calendar/add-event", true);
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
var $ = (id) => {return document.getElementById(id);}

const calendar = $("calendar");
const rowTemp = $("row");
const dayTemp = $("day");
const header = $("header");

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

        day.querySelector("#date").innerText = days;
        row.appendChild(day);
    }

    for (days = row.childElementCount; days < 7; days++)
    {
        const day = dayTemp.cloneNode(true);
        day.style = "";
        day.querySelector('#date').innerText = "";
        day.querySelector('#events').innerText = "";
        row.appendChild(day);
    }
}

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
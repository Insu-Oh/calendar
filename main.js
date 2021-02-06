var date = new Date();

var month = date.getMonth();
var year = date.getFullYear();
var day = date.getDate();

date = new Date(2021, month, 1);

var weekdays = new Array();
weekdays[0] = 'Sunday';
weekdays[1] = 'Monday';
weekdays[2] = 'Tuesday';
weekdays[3] = 'Wednesday';
weekdays[4] = 'Thursday';
weekdays[5] = 'Friday';
weekdays[6] = 'Saturday';

var firstDay = new Date(year, month, 1);
var lastDay = new Date(year, month + 1, 0);

window.onload = function () {
  setDate();
  display();
};

function setDate() {
  //year
  const yearIndi = document.querySelector('.yearIndi');
  const monthIndi = document.querySelector('.monthIndi');

  var monthName;

  switch (month) {
    case 0:
      monthName = 'Jan';
      break;
    case 1:
      monthName = 'Feb';
      break;
    case 2:
      monthName = 'Mar';
      break;
    case 3:
      monthName = 'Apr';
      break;
    case 4:
      monthName = 'May';
      break;
    case 5:
      monthName = 'Jun';
      break;
    case 6:
      monthName = 'Jul';
      break;
    case 7:
      monthName = 'Aug';
      break;
    case 8:
      monthName = 'Sep';
      break;
    case 9:
      monthName = 'Oct';
      break;
    case 10:
      monthName = 'Nov';
      break;
    case 11:
      monthName = 'Dec';
      break;
  }

  yearIndi.innerHTML = year;
  monthIndi.innerHTML = monthName;
}

function displayNext() {
  month++;
  date = new Date(year, month, 1);
  firstDay = new Date(year, month, 1);
  lastDay = new Date(year, month + 1, 0);
  if (month > 11) {
    date = new Date(year, month, 1);
    firstDay = new Date(year, month, 1);
    lastDay = new Date(year, month + 1, 0);
    year++;
    month = 0;
  }
  display();
  setDate();
}

function displayPre() {
  month--;
  date = new Date(year, month, 1);
  firstDay = new Date(year, month, 1);
  lastDay = new Date(year, month + 1, 0);
  if (month < 0) {
    date = new Date(year, month, 1);
    firstDay = new Date(year, month, 1);
    lastDay = new Date(year, month + 1, 0);
    year--;
    month = 11;
  }
  display();
  setDate();
}

function display() {
  var preDays = firstDay.getDay();
  const dayField = document.querySelector('.days');

  //reset calendar
  dayField.innerHTML = '';

  //display pre-days
  for (var i = 0; i < preDays; i++) {
    dayField.innerHTML += `<div class="pre-day">-</div>`;
  }

  //display days
  var numDays = lastDay.getDate(); //number of days
  for (var i = 0; i < numDays; i++) {
    dayField.innerHTML += `<div id="${year},${month + 1},${
      i + 1
    }" onclick="openPopup(${year},${month},${i + 1})">${i + 1} </div>`;
  }

  //display schedule
  for (var i = 0; i < schedule.length; i++) {
    if (schedule[i].Year === year && schedule[i].Month === month + 1) {
      console.log('YES!');
      document.getElementById(
        `${schedule[i].Year},${schedule[i].Month},${schedule[i].Day}`
      ).innerHTML += `${schedule[i].Content}, `;
    }
  }
  //display next days
  var numNexDay = 42 - numDays - preDays;
  for (var i = 0; i < numNexDay; i++) {
    dayField.innerHTML += `<div class="next-day">-</div>`;
  }
}

function reset() {
  date = new Date();
  month = date.getMonth();
  year = date.getFullYear();
  day = date.getDate();
  firstDay = new Date(year, month, 1);
  lastDay = new Date(year, month + 1, 0);
  display();
  setDate();
}

var schedule = [];
const conInput = document.getElementById('content');
const btn = document.getElementById('addBtn');

function addSch(y, m, d, c) {
  schedule.push({
    Year: y,
    Month: m,
    Day: d,
    Content: c,
  });
  console.log(schedule);
  display();
}

function openPopup(y, m, d) {
  let Year = y;
  let Month = m;
  let Day = d;
  document.querySelector('.popupContainer').style.display = 'flex';
  document.getElementById('dayIndi').innerHTML = `${Year} / ${Month} / ${Day}`;
  btn.addEventListener('click', function () {
    addSch(parseInt(Year), parseInt(Month + 1), parseInt(Day), conInput.value);
    document.querySelector('.popupContainer').style.display = 'none';
  });
}

var date = new Date();

var month = date.getMonth();
var year = date.getFullYear();
var day = date.getDate();

var color0 = '#fff';
var color1 = '#333';

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

var schedule = [];
window.onload = function () {
  if (JSON.parse(localStorage.getItem('schedule') != null)) {
    schedule = JSON.parse(localStorage.getItem('schedule'));
  }
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
  var cur = new Date();
  var curMonth = cur.getMonth();
  var curYear = cur.getFullYear();
  var numDays = lastDay.getDate(); //number of days
  for (var i = 0; i < numDays; i++) {
    if (day === i + 1 && month === curMonth && year === curYear) {
      dayField.innerHTML += `<div class="today" id=${year},${month + 1},${
        i + 1
      }" onclick="openPopup(${year},${month + 1},${i + 1})">${i + 1} </div>`;
    } else {
      dayField.innerHTML += `<div id="${year},${month + 1},${
        i + 1
      }" onclick="openPopup(${year},${month + 1},${i + 1})">${i + 1} </div>`;
    }
  }

  //display schedule
  for (var i = 0; i < schedule.length; i++) {
    if (schedule[i].Year === year && schedule[i].Month === month + 1) {
      document.getElementById(
        `${schedule[i].Year},${schedule[i].Month},${schedule[i].Day}`
      ).innerHTML += ` / ${schedule[i].Content}`;
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
  localStorage.setItem('schedule', JSON.stringify(schedule));
  display();
}
let Year;
let Month;
let Day;

const popup = document.querySelector('.popupContainer');
function openPopup(y, m, d) {
  Year = y;
  Month = m;
  Day = d;
  popup.style.display = 'flex';
  document.getElementById('dayIndi').innerHTML = `${Year} / ${Month} / ${Day}`;
  btn.addEventListener('click', add);
  document.addEventListener('keydown', function (e) {
    if (e.keyCode === 13 && popup.style.display === 'flex') {
      add();
    }
  });
  document.addEventListener('keydown', (e) => {
    if (e.keyCode === 27 && popup.style.display != 'none') {
      conInput.value = '';
      popup.style.display = 'none';
    }
  });
}

function add() {
  addSch(parseInt(Year), parseInt(Month), parseInt(Day), conInput.value);
  conInput.value = '';
  popup.style.display = 'none';
}

document.addEventListener('keydown', (e) => {
  if (e.keyCode === 37 && popup.style.display != 'flex') {
    displayPre();
  } else if (e.keyCode === 39 && popup.style.display != 'flex') {
    displayNext();
  } else if (e.keyCode === 27 && popup2.style.display != 'none') {
    popup2.style.display = 'none';
  }
});

function reverseBackground() {
  var container = document.querySelector('.container');
  console.log(container);
  container.style.backgroundColor = color0;
  container.style.color = color1;
}

function closePopup() {
  popup.style.display = 'none';
}

var popup2 = document.querySelector('.popupPreferences');

function openPopup2() {
  popup2.style.display = 'flex';
}

function closePopup2() {
  popup2.style.display = 'none';
}

function reset() {
  var resetConfrim = window.confirm('Are you sure?');
  if (resetConfrim) {
    localStorage.removeItem('schedule');
    location.reload();
  }
}

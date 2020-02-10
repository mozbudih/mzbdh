let today = new Date();
let currentMonth = today.getMonth();
let currentYear = today.getFullYear();
let selectYear = document.getElementById("year");
let selectMonth = document.getElementById("month");

let months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

let monthAndYear = document.getElementById("monthAndYear");
showCalendar(currentMonth, currentYear);


function next() {
    currentYear = (currentMonth === 11) ? currentYear + 1 : currentYear;
    currentMonth = (currentMonth + 1) % 12;
    showCalendar(currentMonth, currentYear);
}

function previous() {
    currentYear = (currentMonth === 0) ? currentYear - 1 : currentYear;
    currentMonth = (currentMonth === 0) ? 11 : currentMonth - 1;
    showCalendar(currentMonth, currentYear);
}

function jump() {
    currentYear = parseInt(selectYear.value);
    currentMonth = parseInt(selectMonth.value);
    showCalendar(currentMonth, currentYear);
}

function showCalendar(month, year) {
    // if (localStorage.getItem('2020011') !== null) {
    //     console.log("found");
    // }

    let firstDay = (new Date(year, month)).getDay();
    let daysInMonth = 32 - new Date(year, month, 32).getDate();

    let tbl = document.getElementById("calendar-body"); // body of the calendar

    // clearing all previous cells
    tbl.innerHTML = "";

    // filing data about month and in the page via DOM.
    monthAndYear.innerHTML = months[month] + " " + year;
    selectYear.value = year;
    selectMonth.value = month;

    // creating all cells
    let date = 1;
    for (let i = 0; i < 6; i++) {
        // creates a table row
        let row = document.createElement("tr");

        //creating individual cells, filing them up with data.
        for (let j = 0; j < 7; j++) {
            if (i === 0 && j < firstDay) {
                let cell = document.createElement('td');
                cell.setAttribute('style', 'height: 10vh');
                // cell.onclick = function()  {
                //     alert('Cell clicked');
                // };
                let cellText = document.createTextNode("");
                cell.appendChild(cellText);
                row.appendChild(cell);
            }
            else if (date > daysInMonth) {
                break;
            }

            else {
                let cell = document.createElement("td");
                cell.setAttribute('style', 'height: 10vh');

                // cell.setAttribute('id', String(year).concat(String(month), String(date)));
                idString = String(year) + String(month) + String(date);
                // idString="blabla";
                // console.log(idString);
                cell.setAttribute('id', idString);
                // cell.setAttribute('class', 'noFault')
                if (year <= today.getFullYear() && month <= today.getMonth() && date < today.getDate() && cell.getAttribute('class') != 'fault') {
                    if(localStorage.getItem(cell.id) !== null) {
                        cell.setAttribute('class', 'fault');
                    }
                    else {
                        cell.setAttribute('class', 'noFault');
                    
                    // cell.setAttribute('class', 'noFault')
                    }

                    cell.setAttribute('onClick', 'myFunction('+cell.id+')');
                    var drdList = document.createElement("div");
                    drdList.setAttribute('id', 'drop' + idString)
                    drdList.setAttribute('class', 'dropdown-content');
                    var link = document.createElement('a');
                    link.setAttribute('href', '#');
                    link.setAttribute('class', 'fault');
                    link.setAttribute('onClick', 'setFault('+cell.id+')')
                    link.innerText = "Issue(s)";
                    drdList.appendChild(link);
                    var link = document.createElement('a');
                    link.setAttribute('href', '#');
                    link.setAttribute('class', 'noFault');
                    link.setAttribute('onClick', 'setNoFault('+cell.id+')')
                    link.innerText = "Geen Issues";
                    drdList.appendChild(link);
                }
                else if (year < today.getFullYear() || month < today.getMonth()) {
                    if(localStorage.getItem(cell.id) !== null) {
                        cell.setAttribute('class', 'fault');
                    }
                    else {
                        cell.setAttribute('class', 'noFault');
                    
                    // cell.setAttribute('class', 'noFault')
                    }

                    cell.setAttribute('onClick', 'myFunction('+cell.id+')');
                    var drdList = document.createElement("div");
                    drdList.setAttribute('id', 'drop' + idString)
                    drdList.setAttribute('class', 'dropdown-content');
                    var link = document.createElement('a');
                    link.setAttribute('href', '#');
                    link.setAttribute('class', 'fault');
                    link.setAttribute('onClick', 'setFault('+cell.id+')')
                    link.innerText = "Issue(s)";
                    drdList.appendChild(link);
                    var link = document.createElement('a');
                    link.setAttribute('href', '#');
                    link.setAttribute('class', 'noFault');
                    link.setAttribute('onClick', 'setNoFault('+cell.id+')')
                    link.innerText = "Geen Issues";
                    drdList.appendChild(link);
                }

                let cellText = document.createTextNode(date);

                if (date === today.getDate() && year === today.getFullYear() && month === today.getMonth()) {
                    cell.classList.add("bg-info");
                } // color today's date
                cell.appendChild(cellText);
                cell.appendChild(drdList);
                row.appendChild(cell);
                date++;
            }


        }

        tbl.appendChild(row); // appending each row into calendar body.
    }

}

function myFunction(id) {
    // alert(id);
    document.getElementById('drop'+ id).classList.toggle("show");
  }

  function setNoFault(id) {
    //   $(id).setAttribute('class', 'noFault');
      document.getElementById(id).setAttribute('class', 'noFault');
      localStorage.removeItem(id);
  }

  function setFault(id) {
    document.getElementById(id).setAttribute('class', 'fault');
    localStorage.setItem(id, '');
}

window.onclick = function(event) {
    if (!event.target.matches('td')) {
        $('.dropdown-content.show').removeClass('show');
    }
}

//   window.onclick = function(event) {
//     if (!event.target.matches('.dropbtn')) {
//       var dropdowns = document.getElementsByClassName("dropdown-content");
//       var i;
//       for (i = 0; i < dropdowns.length; i++) {
//         var openDropdown = dropdowns[i];
//         if (openDropdown.classList.contains('show')) {
//           openDropdown.classList.remove('show');
//         }
//       }
//     }
//   }
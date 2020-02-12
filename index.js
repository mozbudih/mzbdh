window.onload = onLoad();
window.onload = scriptDelivery();
window.onload = loadSafety();


function onLoad() {
    $('td').each(function () {
        var id = this.getAttribute('id');
        var targetElm = document.getElementById(id);
        var thisID = localStorage.getItem(this.getAttribute('id'));
        if (thisID != null) {
            targetElm.innerHTML = thisID;
        }
    });
}

function scriptDelivery() {
    let tbl = document.getElementById("dateRow"); // body of the calendar

    let rows = ['C3A', 'C3B', 'C4A', 'C4B', 'F1', 'F2', 'Krypton', 'ACDoorgeef', 'ACEnkel', 'ACComecer',
        'ACVonGahlen', 'DS1', 'DS2', 'DS3', 'DS4', 'OvrJod', 'Iso1', 'Iso2', 'IsoSter', 'CU', 'HCKrypton', 'HCVonGahlen', 'HCComecer', 'FaclHVAC', 'FaclOverige', 'QC', 'IV'];

    let today = new Date();
    let currentMonth = today.getMonth();
    let currentYear = today.getFullYear();
    let selectYear = document.getElementById("year");
    let selectMonth = document.getElementById("month");

    let months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

    let monthAndYear = document.getElementById("monthAndYear1");

    $('#dateRow').nextAll().remove();
    month = currentMonth;
    year = currentYear;
    let daysInMonth = 32 - new Date(year, month, 32).getDate();

    monthAndYear.innerHTML = months[month] + " " + year;

    for (date = daysInMonth; date >= 1; date--) {
        let cell = document.createElement('td');
        let cellText = document.createTextNode(String(date));
        cell.appendChild(cellText);
        tbl.after(cell);
    }

    rows.forEach(function (item) {
        let mother = document.getElementById(String(item));

        $('#' + item).nextAll().remove();

        for (date = daysInMonth; date >= 1; date--) {
            let cell = document.createElement('td');
            cell.setAttribute('id', String(item) + String(year) + String(month) + String(date));
            let cellText = document.createTextNode("");
            cell.appendChild(cellText);
            mother.after(cell);

            if (year <= today.getFullYear() && month <= today.getMonth() && date < today.getDate()) {
                if (localStorage.getItem(cell.id) !== null) {
                    cell.setAttribute('class', 'fault');
                }
                else {
                    cell.setAttribute('class', 'noFault');
                }
            }
            else if (year < today.getFullYear() || month < today.getMonth()) {
                if (localStorage.getItem(cell.getAttribute("id")) !== null) {
                    cell.setAttribute('class', 'fault');
                }
                else {
                    cell.setAttribute('class', 'noFault');
                }
            }
        }
    });
}

function loadSafety() {
    let today = new Date();
    let currentMonth = today.getMonth();
    let currentYear = today.getFullYear();

    let months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

    let monthAndYear = document.getElementById("monthAndYear2");
    // showCalendar(currentMonth, currentYear);

    var month = currentMonth;
    var year = currentYear;

    monthAndYear.innerHTML = months[month] + " " + year;
    let firstDay = (new Date(year, month)).getDay();
    let daysInMonth = 32 - new Date(year, month, 32).getDate();

    let tbl = document.getElementById("calendar-body"); // body of the calendar

    // clearing all previous cells
    tbl.innerHTML = "";

    // filing data about month and in the page via DOM.
    monthAndYear.innerHTML = months[month] + " " + year;

    // creating all cells
    let date = 1;
    for (let i = 0; i < 6; i++) {
        // creates a table row
        let row = document.createElement("tr");

        //creating individual cells, filing them up with data.
        for (let j = 0; j < 7; j++) {
            if (i === 0 && j < firstDay) {
                let cell = document.createElement('td');
                // cell.setAttribute('style', 'height: 10vh');
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
                // cell.setAttribute('style', 'height: 10vh');

                // cell.setAttribute('id', String(year).concat(String(month), String(date)));
                idString = String(year) + String(month) + String(date);
                // idString="blabla";
                // console.log(idString);
                cell.setAttribute('id', idString);
                // cell.setAttribute('class', 'noFault')
                if (year <= today.getFullYear() && month <= today.getMonth() && date < today.getDate() && cell.getAttribute('class') != 'fault') {
                    if (localStorage.getItem(cell.id) !== null) {
                        cell.setAttribute('class', 'fault');
                    }

                    else {
                        cell.setAttribute('class', 'noFault');
                    }
                }
                else if (year < today.getFullYear() || month < today.getMonth()) {
                    if (localStorage.getItem(cell.id) !== null) {
                        cell.setAttribute('class', 'fault');
                    }
                    else {
                        cell.setAttribute('class', 'noFault');
                    }
                }

                let cellText = document.createTextNode(date);

                if (date === today.getDate() && year === today.getFullYear() && month === today.getMonth()) {
                    cell.classList.add("bg-info");
                } // color today's date
                cell.appendChild(cellText);
                // cell.appendChild(drdList);
                row.appendChild(cell);
                date++;
            }
        }
        tbl.appendChild(row); // appending each row into calendar body.
    }
}

// function showCalendar(month, year) {
//     // if (localStorage.getItem('2020011') !== null) {
//     //     console.log("found");
//     // }

//     let firstDay = (new Date(year, month)).getDay();
//     let daysInMonth = 32 - new Date(year, month, 32).getDate();

//     let tbl = document.getElementById("calendar-body"); // body of the calendar

//     // clearing all previous cells
//     tbl.innerHTML = "";

//     // filing data about month and in the page via DOM.
//     monthAndYear.innerHTML = months[month] + " " + year;
//     selectYear.value = year;
//     selectMonth.value = month;

//     // creating all cells
//     let date = 1;
//     for (let i = 0; i < 6; i++) {
//         // creates a table row
//         let row = document.createElement("tr");

//         //creating individual cells, filing them up with data.
//         for (let j = 0; j < 7; j++) {
//             if (i === 0 && j < firstDay) {
//                 let cell = document.createElement('td');
//                 cell.setAttribute('style', 'height: 10vh');
//                 // cell.onclick = function()  {
//                 //     alert('Cell clicked');
//                 // };
//                 let cellText = document.createTextNode("");
//                 cell.appendChild(cellText);
//                 row.appendChild(cell);
//             }
//             else if (date > daysInMonth) {
//                 break;
//             }

//             else {
//                 let cell = document.createElement("td");
//                 cell.setAttribute('style', 'height: 10vh');

//                 // cell.setAttribute('id', String(year).concat(String(month), String(date)));
//                 idString = String(year) + String(month) + String(date);
//                 // idString="blabla";
//                 // console.log(idString);
//                 cell.setAttribute('id', idString);
//                 // cell.setAttribute('class', 'noFault')
//                 if (year <= today.getFullYear() && month <= today.getMonth() && date < today.getDate() && cell.getAttribute('class') != 'fault') {
//                     if (localStorage.getItem(cell.id) !== null) {
//                         cell.setAttribute('class', 'fault');
//                     }
//                     else {
//                         cell.setAttribute('class', 'noFault');

//                         // cell.setAttribute('class', 'noFault')
//                     }

//                     cell.setAttribute('onClick', 'myFunction(' + cell.id + ')');
//                     var drdList = document.createElement("div");
//                     drdList.setAttribute('id', 'drop' + idString)
//                     drdList.setAttribute('class', 'dropdown-content');
//                     var link = document.createElement('a');
//                     link.setAttribute('href', '#');
//                     link.setAttribute('class', 'fault');
//                     link.setAttribute('onClick', 'setFault(' + cell.id + ')')
//                     link.innerText = "Issue(s)";
//                     drdList.appendChild(link);
//                     var link = document.createElement('a');
//                     link.setAttribute('href', '#');
//                     link.setAttribute('class', 'noFault');
//                     link.setAttribute('onClick', 'setNoFault(' + cell.id + ')')
//                     link.innerText = "Geen Issues";
//                     drdList.appendChild(link);
//                 }
//                 else if (year < today.getFullYear() || month < today.getMonth()) {
//                     if (localStorage.getItem(cell.id) !== null) {
//                         cell.setAttribute('class', 'fault');
//                     }
//                     else {
//                         cell.setAttribute('class', 'noFault');

//                         // cell.setAttribute('class', 'noFault')
//                     }

//                     cell.setAttribute('onClick', 'myFunction(' + cell.id + ')');
//                     var drdList = document.createElement("div");
//                     drdList.setAttribute('id', 'drop' + idString)
//                     drdList.setAttribute('class', 'dropdown-content');
//                     var link = document.createElement('a');
//                     link.setAttribute('href', '#');
//                     link.setAttribute('class', 'fault');
//                     link.setAttribute('onClick', 'setFault(' + cell.id + ')')
//                     link.innerText = "Issue(s)";
//                     drdList.appendChild(link);
//                     var link = document.createElement('a');
//                     link.setAttribute('href', '#');
//                     link.setAttribute('class', 'noFault');
//                     link.setAttribute('onClick', 'setNoFault(' + cell.id + ')')
//                     link.innerText = "Geen Issues";
//                     drdList.appendChild(link);
//                 }

//                 let cellText = document.createTextNode(date);

//                 if (date === today.getDate() && year === today.getFullYear() && month === today.getMonth()) {
//                     cell.classList.add("bg-info");
//                 } // color today's date
//                 cell.appendChild(cellText);
//                 cell.appendChild(drdList);
//                 row.appendChild(cell);
//                 date++;
//             }


//         }

//         tbl.appendChild(row); // appending each row into calendar body.
//     }

// }
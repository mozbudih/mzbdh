let tbl = document.getElementById("dateRow"); // body of the calendar

let rows = ['C3A', 'C3B', 'C4A', 'C4B', 'F1', 'F2', 'Krypton', 'ACDoorgeef', 'ACEnkel', 'ACComecer', 
    'ACVonGahlen', 'DS1', 'DS2', 'DS3', 'DS4', 'OvrJod', 'Iso1', 'Iso2', 'IsoSter', 'CU', 'HCKrypton', 'HCVonGahlen', 'HCComecer', 'FaclHVAC', 'FaclOverige', 'QC', 'IV'];

let today = new Date();
let currentMonth = today.getMonth();
let currentYear = today.getFullYear();
let selectYear = document.getElementById("year");
let selectMonth = document.getElementById("month");
 
let months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

let monthAndYear = document.getElementById("monthAndYear");
drawTable(currentMonth, currentYear);

function next() {
    currentYear = (currentMonth === 11) ? currentYear + 1 : currentYear;
    currentMonth = (currentMonth + 1) % 12;
    drawTable(currentMonth, currentYear);
}

function previous() {
    currentYear = (currentMonth === 0) ? currentYear - 1 : currentYear;
    currentMonth = (currentMonth === 0) ? 11 : currentMonth - 1;
    drawTable(currentMonth, currentYear);
}

function jump() {
    currentYear = parseInt(selectYear.value);
    currentMonth = parseInt(selectMonth.value);
    drawTable(currentMonth, currentYear);
}

function drawTable (month, year) {  
    // alert(today.getDay());
    // alert(today);

    // console.log("Month: " + month);
    // Remove shits
    // $('#dateRow').nextAll().remove();
    $('#dateRow').nextAll().remove();

    // console.log()

    // alert(String(year) + String(month));
    let daysInMonth = 32 - new Date(year, month, 32).getDate();
    // alert(daysInMonth);

    monthAndYear.innerHTML = months[month] + " " + year;
    // selectYear.value = year;
    // selectMonth.value = month;

    // tbl.innerHTML = "";
    // let row;
    for (date = daysInMonth; date >= 1; date--) {
        let cell = document.createElement('td');
        let cellText = document.createTextNode(String(date));
        cell.appendChild(cellText);
        // row += cell;
        tbl.after(cell);
    }
    // tbl.after(row);

    rows.forEach(function (item) {
        let mother = document.getElementById(String(item));

        $('#' + item).nextAll().remove();

        for (date = daysInMonth; date >= 1; date--) {
            // alert(d);

            // if(date.getDate)
            // console.log(date.getDate());
            // date.getDate();
           
            // Remove things

            // mother.innerHTML = "";
            let cell = document.createElement('td');
            cell.setAttribute('id', String(item) + String(year) + String(month) + String(date) );
            // cell.onclick = function() {
            //     alert(cell.getAttribute('id'));
            // };
            let cellText = document.createTextNode("");
            cell.appendChild(cellText);
            mother.after(cell);

          
            if (year <= today.getFullYear() && month <= today.getMonth() && date < today.getDate()) {
                cell.setAttribute('onClick', 'showDropList("'+cell.getAttribute("id")+'")');

                if(localStorage.getItem(cell.id) !== null) {
                    cell.setAttribute('class', 'fault');
                }
                else {
                    cell.setAttribute('class', 'noFault');
                
                // cell.setAttribute('class', 'noFault')

                }
            }
            else if (year < today.getFullYear() || month < today.getMonth()) {
                cell.setAttribute('onClick', 'showDropList("'+cell.getAttribute("id")+'")');

                if(localStorage.getItem(cell.getAttribute("id")) !== null) {
                    cell.setAttribute('class', 'fault');
                }
                else {
                    cell.setAttribute('class', 'noFault');
                
                // cell.setAttribute('class', 'noFault')
                }
            }

            // cell.setAttribute('onClick', 'showDropList("'+cell.getAttribute("id")+'")');
            // cell.onclick = function() {
            //     showDropList(cell.id);
            // }
            // cell.setAttribute('onClick', "alert(' String(cell.id) ')");
            var drdList = document.createElement("div");
            drdList.setAttribute('id', 'drop' + String(cell.getAttribute('id')));
            drdList.setAttribute('class', 'dropdown-content');

            // var link = document.createElement('a');
            // link.setAttribute('href', '#');
            // link.setAttribute('class', 'fault');
            // link.setAttribute('onClick', 'setFault("'+cell.getAttribute("id")+'")');
            // // link.onclick = setFault(String(cell.id));
            // link.innerText = "Issue(s)";
            // drdList.appendChild(link);

            var link = document.createElement('a');
            link.setAttribute('href', '#');
            link.setAttribute('class', 'noFault');
            link.setAttribute('onClick', 'setNoFault("'+cell.getAttribute("id")+'")');
            // link.onclick = setNoFault(String(cell.id));
            link.innerText = "Verwijder Issue";
            drdList.appendChild(link);

            var textInp = document.createElement('textarea');
            textInp.setAttribute('id', 'text' + cell.getAttribute('id'));            
            textInp.setAttribute('rows', '4');
            textInp.setAttribute('cols', '50');
            textInp.innerHTML = localStorage.getItem(String(cell.getAttribute('id')))
            drdList.appendChild(textInp);

            var btnSubmit = document.createElement('BUTTON');
            btnSubmit.setAttribute('class', 'btn btn-outline-primary');
            btnSubmit.innerHTML = "SUBMIT";
            btnSubmit.setAttribute('onclick', 'submitMelding("'+ cell.getAttribute('id') +'")');
            drdList.appendChild(btnSubmit);

            cell.appendChild(drdList);
        }
    });
}

function submitMelding(id) {
    var newText = document.getElementById('text' + id).value;
    localStorage.setItem(id, newText);
    drawTable(currentMonth, currentYear);
}

function showDropList(id) {
    if(! $('#drop' + id).hasClass('show')) {
        $('.dropdown-content.show').removeClass('show');
    }

    $('#drop' + id).addClass('show');
}

function setNoFault(id) {
    var ask = confirm("Verwijder Issue?");
    if (ask == true) {
        localStorage.removeItem(id);
        document.getElementById(id).setAttribute('class', 'noFault');
    }
    drawTable(currentMonth, currentYear);
}

function setFault(id) {
    localStorage.setItem(id, '');
    document.getElementById(id).setAttribute('class', 'fault');
}

function exportJson(){
    const btn = document.getElementById('btn-export');

    const filename = today.toISOString() + '.json';
    const jsonStr = JSON.stringify(localStorage, null, 4);
    
    btn.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(jsonStr));
    btn.setAttribute('download', filename);

    btn.click();
}

window.onclick = function(event) {
    if (event.target.matches('td') || event.target.matches('textarea')) {
    }
    else {
        $('.dropdown-content.show').removeClass('show');
    }
}

// var delay;
// var longpress = 800;

// window.addEventListener('mousedown', function (e) {
//     var _this = this;
//     delay = setTimeout(check, longpress);
    
//     function check() {
//         // _this.classList.add('is-selected');
//         alert(localStorage.getItem('DS1202014'))
//         // alert("LONGPRESSED");
//     }
    
//   }, true);
  
//   window.addEventListener('mouseup', function (e) {
//     // On mouse up, we know it is no longer a longpress
//     clearTimeout(delay);
//   });
  
//   window.addEventListener('mouseout', function (e) {
//     clearTimeout(delay);
//   });
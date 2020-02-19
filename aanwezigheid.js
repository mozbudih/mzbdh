let tbl = document.getElementById("dateRow"); // body of the calendar

let rows = ['EvdW', 'JoSe', 'CdK', 'RdBr', 'JSi', 'MBH', 'NvS', 'AW', 'HR', 'KHu', 'PV', 'DH', 'JvB', 'AnS', 'RRi', 'GL', 'DvdZ', 'PMo', 'HP', 'JC', 'HvB', 'HL'];

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

function drawTable(month, year) {

    // Remove shits
    $('#dateRow').nextAll().remove();

    //populate month and year
    monthAndYear.innerHTML = months[month] + " " + year;

    // find how many days in month
    let daysInMonth = 32 - new Date(year, month, 32).getDate();

    // Create date cells
    for (date = daysInMonth; date >= 1; date--) {
        let cell = document.createElement('td');
        let cellText = document.createTextNode(String(date));
        cell.appendChild(cellText);
        tbl.after(cell);
    };

    rows.forEach(function (item) {
        let mother = document.getElementById(String(item));

        $('#' + item).nextAll().remove();

        for (date = daysInMonth; date >= 1; date--) {

            //Create cells
            let cell = document.createElement('td');
            cell.setAttribute('id', String(item) + String(year) + String(month) + String(date));
            cell.classList.add('text-center')
            mother.after(cell);

            cell.setAttribute('onClick', 'showDropList("' + cell.getAttribute("id") + '")');

            // Weekend shades
            let dayDate = new Date(year, month, date).getDay();
            if (dayDate == 6 || dayDate == 0) {
                cell.classList.add('weekend');
            }

            var indLocStrg = localStorage.getItem(cell.getAttribute("id"));
            if (indLocStrg !== null) {
                switch (indLocStrg) {
                    case '1':
                        cell.classList.add('half-ochtend')
                        var icon = document.createElement("IMG");
                        icon.setAttribute('src', 'img/am.png');
                        icon.setAttribute('height', '20px');
                        cell.appendChild(icon);
                        break;
                    case '2':
                        cell.classList.add('half-middag');
                        var icon = document.createElement("IMG");
                        icon.setAttribute('src', 'img/pm.png');
                        icon.setAttribute('height', '20px');
                        cell.appendChild(icon);
                        break;
                    case '3':
                        cell.classList.add('ziek');
                        var icon = document.createElement("IMG");
                        icon.setAttribute('src', 'img/pharmacy.png');
                        icon.setAttribute('height', '20px');
                        cell.appendChild(icon);
                        break;
                    default:
                        cell.classList.add('vrij');
                        var icon = document.createElement("IMG");
                        icon.setAttribute('src', 'img/sun-umbrella.png');
                        icon.setAttribute('height', '20px');
                        cell.appendChild(icon);
                }
            }


            var drdList = document.createElement("div");
            drdList.setAttribute('id', 'drop' + String(cell.getAttribute('id')));
            drdList.setAttribute('class', 'dropdown-content');
            var link = document.createElement('a');
            link.setAttribute('href', '#');
            link.setAttribute('class', 'vrij');
            link.setAttribute('onClick', 'setFault("' + cell.getAttribute("id") + '")');
            link.innerText = "Vrij boeken";
            drdList.appendChild(link);

            var link = document.createElement('a');
            link.setAttribute('href', '#');
            link.setAttribute('class', 'half-ochtend');
            link.setAttribute('onClick', 'setHalfOchtend("' + cell.getAttribute("id") + '")');
            link.innerText = "Ochtend vrij";
            drdList.appendChild(link);

            var link = document.createElement('a');
            link.setAttribute('href', '#');
            link.setAttribute('class', 'half-middag');
            link.setAttribute('onClick', 'setHalfMiddag("' + cell.getAttribute("id") + '")');
            link.innerText = "Middag vrij";
            drdList.appendChild(link);

            var link = document.createElement('a');
            link.setAttribute('href', '#');
            link.setAttribute('class', 'ziek');
            link.setAttribute('onClick', 'setZiek("' + cell.getAttribute("id") + '")');
            link.innerText = "Ziek";
            drdList.appendChild(link);

            var link = document.createElement('a');
            link.setAttribute('href', '#');
            link.setAttribute('class', 'aanwezig');
            link.setAttribute('onClick', 'setNoFault("' + cell.getAttribute("id") + '")');
            link.innerText = "Verwijder boeking";
            drdList.appendChild(link);

            cell.appendChild(drdList);


        }
        // console.log(String(item));
    });

}

function showDropList(id) {
    console.log('show');
    if (!$('#drop' + id).hasClass('show')) {
        $('.dropdown-content.show').removeClass('show');
    }
    $('#drop' + id).toggleClass('show');
}

function setNoFault(id) {
    // console.log('nofault');
    localStorage.removeItem(id);
    document.getElementById(id).setAttribute('class', 'aanwezig');
    drawTable(currentMonth, currentYear);
}

function setFault(id) {
    // alert(String(id));
    localStorage.setItem(id, '');
    document.getElementById(id).setAttribute('class', 'vrij');
    drawTable(currentMonth, currentYear);
}

function setHalfOchtend(id) {
    // alert(String(id));
    localStorage.setItem(id, '1');
    document.getElementById(id).setAttribute('class', 'half-ochtend');
    drawTable(currentMonth, currentYear);
}

function setHalfMiddag(id) {
    // alert(String(id));
    localStorage.setItem(id, '2');
    document.getElementById(id).setAttribute('class', 'half-middag');
    drawTable(currentMonth, currentYear);
}

function setZiek(id) {
    // alert(String(id));
    localStorage.setItem(id, '3');
    document.getElementById(id).setAttribute('class', 'ziek');
    drawTable(currentMonth, currentYear);
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

function exportJson() {
    const btn = document.getElementById('btn-export');

    const filename = today.toISOString() + '.json';
    const jsonStr = JSON.stringify(localStorage, null, 4);

    btn.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(jsonStr));
    btn.setAttribute('download', filename);

    btn.click();
}

window.onclick = function (event) {
    if (event.target.matches('td') || event.target.matches('IMG')) {
    }
    else {
        $('.dropdown-content.show').removeClass('show');
    }
}
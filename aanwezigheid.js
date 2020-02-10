let tbl = document.getElementById("dateRow"); // body of the calendar

let rows = ['EvdW', 'JoSe', 'CdK', 'RdBr', 'JSi', 'MBH', 'NvS', 'AW', 'HR', 'KHu', 'PV', 'DH', 'JvB', 'AnS', 'RRi', 'GL', 'DvdZ', 'PMo', 'HP', 'JCo', 'HvB'];

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
    // Remove shits
    $('#dateRow').nextAll().remove();

    // alert(String(year) + String(month));
    let daysInMonth = 32 - new Date(year, month, 32).getDate();

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
    };
    // tbl.after(row);

    rows.forEach(function (item) {
        let mother = document.getElementById(String(item));

        $('#' + item).nextAll().remove();

        for (date = daysInMonth; date >= 1; date--) {
           
            let cell = document.createElement('td');
            cell.setAttribute('id', String(item) + String(year) + String(month) + String(date) );
            let cellText = document.createTextNode("");
            cell.appendChild(cellText);
            mother.after(cell);

            var indLocStrg = localStorage.getItem(cell.getAttribute("id"));

            if(indLocStrg !== null) {
                if (indLocStrg == '1') {
                    cell.setAttribute('class', 'half-ochtend');
                }
                else if(indLocStrg == '2') {
                    cell.setAttribute('class', 'half-middag')
                }
                else {
                    cell.setAttribute('class', 'vrij');
                }
            }
            else {
                cell.setAttribute('class', 'aanwezig');
            }

            // if (year <= today.getFullYear() && month <= today.getMonth() && date < today.getDate()) {
            //     // cell.setAttribute('onClick', 'showDropList("'+cell.getAttribute("id")+'")');

            //     if(localStorage.getItem(cell.id) !== null) {
            //         cell.setAttribute('class', 'vrij');
            //     }
            //     else {
            //         cell.setAttribute('class', 'aanwezig');
            //     }
            // }
            // else if (year < today.getFullYear() || month < today.getMonth()) {
            //     // cell.setAttribute('onClick', 'showDropList("'+cell.getAttribute("id")+'")');

            //     if(localStorage.getItem(cell.getAttribute("id")) !== null) {
            //         cell.setAttribute('class', 'vrij');
            //     }
            //     else {
            //         cell.setAttribute('class', 'aanwezig');
            //     }
            // }

            cell.setAttribute('onClick', 'showDropList("'+cell.getAttribute("id")+'")');

            var drdList = document.createElement("div");
            drdList.setAttribute('id', 'drop' + String(cell.getAttribute('id')));
            drdList.setAttribute('class', 'dropdown-content');
            var link = document.createElement('a');
            link.setAttribute('href', '#');
            link.setAttribute('class', 'vrij');
            link.setAttribute('onClick', 'setFault("'+cell.getAttribute("id")+'")');
            // link.onclick = setFault(String(cell.id));
            link.innerText = "Vrij boeken";
            drdList.appendChild(link);
            
            var link = document.createElement('a');
            link.setAttribute('href', '#');
            link.setAttribute('class', 'half-ochtend');
            link.setAttribute('onClick', 'setHalfOchtend("'+cell.getAttribute("id")+'")');
            // link.onclick = setNoFault(String(cell.id));
            link.innerText = "Ochtend vrij";
            drdList.appendChild(link);

            var link = document.createElement('a');
            link.setAttribute('href', '#');
            link.setAttribute('class', 'half-middag');
            link.setAttribute('onClick', 'setHalfMiddag("'+cell.getAttribute("id")+'")');
            // link.onclick = setNoFault(String(cell.id));
            link.innerText = "Middag vrij";
            drdList.appendChild(link);

            var link = document.createElement('a');
            link.setAttribute('href', '#');
            link.setAttribute('class', 'aanwezig');
            link.setAttribute('onClick', 'setNoFault("'+cell.getAttribute("id")+'")');
            // link.onclick = setNoFault(String(cell.id));
            link.innerText = "Verwijder vrij boeking";
            drdList.appendChild(link);

            cell.appendChild(drdList);


        }
        // console.log(String(item));
    });

}

function showDropList(id) {
// console.log('a');

    if(! $('#drop' + id).hasClass('show')) {
        $('.dropdown-content.show').removeClass('show');
    }

    $('#drop' + id).toggleClass('show');

    // console.log(String(id));
    // document.getElementById('drop'+ id).classList.addClass("show");
}

function setNoFault(id) {
    console.log('nofault');
    // alert(String(id));
 
      localStorage.removeItem(id);
      document.getElementById(id).setAttribute('class', 'aanwezig');
    
}

function setFault(id) {
    // alert(String(id));
    localStorage.setItem(id, '');
    document.getElementById(id).setAttribute('class', 'vrij');
}

function setHalfOchtend(id) {
    // alert(String(id));
    localStorage.setItem(id, '1');
    document.getElementById(id).setAttribute('class', 'half-ochtend');
}

function setHalfMiddag(id) {
    // alert(String(id));
    localStorage.setItem(id, '2');
    document.getElementById(id).setAttribute('class', 'half-middag');
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

function exportJson(){
    const btn = document.getElementById('btn-export');

    const filename = today.toISOString() + '.json';
    const jsonStr = JSON.stringify(localStorage, null, 4);
    
    btn.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(jsonStr));
    btn.setAttribute('download', filename);

    btn.click();
}

window.onclick = function(event) {
    if (!event.target.matches('td')) {
        $('.dropdown-content.show').removeClass('show');
    }
}
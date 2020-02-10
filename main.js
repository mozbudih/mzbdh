// $(document).ready(function() {

// $('#openacties-TS').Tabledit( {
// 	editButton: false,
// 	deleteButton: false,
// 	hideIdentifier: true,
// 	columns: {
// 		identifier: [0, 'id'],
// 		editable: [[2,'first'],[3,'last'],[3,'nickname']]
// 	}
// })

// });

// $(document).addEventListener('keydown', function (event) {
//   var esc = event.which == 27,
//       nl = event.which == 13,
//       el = event.target,
//       input = el.nodeName != 'INPUT' && el.nodeName != 'TEXTAREA',
//       data = {};


//   if (input) {
//     if (esc) {
//       // restore state
//       document.execCommand('undo');
//       el.blur();
//     } else if (nl) {
//       // save
//       data[el.getAttribute('data-name')] = el.innerHTML;

//       // we could send an ajax request to update the field
      
//       $.ajax({
//         url: window.location.toString(),
//         data: data,
//         type: 'post'
//       });
      
//       log(JSON.stringify(data));

//       el.blur();
//       event.preventDefault();
//     }
//   }
// }, true);

// function log(s) {
//   document.getElementById('debug').innerHTML = 'value changed to: ' + s;
// }

// function onLoad() {
// 	$("span").each(function() {
// 		if(this.getAttribute("contenteditable") == "true") {
// 			if(!window.localStorage[this.getAttribute("title")]) {
// 				document.getElementById(this.getAttribute("id")).innerHTML = '<input type="text" id="'+this.getAttribute("title")+'" placeholder="vul aantal in"><button name="'+this.getAttribute("title")+'" style = "float: right" onclick = "updateVal(this.name)">Opslaan</button>';
// 			}
// 			else {
// 					document.getElementById(this.getAttribute("id")).innerHTML = window.localStorage[this.getAttribute("title")];
// 					document.getElementById(this.getAttribute("id")).innerHTML += '<button name="'+this.getAttribute("title")+'" style = "float: right" onclick = "clearVal(this.name);">Change</button>';
// 			}
// 		}
// 	});
// }

window.onload = onLoad();
window.onload = scriptDelivery();

function onLoad() {
	$("span").each(function() {
		if(this.getAttribute("contenteditable") == "true") {
			if(!window.localStorage[this.getAttribute("title")]) {
				document.getElementById(this.getAttribute("id")).innerHTML = '<input type="text" id="'+this.getAttribute("title")+'" placeholder="vul aantal in"><button name="'+this.getAttribute("title")+'" style = "float: right" onclick = "updateVal(this.name)">Opslaan</button>';
			}
			else {
					document.getElementById(this.getAttribute("id")).innerHTML = window.localStorage[this.getAttribute("title")];
					// document.getElementById(this.getAttribute("id")).innerHTML += '<button name="'+this.getAttribute("title")+'" style = "float: right" onclick = "clearVal(this.name);">Change</button>';
			}
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

  let monthAndYear = document.getElementById("monthAndYear");

  $('#dateRow').nextAll().remove();
  month = currentMonth;
  year = currentYear;
  // drawTable(currentMonth, currentYear);

  let daysInMonth = 32 - new Date(year, month, 32).getDate();

  monthAndYear.innerHTML = months[month] + " " + year;

  for (date = daysInMonth; date >= 1; date--) {
    let cell = document.createElement('td');
    let cellText = document.createTextNode(String(date));
    cell.appendChild(cellText);
    // row += cell;
    tbl.after(cell);
  }

  rows.forEach(function (item) {
    let mother = document.getElementById(String(item));

    $('#' + item).nextAll().remove();

    for (date = daysInMonth; date >= 1; date--) {
       
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
            // cell.setAttribute('onClick', 'showDropList("'+cell.getAttribute("id")+'")');

            if(localStorage.getItem(cell.id) !== null) {
                cell.setAttribute('class', 'fault');
            }
            else {
                cell.setAttribute('class', 'noFault');
            
            // cell.setAttribute('class', 'noFault')

            }
        }
        else if (year < today.getFullYear() || month < today.getMonth()) {
            // cell.setAttribute('onClick', 'showDropList("'+cell.getAttribute("id")+'")');

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
        // var drdList = document.createElement("div");
        // drdList.setAttribute('id', 'drop' + String(cell.getAttribute('id')));
        // drdList.setAttribute('class', 'dropdown-content');

        // var link = document.createElement('a');
        // link.setAttribute('href', '#');
        // link.setAttribute('class', 'fault');
        // link.setAttribute('onClick', 'setFault("'+cell.getAttribute("id")+'")');
        // // link.onclick = setFault(String(cell.id));
        // link.innerText = "Issue(s)";
        // drdList.appendChild(link);

        // var link = document.createElement('a');
        // link.setAttribute('href', '#');
        // link.setAttribute('class', 'noFault');
        // link.setAttribute('onClick', 'setNoFault("'+cell.getAttribute("id")+'")');
        // // link.onclick = setNoFault(String(cell.id));
        // link.innerText = "Verwijder Issue";
        // drdList.appendChild(link);

        // var textInp = document.createElement('textarea');
        // textInp.setAttribute('id', 'text' + cell.getAttribute('id'));            
        // textInp.setAttribute('rows', '4');
        // textInp.setAttribute('cols', '50');
        // textInp.innerHTML = localStorage.getItem(String(cell.getAttribute('id')))
        // drdList.appendChild(textInp);

        // var btnSubmit = document.createElement('BUTTON');
        // btnSubmit.setAttribute('class', 'btn btn-outline-primary');
        // btnSubmit.innerHTML = "SUBMIT";
        // btnSubmit.setAttribute('onclick', 'newFunc("'+ cell.getAttribute('id') +'")');
        // drdList.appendChild(btnSubmit);
        



        // cell.appendChild(drdList);


    }
});
}

function drawTable (month, year) {

  // console.log("Month: " + month);
  // Remove shits
  $('#dateRow').nextAll().remove();

  // console.log()

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
  }
  // tbl.after(row);

  rows.forEach(function (item) {
      let mother = document.getElementById(String(item));

      $('#' + item).nextAll().remove();

      for (date = daysInMonth; date >= 1; date--) {
         
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
          btnSubmit.setAttribute('onclick', 'newFunc("'+ cell.getAttribute('id') +'")');
          drdList.appendChild(btnSubmit);
          



          cell.appendChild(drdList);


      }
  });

}
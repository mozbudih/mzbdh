function onLoad() {
	// $('td').each(function() {
	// 	if(this.getAttribute('class') == 'tabledit-view-mode') {
	// 		if(!window.localStorage[this.getAttribute("title")]) {
	// 			document.getElementById(this.getAttribute("id")).innerHTML = '<input type="text" id="'+this.getAttribute("title")+'" placeholder="vul aantal in"><button name="'+this.getAttribute("title")+'" style = "float: right" onclick = "updateVal(this.name)">Opslaan</button>';
	// 		}
	// 		else {
	// 				document.getElementById(this.getAttribute("id")).innerHTML = window.localStorage[this.getAttribute("title")];
	// 				document.getElementById(this.getAttribute("id")).innerHTML += '<button name="'+this.getAttribute("title")+'" style = "float: right" onclick = "clearVal(this.name);">Change</button>';
	// 		}
	// 	}
	// });
	$('td').each(function() {
		// console.log(this.getAttribute('id'));
		var id = this.getAttribute('id');
		var targetElm = document.getElementById(id);
		var thisID = localStorage.getItem(this.getAttribute('id'));
		if (thisID != null) {
			targetElm.innerHTML = thisID;
			var btnChange = document.createElement("BUTTON");
			btnChange.setAttribute('class', 'btnCell btn btn-outline-primary');
			btnChange.setAttribute('onclick', 'changeVal("'+ this.getAttribute('id')+'")');
			btnChange.innerHTML = "CHANGE";
			targetElm.appendChild(btnChange);
			// document.getElementById(this.getAttribute('id')).innerHTML = thisID;
		}
		else {
			targetElm.innerHTML = "";
			var txtField = document.createElement("input");
			txtField.setAttribute('id', 'text' + this.getAttribute('id'))
			txtField.value = localStorage.getItem(id);
			targetElm.appendChild(txtField);
			var btnUpdate = document.createElement("BUTTON");
			btnUpdate.setAttribute('class', 'btnCell btn btn-outline-primary');
			btnUpdate.setAttribute('onclick', 'updateVal("'+id+'")');
			btnUpdate.innerHTML = "Update";
			targetElm.appendChild(btnUpdate);
		}
	});
}

function updateVal(targetID) {
	localStorage.setItem(targetID, document.getElementById('text'+ targetID).value);
    onLoad();
}

function changeVal(targetID) {
	var elm = document.getElementById(targetID);
	elm.innerHTML = "";
	var txtField = document.createElement("input");
	txtField.setAttribute('id', 'text' + targetID)
	txtField.value = localStorage.getItem(targetID);
	elm.appendChild(txtField);
	var btnSub = document.createElement("button");
	btnSub.setAttribute('class', 'btnCell btn btn-outline-primary');
	btnSub.innerHTML = "Update";
	btnSub.setAttribute('onclick', 'updateVal("'+targetID+'")');
	elm.appendChild(btnSub);
}
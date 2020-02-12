function onLoad() {
	$('td').each(function () {
		var id = this.getAttribute('id');
		var targetElm = document.getElementById(id);
		var thisID = localStorage.getItem(this.getAttribute('id'));
		if (thisID != null) {
			targetElm.innerHTML = thisID;
			if(thisID > 0 && targetElm.getAttribute('class') == 'od') {
				targetElm.classList.add("fault");
			}
			var btnChange = document.createElement("BUTTON");
			btnChange.setAttribute('class', 'btnCell btn btn-primary');
			btnChange.setAttribute('onclick', 'changeVal("' + this.getAttribute('id') + '")');
			btnChange.innerHTML = "CHANGE";
			targetElm.appendChild(btnChange);
		}
		else {
			targetElm.innerHTML = "";
			var txtField = document.createElement("input");
			txtField.setAttribute('id', 'text' + this.getAttribute('id'))
			txtField.value = localStorage.getItem(id);
			targetElm.appendChild(txtField);
			var btnUpdate = document.createElement("BUTTON");
			btnUpdate.setAttribute('class', 'btnCell btn btn-primary');
			btnUpdate.setAttribute('onclick', 'updateVal("' + id + '")');
			btnUpdate.innerHTML = "Update";
			targetElm.appendChild(btnUpdate);
		}
	});
}

function updateVal(targetID) {
	localStorage.setItem(targetID, document.getElementById('text' + targetID).value);
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
	btnSub.setAttribute('onclick', 'updateVal("' + targetID + '")');
	elm.appendChild(btnSub);
}
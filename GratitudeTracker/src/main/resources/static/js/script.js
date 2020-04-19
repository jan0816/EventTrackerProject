window.addEventListener('load', function (e) {
	console.log('Window loaded.')
	init();
//getAllEntries();
});

function init(){
	 document.gratitudeForm.lookup.addEventListener('click', function(evt) {
	        evt.preventDefault();
	        var gratId = document.gratitudeForm.gratId.value;
	        if (!isNaN(gratId) && gratId > 0) {
	            getEvent(gratId);
	        }
	    });
	 
	 getAllEntries();
	 
	 document.newEntry.entryDetails.addEventListener('click', function(e){
	        e.preventDefault();
			console.log('You clicked to submit an entry.');

			let form = document.newEntry;
			let gratitude = {
				firstGrat: form.gratitudeFirstGrat.value,
				secondGrat: form.gratitudeSecondGrat.value,
				thirdGrat: form.gratitudeThirdGrat.value
			};
			createEntry(gratitude);
		});
	}


function getEvent(gratId) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', 'api/gratitudes/' + gratId);
    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4 && xhr.status < 400) {
            var gratitude = JSON.parse(xhr.responseText);
            console.log(gratitude);
            displayEvent(gratitude);
     
        }
        if (xhr.readyState === 4 && xhr.status >= 400) {
            console.error(xhr.status + ': ' + xhr.responseText);
            displayNotFound();
        }
    };
    xhr.send();
}

 function displayEvent(gratitude) {
    let dataDiv = document.getElementById('eventData');
    dataDiv.textContent = '';
    
    let h1 = document.createElement("h1");
    h1.textContent =  gratitude.entryDate;
      dataDiv.appendChild(h1);
    
      let firstBlock = document.createElement('blockquote');
      firstBlock.textContent = "First Gratitude: " + gratitude.firstGrat;
      dataDiv.appendChild(firstBlock);
      let secBlock = document.createElement('blockquote');
      secBlock.textContent = "Second Gratitude: " + gratitude.secondGrat;
      dataDiv.appendChild(secBlock);
      let thirdBlock = document.createElement('blockquote');
      thirdBlock.textContent = 'Third Gratitude: ' +  gratitude.thirdGrat;
      dataDiv.appendChild(thirdBlock);
      console.log(dataDiv);
}

 
function displayNotFound(){
    var dataDiv = document.getElementById('eventData');
    dataDiv.textContent = 'Entry not found';
}
function createEntry(gratitude) {

	let gratitudeJson = JSON.stringify(gratitude);
	let xhr = new XMLHttpRequest();
	xhr.open('POST', 'api/gratitudes');
	xhr.setRequestHeader('Content-type', 'application/json');
	xhr.onreadystatechange = function() {
		if (xhr.readyState === 4) {
			switch (xhr.status) {
			case 200:
			case 201:
				gratitudeJson = xhr.responseText;
				let gratitude = JSON.parse(gratitudeJson);
				displayEvent(gratitude);
				break;
			case 400:
				displayNotFound("Invalid entry data: " + gratitudeJson);
				break;
			default:
				displayNotFound("Error occurred: " + xhr.status);
				break;
			}
		}
	}
	xhr.send(gratitudeJson);
	
	// ADDING A NEW ROW TO THE TABLE ONCE ENTRY IS MADE
	let tableBody = document.getElementById('gratTable');
	console.log(tableBody);
    let tableRow = document.createElement('tr');
    let tableRowDate = document.createElement('td');
    let tableRowFirst = document.createElement('td');
	let tableRowSecond = document.createElement('td');
	let tableRowThird = document.createElement('td');
    tableRowDate.textContent = gratitude['entryDate'];
    tableRowFirst.textContent = gratitude['firstGrat'];
	tableRowSecond.textContent = gratitude['secondGrat']; 
	tableRowThird.textContent = gratitude['thirdGrat'];
    tableRow.appendChild(tableRowDate);
    tableRow.appendChild(tableRowFirst);
	tableRow.appendChild(tableRowSecond);
	tableRow.appendChild(tableRowThird);
    tableBody.appendChild(tableRow);
	
}

function getAllEntries(){
	var xhr = new XMLHttpRequest();
	
    xhr.open('GET', 'api/gratitudes/' );
    xhr.onreadystatechange = function() {
    	
        if (xhr.readyState === 4) {
        	if(xhr.status === 200) {
            let  gratitudeJson = xhr.responseText;
            let entriesObj = JSON.parse(gratitudeJson);
            console.log(entriesObj);
            displayAllEntries(entriesObj);
        	}
        	else if (xhr.status === 404){
        		displayEvent(null);
        		console.log('Entry not found.');
        	}
        } 
    };
    xhr.send();

}

 function displayAllEntries(entriesObj){
	let table = document.createElement('table');
	let tableHead = document.createElement('thead');
	let tableHeaderRow = document.createElement('tr');
	let tableHeaderRowDate = document.createElement('th');
	let tableHeaderRowFirst = document.createElement('th');
	let tableHeaderRowSecond = document.createElement('th');
	let tableHeaderRowThird = document.createElement('th');

	tableHeaderRowDate.textContent = 'Date';
	tableHeaderRowFirst.textContent = 'First Gratitude';
	tableHeaderRowSecond.textContent = 'Second Gratitude';
	tableHeaderRowThird.textContent = 'Third Gratitude';
  	tableHeaderRow.appendChild(tableHeaderRowDate);
  	tableHeaderRow.appendChild(tableHeaderRowFirst);
	tableHeaderRow.appendChild(tableHeaderRowSecond);
	tableHeaderRow.appendChild(tableHeaderRowThird);
  	tableHead.appendChild(tableHeaderRow);
	table.appendChild(tableHead);
	  
	let tableBody = document.createElement('tbody')
	tableBody.setAttribute('id', 'gratTable');
	entriesObj.forEach((gratitude) => {
 
    let tableRow = document.createElement('tr');
    let tableRowDate = document.createElement('td');
    let tableRowFirst = document.createElement('td');
	let tableRowSecond = document.createElement('td');
	let tableRowThird = document.createElement('td');

    tableRowDate.textContent = gratitude['entryDate'];
    tableRowFirst.textContent = gratitude['firstGrat'];
	tableRowSecond.textContent = gratitude['secondGrat']; 
	tableRowThird.textContent = gratitude['thirdGrat'];

    tableRow.appendChild(tableRowDate);
    tableRow.appendChild(tableRowFirst);
	tableRow.appendChild(tableRowSecond);
	tableRow.appendChild(tableRowThird);
    tableBody.appendChild(tableRow);
    
	tableRow.addEventListener('click', function(e){
		this.style.backgroundColor = "aqua";
		detailView(gratitude);
		}
	);


	tableBody.border = '3px';
	table.border = '5px';
	table.appendChild(tableBody);
	document.body.appendChild(table);
})
 }

 
 function detailView(gratitude){

	let dataDiv = document.getElementById('eventData');
	dataDiv.textContent = '';
	
	// displays and appends entry details
	let firstEntryBlock = document.createElement('text');
	firstEntryBlock.textContent = "First gratitude: " + gratitude.firstGrat;
	dataDiv.appendChild(firstEntryBlock);
	
	let secondEntryBlock = document.createElement('text');
	secondEntryBlock.textContent = "Second gratitude: " + gratitude.secondGrat;
	dataDiv.appendChild(secondEntryBlock);
	
	let thirdEntryBlock = document.createElement('text');
	firstEntryBlock.textContent = "Third gratitude: " + gratitude.thirdGrat;
	dataDiv.appendChild(thirdEntryBlock);
	console.log(dataDiv);
	
	let editForm = document.createElement("form");
	editForm.name = "editEntry";
	dataDiv.appendChild(editForm);
	
	//CHECK ID?
	let elementId = document.createElement("input");
	elementId.setAttribute("type", "hidden");
	elementId.setAttribute("name", "id");
	elementId.value = event.id;
	editForm.appendChild(elementId);
	
	let firstGratLabel = document.createElement("label");
	firstGratLabel.textContent = "First Gratitude";
	editForm.appendChild(firstGratLabel);
	
	let firstGratInput = document.createElement("input");
	firstGratInput.setAttribute("type", "text");
	firstGratInput.setAttribute("name", "First Gratitude");
	firstGratInput.value = gratitude.firstGrat;
	editForm.appendChild(firstGratInput);
	
	let lineBreak = document.createElement("br");
	editForm.appendChild(lineBreak);
	
	let secondGratLabel = document.createElement("label");
	secondGratLabel.textContent = "Second Gratitude";
	editForm.appendChild(secondGratLabel);
	
	let secondGratInput = document.createElement("input");
	secondGratInput.setAttribute("type", "text");
	secondGratInput.setAttribute("name", "Second Gratitude");
	secondGratInput.value = gratitude.secondGrat;
	editForm.appendChild(secondGratInput);
	
	let lineBreak2 = document.createElement("br");
	editForm.appendChild(lineBreak2);
	
	let thirdGratLabel = document.createElement("label");
	thirdGratLabel.textContent = "Third Gratitude";
	editForm.appendChild(thirdGratLabel);
	
	let thirdGratInput = document.createElement("input");
	thirdGratInput.setAttribute("type", "text");
	thirdGratInput.setAttribute("name", "Third Gratitude");
	thirdGratInput.value = gratitude.thirdGrat;
	editForm.appendChild(thirdGratInput);
	
	let lineBreak3 = document.createElement("br");
	editForm.appendChild(lineBreak3);
	
		let submitButton = document.createElement("input");
		submitButton.setAttribute("type", "submit");
		submitButton.setAttribute("name", "submit");
		submitButton.value = "Edit Entry"
		editForm.appendChild(submitButton);
		submitButton.addEventListener("click", updateEntry);
		
		let deleteButton = document.createElement("input");
		deleteButton.setAttribute("type", "submit");
		deleteButton.setAttribute("name", "delete");
		deleteButton.value = "Delete Entry"
		editForm.appendChild(deleteButton);
		deleteButton.addEventListener("click", deleteEntry);
}

//WORKING ON THIS STILL
function updateEntry(e, gratitude){
		e.preventDefault();
		 let form = e.target.parentElement;
		 	
		var xhr = new XMLHttpRequest();
		//FIGURE OUT WHAT THE CORRECT FORM PATH IS
		xhr.open('PUT', 'api/gratitudes/' + gratitude);
		xhr.setRequestHeader('Content-type', 'application/json');
		xhr.onreadystatechange = function() {
			if (xhr.readyState === 4) {
				if(xhr.status == 200 || xhr.status == 201){
					var gratitude = JSON.parse(xhr.responseText);
					console.log(gratitude);
					getAllEntries();
				} else {
					console.log("POST request failed.");
					console.error(xhr.status + ": " + xhr.responseText);
					}
				}
		};
		 var gratitude = {
					firstGrat: form.firstGrat,
					secondGrat: form.secondGrat,
					thirdGrat: form.thirdGrat,
			}	

var gratitudeJson = JSON.stringify(gratitude);
xhr.send(gratitudeJson);
 }

 function deleteEntry(e){
	 e.preventDefault();
	 let form = e.target.parentElement;
	 
	 var xhr = new XMLHttpRequest();
	 xhr.open('DELETE', 'api/gratitudes/' + form.gratId.value, true);
		xhr.setRequestHeader('Content-type', 'application/json');
		xhr.onreadystatechange = function() {
			if (xhr.readyState === 4) {
				if (xhr.status ==200 || xhr.status == 204){
					console.log("Successfully deleted entry.")
					getAllEntries();
				}
				else {
					console.log("Delete request failed.");
					console.error(xhr.status + ": " + xhr.responseText);
					}
			}
		};
		xhr.send();
 }
 
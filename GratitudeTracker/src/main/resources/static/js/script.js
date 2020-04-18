window.addEventListener('load', function (e) {
	console.log('Window loaded.')
	init();
getAllEntries();
	
});

function init(){
	 document.gratitudeForm.lookup.addEventListener('click', function(evt) {
	        evt.preventDefault();
	        var gratId = document.gratitudeForm.gratId.value;
	        if (!isNaN(gratId) && gratId > 0) {
	            getEvent(gratId);
	        }
	    });
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
    xhr.send(null);
}

 function displayEvent(gratitude) {
    let dataDiv = document.getElementById('eventData');
    dataDiv.textContent = '';
    
    let h1 = document.createElement("h1");
    h1.textContent =  gratitude.entryDate;
      dataDiv.appendChild(h1);
      
      let firstBlock = document.createElement('blockquote');
      firstBlock.textContent = 'First Gratitude: ' + gratitude.firstGrat;
      dataDiv.appendChild(firstBlock);
      let secBlock = document.createElement('blockquote');
      secBlock.textContent = 'Second Gratitude: ' +  gratitude.secondGrat;
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

	//TODO: each time a new entry is made, make a new row and append to the table 
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
	console.log(gratitudeJson);
	
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
	  
	let tableBody = document.createElement('tbody');
	entriesObj.forEach((item) => {
 
    let tableRow = document.createElement('tr');
    let tableRowDate = document.createElement('td');
    let tableRowFirst = document.createElement('td');
	let tableRowSecond = document.createElement('td');
	let tableRowThird = document.createElement('td');

    tableRowDate.textContent = item['entryDate'];
    tableRowFirst.textContent = item['firstGrat'];
	tableRowSecond.textContent = item['secondGrat']; 
	tableRowThird.textContent = item['thirdGrat'];

    tableRow.appendChild(tableRowDate);
    tableRow.appendChild(tableRowFirst);
	tableRow.appendChild(tableRowSecond);
	tableRow.appendChild(tableRowThird);
    tableBody.appendChild(tableRow);
  });
	tableBody.border = '3px';
	table.border = '5px';
	table.appendChild(tableBody);
	document.body.appendChild(table);
}

 


	


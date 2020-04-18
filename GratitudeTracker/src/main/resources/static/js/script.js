window.addEventListener('load', function (e) {
	console.log('Window loaded.')
	init();
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
     
//    let ul = document.createElement('ul');
//    console.log(ul);
//    detailArray.forEach((item) => {
//        let li = document.createElement('li');
//        li.textContent = item;
//        ul.appendChild(li);
//    });
    
	//dataDiv.appendChild(ul);
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
	console.log(gratitudeJson);
}



var close = document.querySelector('.close');
var note_modal = document.querySelector('#add-content');

close.onclick = function() {
  note_modal.style.display = "none";
}


// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == note_modal) {
    note_modal.style.display = "none";
  }
}

// window.onload = function(){
// var heading = document.querySelector('#heading-list-0').innerText;
// 	var content = document.querySelector('#con-prev-0').innerText;
// 	if (heading ){
// 		document.querySelector('#section-heading').innerText = heading;
// 	document.querySelector('#section-content').innerText = content;
// 	}

// }



// CLOSE THE MODAL



// CORE FUNCTIONALITY

// UICONTROLLER
var UIcontroller = (function(){

	
return {
	// INPUT FROM THE MODAL
	getInput: function(){
		return{
			title: document.querySelector('#title').value,
			tag: document.querySelector('#tag').value,
			note: document.querySelector('#note').value,
			aside: document.querySelector('#aside')
		}
	},
	// CLEAR MODAL INPUT BOX
	clearInput: function(){
		document.querySelector('#title').value = "";
		document.querySelector('#tag').value  = "";
		document.querySelector('#note').value = "";
	},
	// SET CONTENTS TO ASIDE
	setInput: function(){
		return{
			headingList: document.getElementById('heading-list-'),
			contentPrev: document.getElementById('con-prev-'),	
			setTag: document.getElementById('tag-'),
			setTime: document.getElementById('time-'),
		}
	},
	// GET INPUT ID'S FROM THE MAIN VIEW
	mainView: function(){
		return{
			sectionHeading: document.querySelector('#section-heading'),
			sectionContent: document.querySelector('#section-content')
		}
	}

}

})();

// DATA CONTROLLER
var dataController = (function(){

})();


// GLOBAL CONTROLLER
var controller = (function(UIctrl, dataCtrl){
	//Get the number of notes already on the app
	var lists = document.getElementsByClassName('list');
	var inputCounter = lists.length - 1;
	// 1. Get the input field
	var crtBtn = document.querySelector('.create-button');
	var subBtn = document.querySelector('#submit-note');
	var note_modal = document.querySelector('#add-content');

	// 2. Displays the modal to create a new note when the button is clicked
	crtBtn.onclick = function(){
		note_modal.style.display ="block";
	}

	// 3. Function to be called when the button on the modal is pressed to submit the form
	var ctrlAddItem = function(){
        // 1. Get the input field data
        var input = UIctrl.getInput();
        var inputTag = input.tag;
        var inputTitle = input.title;
        var inputNote = input.note;
        inputCounter++;
        var newNote = inputNote
        console.log(newNote);



        // 2. Add the item to the Aside preview
     	input.aside.innerHTML += `<div class='list' id='list-${inputCounter}'>
			<div id='content-list-${inputCounter}'>
				<h1 class='heading-list' id='heading-list-${inputCounter}'>${inputTitle}</h1>
				<p class='con-prev' id='con-prev-${inputCounter}'>${newNote}</p>
			</div>
			<div class='base' id='base-list-${inputCounter}'>
				<span class='tag' id='tag-${inputCounter}'>${inputTag}</span>
				<span class='time' id='time-${inputCounter}'>12 hours ago</span>
				<span class='base-action' id='action-${inputCounter}'>...
					<ul id='base-action-list'>
						<li>Edit</li>
						<li>Delete</li>
						<li>Print</li>
						<li>Archive</li>
					</ul>
				</span>
			</div>
		</div>`

    }
    // Functions to clear input field
    var clearInput = function(){
    	UIctrl.clearInput();
    }
    // Function to be called to display the clicked note from aside;
    var displayNote = function(){
    		console.log(this);
			console.log('pressed')
			console.log(this.id.length);
			var idArray = this.id.split("");
			var clickedID = idArray[5];
			var mainView = UIctrl.mainView();

			var secHeading = mainView.sectionHeading;
			var secContent = mainView.sectionContent;
			var prevHeading = document.querySelector('#heading-list-'+clickedID).innerText;
			var prevContent = document.querySelector('#con-prev-'+clickedID).innerText;

			secHeading.innerText = prevHeading;
			secContent.innerText = prevContent;
		}
    

    // Add the new note to aside on formsubmit button clicked
	subBtn.onclick = function (e){
		e.preventDefault();
		ctrlAddItem();
		note_modal.style.display ="none";
		clearInput();	
	}

	
// Display the exact list clicked on the interface
	for (list of lists){
		list.addEventListener('click', displayNote);
	}
	



})(UIcontroller, dataController);


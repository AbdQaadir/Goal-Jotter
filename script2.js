
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

window.onload = function(){
var heading = document.querySelector('#heading-list-0').innerText;
	var content = document.querySelector('#con-prev-0').innerText;
	if (heading ){
		document.querySelector('#section-heading').innerText = heading;
	document.querySelector('#section-content').innerText = content;
	}

}



// CLOSE THE MODAL



// CORE FUNCTIONALITY

// UICONTROLLER
var UIcontroller = (function(){

	
return {
	getInput: function(){
		return{
			title: document.querySelector('#title').value,
			tag: document.querySelector('#tag').value,
			note: document.querySelector('#note').value,
			aside: document.querySelector('#aside')
		}
	},
	clearInput: function(){
		document.querySelector('#title').value = "";
		document.querySelector('#tag').value  = "";
		document.querySelector('#note').value = "";
	},
	setInput: function(){
		return{
			headingList: document.getElementById('heading-list-'),
			contentPrev: document.getElementById('con-prev-'),	
			setTag: document.getElementById('tag-'),
			setTime: document.getElementById('time-'),
		}
	}

}

})();

// DATA CONTROLLER
var dataController = (function(){

})();


// GLOBAL CONTROLLER
var controller = (function(UIctrl, dataCtrl){
	var inputCounter = 0;
	// 1. Get the input field
	var crtBtn = document.querySelector('.create-button');
	var subBtn = document.querySelector('#submit-note');
	var note_modal = document.querySelector('#add-content');

	// Displays the modal to create a new note when the button is clicked
	crtBtn.onclick = function(){
		note_modal.style.display ="block";
	}

	// Function to be called when the button on the modal is pressed
	var ctrlAddItem = function(){
        // 1. Get the input field data
        var input = UIctrl.getInput();
        var inputTag = input.tag;
        var inputTitle = input.title;
        var inputNote = input.note;
        inputCounter++;


        var newNote = inputNote.slice(" ");
        for (i=0; i<= newNote.length; i++){
				console.log(newNote);
        }
        // console.log(input.aside.innerHTML);
        // 2. Add the item to the Aside preview
     	input.aside.innerHTML += `<div class='list' id='list-${inputCounter}'>
			<div id='content-list-${inputCounter}'>
				<h1 class='heading-list' id='heading-list-${inputCounter}'>${inputTitle}</h1>
				<p class='con-prev' id='con-prev-${inputCounter}'>${inputNote}</p>
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
        // 3. Add the new item to the new interface
        // 4. Calculate the budget
        // 5. Display the budget
    }
    var clearInput = function(){
    	UIctrl.clearInput();
    }

	// 2. Create a new aside field
	// 3. Attach it to the Interface
	subBtn.onclick = function (e){
		e.preventDefault();
		ctrlAddItem();
		note_modal.style.display ="none";
		clearInput();	
}

})(UIcontroller, dataController);


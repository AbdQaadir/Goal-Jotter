var close = document.querySelector('.close');
var delClose = document.querySelector('.delete-close');
var note_modal = document.querySelector('#add-content');
var editClicked = 0;
close.onclick = function() {
  note_modal.style.display = "none";
}
delClose.onclick = function(){
	document.querySelector('#delete-modal').style.display = "none";
}
// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == note_modal) {
    note_modal.style.display = "none";
  }
}

// CLOSE THE MODAL


// CORE FUNCTIONALITY

// DATA CONTROLLER
var dataController = (function(){

	// var Note = function(id, note, tag){
	// 	this.id = id;
	// 	this.note = note;
	// 	this.tag = tag;

	// }

	// var data = {
	// 	notes = [],
	// 	totals: []
	// }
	// return{
	// 	 addItem: function(type, notes, tag){
 //            var newItem, ID;

 //            ID = data.allItem[type][data.allItem[type].length -1].id + 1;

 //            if (type === "exp"){
 //                newItem =new Expense(ID, des, val);
 //            } else if(type === "inc"){
 //            newItem =new Income(ID, des, val);
 //            }

 //            data.allItem[type].push(newItem);
 //            return newItem;
 //            ID++;

	// }
})();







// UICONTROLLER
var UIcontroller = (function(){

	
return {
	// INPUT FROM THE MODAL
	getInput: function(){
		return{
			title: document.querySelector('#title').value,
			tag: document.querySelector('#tag').value,
			note: document.querySelector('#note').value,
			aside: document.querySelector('#aside'),
			createBtn: document.querySelector('#submit-note'),
			createBtn2: document.querySelector('#submit-note-2'),
		}
	},
	// CLEAR MODAL INPUT BOX
	clearInput: function(){
		document.querySelector('#title').value = "";
		document.querySelector('#tag').value  = "";
		document.querySelector('#note').value = "";
	},
	// DETAILS OF ASIDE LISTS
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
	},
	// DETAILS OF NAV BAR SPAN
	navBar: function(){
		return{
			noteCounter: document.querySelector('.notes-counter'),
			todoCounter: document.querySelector('.todos-counter'),
			archiveCounter: document.querySelector('.archives-counter'),
			eventCounter: document.querySelector('.events-counter')			
		}
	},
	
	// RIGHT SIDE ACTIONS
	rigthAction: function(){
		return{
			sideBtn: document.querySelector('.side-action'),
			sideList: document.querySelector('#side-action-list'),
			sideEdit: document.querySelector('.side-edit'),
			sideDelete: document.querySelector('.side-delete'),
			sidePrint: document.querySelector('.side-print'),
			sideArchive: document.querySelector('.side-archive'),
			
		}
	}
}

})();



// GLOBAL CONTROLLER
var controller = (function(UIctrl, dataCtrl){
	//Get the number of notes already on the app
	var lists = document.getElementsByClassName('list');
	var inputCounter = lists.length - 1;
	// 1. Get the input field
	var crtBtn = document.querySelector('.create-button');
	var subBtn = UIctrl.getInput().createBtn;
	var note_modal = document.querySelector('#add-content');

	// 2. Displays the modal to create a new note when the button is clicked
	crtBtn.onclick = function(){
		note_modal.style.display ="block";
		UIctrl.getInput().createBtn.style.display = "block";
	    UIctrl.getInput().createBtn2.style.display = "none";
	    document.querySelector('.note-modal-heading').innerText = "Write your note";
		// document.querySelector("#base-action-list-"+editClicked).classList.toggle("active");
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
        var timePosted = new Date();
		var time = timePosted.getHours() + ":" + timePosted.getMinutes() + ":" + timePosted.getSeconds();
		console.log(time);



        // 2. Add the item to the Aside preview
		input.aside.innerHTML += `<div class="list" id='list-${inputCounter}'>
			<div id='content-list-${inputCounter}'>
				<h1 class='heading-list' id='heading-list-${inputCounter}'>${inputTitle}</h1>
				<p class="con-prev" id="con-prev-${inputCounter}">${newNote}</p>
			</div>
			<div class="base" id='base-list-${inputCounter}'>
				<span class="tag" id='tag-${inputCounter}'>${inputTag}</span>
				<span class="time" id='time-${inputCounter}'>12 hours ago</span>
				<div class="base-action" id="action-0">
					<span class="base-click" id='action-${inputCounter}'>...</span>
					<ul id="base-action-list-${inputCounter}">
						<li class="base-edit">Edit</li>
						<li class="base-delete">Delete</li>
						<li class="base-print">Print</li>
						<li class="base-archive">Archive</li>
					</ul>
				</div>
			</div>
		</div>`

    }
    // Functions to clear input field
    var clearInput = function(){
    	UIctrl.clearInput();
    }

    // Add the new note to aside on formsubmit button clicked
	subBtn.onclick = function (e){
		e.preventDefault();
		ctrlAddItem();
		note_modal.style.display ="none";
		clearInput();	
		viewItem();
		navbarUpdate();
	}

	
// Display the exact list clicked on the interface
	var viewItem = function(){
		for (list of lists){
			list.addEventListener('click', function(){

				console.log(this);
				console.log('pressed')
				console.log(this.id.length);
				var idArray = this.id.split("");
				var clickedID = idArray[5];
				editClicked = clickedID; //To be used in the side edit mode
				var mainView = UIctrl.mainView();

				var secHeading = mainView.sectionHeading;
				var secContent = mainView.sectionContent;
				var prevHeading = document.querySelector('#heading-list-'+clickedID).innerText;
				var prevContent = document.querySelector('#con-prev-'+clickedID).innerText;

				secHeading.innerText = prevHeading;
				secContent.innerText = prevContent;

				// Display the edit button at the side
				document.querySelector('.edit-space').style.display = "block"
				UIctrl.rigthAction().sideBtn.style.display = "block";
				// document.querySelector('#side-action-list').classList.remove("active")


			});
		}
	}

// Update the nav bar for number of notes
	var navbarUpdate = function(){
		var navbarClasses = UIctrl.navBar();
		var noteNumber = navbarClasses.noteCounter;
		noteNumber.innerText = lists.length;
	}
// Side Actions
	// Check if the main view is blank or not
	var checkMainView = function(){
		var rigthAction = UIctrl.rigthAction();
		var sideBtn = rigthAction.sideBtn;
		var sideList = rigthAction.sideList;
		var sideDelete = rigthAction.sideDelete;
		
		var sasjk = UIctrl.mainView()
		var sectionHeading = sasjk.sectionHeading.innerText;
		var sectionContent = sasjk.sectionContent.innerText;

		if (sectionHeading == "" || sectionHeading == null ){
			sideBtn.style.display = "none";
			// sideList.style.display = "none";
		}
		
	}

	
	var sideAction = function(){
		var rigthAction = UIctrl.rigthAction();
		var sideBtn = rigthAction.sideBtn;
		var sideList = rigthAction.sideList;
		var sideEdit = rigthAction.sideEdit;
		var sideDelete = rigthAction.sideDelete;
		var sidePrint = rigthAction.sidePrint;
		var sideArchive = rigthAction.sideArchive;
		var jeditBtn = UIctrl.getInput().editBtn
		var aside = UIctrl.getInput().aside

		sideBtn.onclick = function(){
			sideList.classList.toggle('active');
			sideList.classList.toggle('fadeIn');
			window.onclick = function(event) {
				console.log(event.target);
			  // if (event.target == window) {
			  //   document.querySelector('.side-action-list').style.display = "none";
			  //   console.log("Done");
			  // }
			}
		}
		sideEdit.onclick = function(){
			note_modal.style.display = "block";
			console.log(editClicked)

	        document.querySelector('#tag').value = document.getElementById('tag-'+editClicked).innerText;
	        document.querySelector('#title').value = document.getElementById('heading-list-'+editClicked).innerText;
	        document.getElementById('note').value = document.getElementById('con-prev-'+editClicked).innerText;
	        document.querySelector('.note-modal-heading').innerText = "Edit Note";
	        
	        UIctrl.getInput().createBtn.style.display = "none";
	        UIctrl.getInput().createBtn2.style.display = "block";
		}

		 UIctrl.getInput().createBtn2.onclick = function(e){
		   	e.preventDefault();
			document.getElementById('tag-'+editClicked).innerText = document.querySelector('#tag').value;
	        document.getElementById('heading-list-'+editClicked).innerText = document.querySelector('#title').value;
	        document.getElementById('con-prev-'+editClicked).innerText = document.getElementById('note').value;
	        

	        // Hide the modal
	        note_modal.style.display = "none";
	        // Clear input field
	        UIctrl.clearInput();

	        // Update the main view
	        var mainView = UIctrl.mainView();

			var secHeading = mainView.sectionHeading;
			var secContent = mainView.sectionContent;
			var prevHeading = document.querySelector('#heading-list-'+editClicked).innerText;
			var prevContent = document.querySelector('#con-prev-'+editClicked).innerText;

			secHeading.innerText = prevHeading;
			secContent.innerText = prevContent;

		}
		sideDelete.onclick = function(){
			var mainView = UIctrl.mainView();
			// var confirm = window.confirm("Are you sure you want to delete this note?");
			document.querySelector("#delete-modal").style.display = "block";
			document.querySelector('#confirm-delete').onclick = function(){
					document.getElementById('list-'+editClicked).remove();
					mainView.sectionHeading.innerText = ""
					mainView.sectionContent.innerText = ""
					console.log(confirm);
					document.querySelector('.edit-space').style.display = "none";
					document.querySelector("#delete-modal").style.display = "none";
					navbarUpdate();

			}
			document.querySelector('#donot-delete').onclick = function(){
					document.querySelector("#delete-modal").style.display = "none";
					document.querySelector('#side-action-list').classList.toggle("active");
			}
		}
	}

	var baseAction = function(){
		var baseClick = document.getElementsByClassName("base-click")
	

		for (base of baseClick){
			console.log(base.id)
			base.onclick = function(e){
				console.log(this)
				e.preventDefault();
				var editClicked = this.id.split("")[11]
				var baseEdit = document.querySelector(".base-edit-"+editClicked)
				var baseDelete = document.querySelector(".base-delete-"+editClicked)
				var basePrint = document.querySelector(".base-print-"+editClicked)
				var baseArchive = document.querySelector(".base-archive-"+editClicked)
				console.log(editClicked);
				document.querySelector("#base-action-list-"+editClicked).classList.toggle("active");
				
				baseEdit.onclick = function(){
					note_modal.style.display = "block";
					console.log(editClicked)

			        document.querySelector('#tag').value = document.getElementById('tag-'+editClicked).innerText;
			        document.querySelector('#title').value = document.getElementById('heading-list-'+editClicked).innerText;
			        document.getElementById('note').value = document.getElementById('con-prev-'+editClicked).innerText;
			        document.querySelector('.note-modal-heading').innerText = "Edit note";
			        
			        UIctrl.getInput().createBtn.style.display = "none";
			        UIctrl.getInput().createBtn2.style.display = "block";
			        document.querySelector("#base-action-list-"+editClicked).classList.toggle("active");
				}

				baseDelete.onclick = function(e){
					e.preventDefault();
					var mainView = UIctrl.mainView();
					// var confirm = window.confirm("Are you sure you want to delete this note?");
					document.querySelector("#delete-modal").style.display = "block";
					document.querySelector('#confirm-delete').onclick = function(){
						document.getElementById('list-'+editClicked).remove();
						mainView.sectionHeading.innerText = ""
						mainView.sectionContent.innerText = ""
						console.log(confirm);
						document.querySelector("#delete-modal").style.display = "none";
						navbarUpdate();
						document.querySelector('.edit-space').style.display = "none";
					}
					document.querySelector('#donot-delete').onclick = function(){
							document.querySelector('.edit-space').style.display = "block"
							document.querySelector("#delete-modal").style.display = "none";
							document.querySelector("#base-action-list-"+editClicked).classList.toggle("active");
					}
				}
			}
		}
	}

return{
	init: function(){
		viewItem();
		navbarUpdate();
		sideAction();
		checkMainView();
		baseAction();
	}
}


})(UIcontroller, dataController);


controller.init();
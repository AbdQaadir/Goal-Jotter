
// Get the modal
var login_modal = document.getElementById("myLoginModal");
var signup_modal = document.getElementById("mySignupModal");

// Get the button that opens the modal
var login_btn = document.getElementById("login-btn");
var signup_btn = document.getElementById("signup-btn");

// Get the <span> element that closes the modal
var login_span = document.getElementsByClassName("loginClose")[0];
var signup_span = document.getElementsByClassName("SignupClose")[0];

// Get the alternative login and sign up link
var alt_login = document.getElementById('login-form-btn');
var alt_signup = document.getElementById('signup-form-btn');
// When the user clicks on the button, open the modal
login_btn.onclick = function() {
  login_modal.style.display = "block";
}

document.querySelector('.g-s-button').onclick = function(){
	signup_modal.style.display = "block"
}
signup_btn.onclick = function(){
	signup_modal.style.display = "block"
}
alt_signup.onclick = function(event){
	event.preventDefault();
	login_modal.style.display = "none";
	signup_modal.style.display = "block";
}
alt_login.onclick = function(event){
	event.preventDefault();
	signup_modal.style.display = "none";
	login_modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
login_span.onclick = function() {
  login_modal.style.display = "none";
}
signup_span.onclick = function() {
  signup_modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == login_modal || event.target == signup_modal) {
    login_modal.style.display = "none";
    signup_modal.style.display = "none";
  }
}


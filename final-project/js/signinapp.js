

// Reference messages collection
var messagesRef = firebase.database().ref('accounts');

// Listen for form submit
document.getElementById('SignInForm').addEventListener('submit', submitForm);


// Submit form
function submitForm(e){
  e.preventDefault();

  // Get values
  var username = getInputVal('username');
  var password = getInputVal('password');

  // Save message
  saveMessage( username, password);

  // Clear form
  document.getElementById('SignInForm').reset();
}

// Function to get get form values
function getInputVal(id){
  return document.getElementById(id).value;
}

// Save message to firebase
function saveMessage( username,password){
  var newMessageRef = messagesRef.push();
  newMessageRef.set({
    username:username,
    password: password
  });
}

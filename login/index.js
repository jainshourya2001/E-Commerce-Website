var firebaseConfig = {
  apiKey: "AIzaSyCuVKqkE9KgPNjpkKEdoMiX-9qPZVzw4RE",
  authDomain: "mini-project-1ddb9.firebaseapp.com",
  databaseURL: "https://mini-project-1ddb9-default-rtdb.firebaseio.com",
  projectId: "mini-project-1ddb9",
  storageBucket: "mini-project-1ddb9.appspot.com",
  messagingSenderId: "405211973640",
  appId: "1:405211973640:web:aff71dd1615090672d69bd",
  measurementId: "G-LVQ0VM4Q0G"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  // Initialize variables
  const auth = firebase.auth()
  const database = firebase.database()
  
  // Set up our register function
  function register () {
    // Get all our input fields
    email = document.getElementById('email').value
    password = document.getElementById('password').value
    full_name = document.getElementById('full_name').value
    phone_number = document.getElementById('phone_number').value
    // milk_before_cereal = document.getElementById('milk_before_cereal').value
  
    // Validate input fields
    if (validate_email(email) == false || validate_password(password) == false) {
      alert('Email or Password is Outta Line!!')
      return
      // Don't continue running the code
    }
    if (validate_field(full_name) == false || validate_field(phone_number) == false ) {
      alert('One or More Extra Fields is Outta Line!!')
      return
    }
    if(validate_phone(phone_number<10)){
      alert("Please Enter Valid Number")
      return
    }
   
    // Move on with Auth
    auth.createUserWithEmailAndPassword(email, password)
    .then(function() {
      // Declare user variable
      var user = auth.currentUser
  
      // Add this user to Firebase Database
      var database_ref = database.ref()
  
      // Create User data
      var user_data = {
        email : email,
        full_name : full_name,
        phone_number : phone_number,
        password : password,
        last_login : Date.now()
      }
  
      // Push to Firebase Database
      // database_ref.child('users/' + user.uid).set(user_data)
      firebase
      .database()
      .ref("users/"+full_name)
      .set({
        full_name:full_name,
        email:email,
        password:password,
        phone_number:phone_number
      });
  
      // DOne
      alert('User Created!!')
      window.location.href ='../index.html';
    })
    .catch(function(error) {
      // Firebase will use this to alert of its errors
      var error_code = error.code
      var error_message = error.message
  
      alert(error_message)
    })
  }
  
  // Set up our login function
  function login () {
    // Get all our input fields
    email = document.getElementById('emailL').value
    password = document.getElementById('passwordL').value
  
    // Validate input fields
    if (validate_email(email) == false || validate_password(password) == false) {
      alert('Email or Password is Outta Line!!')
      return
      // Don't continue running the code
    }
  
    auth.signInWithEmailAndPassword(email, password)
    .then(function() {
      // Declare user variable
      var user = auth.currentUser
  
      // Add this user to Firebase Database
      var database_ref = database.ref()
  
      // Create User data
      var user_data = {
        last_login : Date.now()
      }
  
      // Push to Firebase Database
      database_ref.child('users/' + user.uid).update(user_data)
  
      // DOne
      alert('User Logged In!!')
      window.location.href ='../index.html';
  
    })
    .catch(function(error) {
      // Firebase will use this to alert of its errors
      var error_code = error.code
      var error_message = error.message
  
      alert(error_message)
      // alert("Please Create Account")
    })
  }
  
  
  
  
  // Validate Functions
  function validate_email(email) {
    expression = /^[^@]+@\w+(\.\w+)+\w$/
    if (expression.test(email) == true) {
      // Email is good
      return true
    } else {
      // Email is not good
      return false
    }
  }
  
  function validate_password(password) {
    // Firebase only accepts lengths greater than 6
    if (password < 6) {
      return false
    } else {
      return true
    }
  }
  function validate_phone(phone_number) {
    if (phone_number < 10) {
      return false
    } else {
      return true
    }
  }
  
  function validate_field(field) {
    if (field == null) {
      return false
    }
  
    if (field.length <= 0) {
      return false
    } else {
      return true
    }
  }
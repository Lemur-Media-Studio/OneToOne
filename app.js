console.log('CONEXION CON BACK HECHA')

const signupForm = document.querySelector('#signup-form');

signupForm.addEventListener('submit', (e) =>{
    e.preventDefault();
    const email = document.querySelector('#email').value;
    const pass = document.querySelector('#password').value;


    auth.createUserWithEmailAndPassword(email, pass)
    .catch(function(error) {
      var errorCode = error.code;
      var errorMessage = error.message;
      
      console.log(errorCode);
      console.log(errorMessage);
      // ..
    });

})
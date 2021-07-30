console.log('CONEXION CON BACK HECHA')

const loginForm = document.querySelector('#login-form');

loginForm.addEventListener('submit', (e) =>{
    e.preventDefault();
    const email = document.querySelector('#idemail').value;
    const pass = document.querySelector('#idpass').value;


    auth.createUserWithEmailAndPassword(email, pass)
    .catch(function(error) {
      var errorCode = error.code;
      var errorMessage = error.message;
      
      console.log(errorCode);
      console.log(errorMessage);
      // ..
    });

})
const sigupForm = document.querySelector('#login-form');

sigupForm.addEventListener('submit', (e) =>{
    e.preventDefault();


    const email = document.querySelector('#idemail').value;
    const password = document.querySelector('#idpass').value;


    auth.createUserWithEmailAndPassword(email, password)
    .then((userCredential) => {
      // Signed in
      var user = userCredential.user;
      // ...
    })
    .catch((error) => {
      var errorCode = error.code;
      var errorMessage = error.message;
      // ..
    });
})
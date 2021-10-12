/*  DOCUMENTACION DE FIREBASE: https://firebase.google.com/docs/auth/web/start
    LINK DE BASE DE DATOS: https://console.firebase.google.com/u/1/project/inicio-logueo-one/overview
***************************************************************************************************************
***************************************************************************************************************
    DECLARO UNA FUNCION PARA MANDAR DATOS A BASE DE DATOS   */

    const sigupForm = document.querySelector('#login-form');



    //SINUP
    sigupForm.addEventListener('submit', (e) =>{
        e.preventDefault();
    
    
        const email = document.querySelector('#idemail').value;
        const password = document.querySelector('#idpass').value;
    
    
        auth.createUserWithEmailAndPassword(email, password)
        .then((userCredential) => {
          // Signed in
          console.log('Logeado')
          $('#exampleModal2').modal('hide')
          const user = userCredential.user;
          sigupForm.reset();
          window.alert("USUARIO REGISTRADO CON EXITO") 
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log(errorCode)
          console.log(errorMessage)
          window.alert(errorMessage)
          // .. 
        });
    
    })
    
    
    
    
    //SININ
    const signinForm = document.querySelector('#signin-form');
    
    signinForm.addEventListener('submit', e => {
      e.preventDefault();
      const email = document.querySelector('#loginemail').value;
      const password = document.querySelector('#loginpass').value;
    
      auth.signInWithEmailAndPassword(email,password)
        .then(userCredential => {
          signinForm.reset();
          $('#exampleModal').modal('hide')
          console.log('sign in')
          window.location = 'productos.html'
    
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log(errorCode)
          console.log(errorMessage)
          window.alert(errorMessage)
          
          // .. 
        });
        signinForm.reset();
      })
    
    
    
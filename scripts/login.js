/*  DOCUMENTACION DE FIREBASE: https://firebase.google.com/docs/auth/web/start
    LINK DE BASE DE DATOS: https://console.firebase.google.com/u/1/project/inicio-logueo-one/overview
***************************************************************************************************************
***************************************************************************************************************
    DECLARO UNA FUNCION PARA MANDAR DATOS A BASE DE DATOS   */
const sigupForm = document.querySelector("#login-form");
//SINUP
sigupForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const email = document.querySelector("#idemail").value;
  const password = document.querySelector("#idpass").value;
  const nombre = document.querySelector("#idname").value;
  const apellido = document.querySelector("#idapellido").value;
  const fecha = document.querySelector("#idfecha").value;
  auth
    .createUserWithEmailAndPassword(email, password)
    .then((userCredential) => {
      //console.log('Logeado')
      $("#exampleModal2").modal("hide");
      const user = userCredential.user;
      const UID = user.uid;
      //console.log(UID);
      //console.log(user);
      //window.alert("USUARIO REGISTRADO CON EXITO")
      sigupForm.reset();
      db.collection("Users").doc(UID).set({
        email,
        nombre,
        apellido,
        fecha,
        UID
      });
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorCode);
      console.log(errorMessage);
      window.alert(errorMessage);
      // ..
    });
});
const signinForm = document.querySelector("#signin-form");
signinForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const email = document.querySelector("#loginemail").value;
  const password = document.querySelector("#loginpass").value;
  auth
    .signInWithEmailAndPassword(email, password)
    .then((userCredential) => {
      signinForm.reset();
      $("#exampleModal").modal("hide");
      console.log("sign in");
      window.location = "productos.html";
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorCode);
      console.log(errorMessage);
      window.alert(errorMessage);
    });
  signinForm.reset();
});

const reset = document.querySelector("#resta-form");
auth.signOut().then()
reset.addEventListener("submit", (e) => {
  e.preventDefault();
  const email = document.querySelector("#email").value;
  console.log(email)
  auth.sendPasswordResetEmail(email).then(() => {
      console.log('restablecer contraseña')
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log(errorCode);
    console.log(errorMessage);
    window.alert(errorMessage);
    // ..
  });
})
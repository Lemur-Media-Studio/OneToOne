const reset = document.querySelector("#resta-form");
auth.signOut().then()
reset.addEventListener("submit", (e) => {
  e.preventDefault();
  const email = document.querySelector("#email").value;
  console.log(email)
  auth.sendPasswordResetEmail(email).then(() => {
      console.log('restablecer contraseña')
  })

})
const tracking = document.getElementById("track")
const iniciotracking = document.getElementById("botoninicio")
auth.onAuthStateChanged(user => {
  if (user) {
    console.log('user logged in: ');
    const userdata = db.collection('users').doc(user.uid).get().then(doc => {
      const data = db.collection("tasks").get().then(snapshot => {

        console.log(doc.data().apellido)
        console.log(doc.data().fecha)
        console.log(doc.data().email)
        const idu = (doc.data().UID)
        console.log(idu);
        cositas(snapshot.docs)
      })

    });
    const cositas = (data) => {
      data.forEach(doc => {
        const guide = doc.data();
        const guide1 = doc.data().estado;


        if (doc.data().uid == user.uid) {
          $( document ).ready(function() {
            $('#exampleModalCenter').modal('hide')
          });

          console.log(guide1);

          if (guide1 == 'Buenos Aires') {
            tracking.innerHTML += `<hr>
            <h4 class="producto-tracking">${doc.data().producto}</h4>
              <div class="row">
                <div class="col estado-tracking text-left">
                  En proceso
                </div>
                <div class="col estado-tracking text-center">
                  Los Angeles
                </div>
                <div class="col estado-tracking text-right">
                  Buenos Aires
                </div>
            </div>
            <div class="row">
              <div class="col-12">
                <progress id="file" max="100" style="width: 100%;" value="100"></progress>
              </div>
            </div>`

          } else {
            tracking.innerHTML += `<hr>
          <h4 class="producto-tracking">${doc.data().producto}</h4>
          <div class="row">
            <div class="col estado-tracking text-left">
              En proceso
            </div>
            <div class="col estado-tracking text-center">
              Los Angeles
            </div>
            <div class="col estado-tracking text-right">
              Buenos Aires
            </div>
          </div>
          <div class="row">
            <div class="col-12">
              <progress id="file" max="100" style="width: 100%;" value="50"></progress>
            </div>
          </div>`
          }
        }
      });
    }

  } else {
    $( document ).ready(function() {
      $('#exampleModalCenter').modal('toggle')
    });
    console.log('user logged out');
    const signinForm = document.querySelector("#formcon");
    signinForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const email = document.querySelector("#exampleInputEmail1").value;
      const password = document.querySelector("#exampleInputPassword1").value;
      console.log(email);
      console.log(password);
      auth
        .signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
          signinForm.reset();
          
         
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
  }
})






/*
const logout = document.querySelector('#logout');
logout.addEventListener('click', (e)=>{
  e.preventDefault();
  auth.signOut().then()
})
*/
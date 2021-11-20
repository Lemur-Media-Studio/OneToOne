const taskName = document.getElementById("nombre_usua");
const taskNamepro = document.getElementById("producto");
const taskPrecio = document.getElementById("precio");
const taskMarca = document.getElementById("marca");
const taskEstado = document.getElementById("estado");
const taskqr = document.getElementById("qr");
const taskbot1 = document.getElementById("bot1");
const card = document.getElementById("card")

auth.onAuthStateChanged(user => {
  if (user) {
    console.log('user logged in: ');
    const userdata = db.collection('users').doc(user.uid).get().then(doc => {
      const data = db.collection('tasks').get().then(snapshot => {

        console.log(doc.data().apellido)
        console.log(doc.data().fecha)
        console.log(doc.data().email)
        const uid = (doc.data().UID)
        console.log(uid);
        cositas(snapshot.docs)
        taskName.innerHTML += `<div class="container usuario text-end">Bienvenido, ${doc.data().nombre}<img src="img/usuario-predeterminado.png"
            class="mx-1 img-usuarios" height="35" alt="imagen de perfil del usuario"></div>`;
      })
    });
    const cositas = (data) => {
      data.forEach(doc => {
        const guide = doc.data().uid;
        console.log(guide)

        if (doc.data().uid == user.uid) {
          console.log(guide);
          URLd = firebase.storage().ref(doc.data().name).getDownloadURL().then(url =>{
            console.log(url);
            card.innerHTML += `<div data-aos="zoom-in" class="card mb-3 card-productos shadow p-3 mb-5 bg-body rounded" style="max-width: 1100px;">
            <div class="row g-0 align-items-center">
            <div class="col">
              <p class="titulo-trayecto"><strong>${doc.data().estado}</strong></p>
            </div>
            <div class="col">
              <div class="card-body">
                <p class="card-title producto-card">${doc.data().producto}</p>
                <p class="card-text producto-card">${doc.data().marca}</p>
                <h6 class="card-text producto-card">$ ${doc.data().valor}</h6>
              </div>
            </div>
            <div class="col">
              <div class="d-grid container-botones gap-2 mx-auto" id="bot1">
              <a class="btn btn-secondary boton-azul-productos btn-block" href="${url}" target="_blank" role="button">Ver factura</a>
              <a class="btn btn-secondary boton-beige-productos btn-block" href="https://api.whatsapp.com/send?phone=+1 (213) 306 6554" target="_blank" role="button">Ayuda</a>
              </div>
            </div>
            <div class="col">
            <a href="tracking.html" target="_blank">Tracking</a>
          </div>
          </div>
            </div>`
          })
        }
      });
    }
  } else {
    console.log('user logged out');
    card.innerHTML += `<div>Usted todavía no tiene productos registrados o no inicio sesion</div>`
  }
})


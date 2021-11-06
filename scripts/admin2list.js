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
      const data = db.collection("Productos").get().then(snapshot => {

        console.log(doc.data().apellido)
        console.log(doc.data().fecha)
        console.log(doc.data().email)
        const idu = (doc.data().UID)
        console.log(idu);
        cositas(snapshot.docs)






        taskName.innerHTML += `<div class="container usuario text-end">Bienvenido, ${doc.data().nombre}<img src="img/usuario-predeterminado.png"
            class="mx-1" height="35" alt="imagen de perfil del usuario"><button class="btn btn-dark boton-logout"
            type="button" id="logout">LOG OUT</button></div>`;

      })

    });
    /*
            const produdata =db.collection('Productos').doc(user.uid).get().then(doc=>{
                console.log(doc.data().producto)//marca
                console.log(doc.data().name)//producto
                //console.log(doc.data().uid)
                console.log(doc.data().id)//precio
                console.log(doc.data().description)//traking id

                taskNamepro.innerHTML += `<div class="card-title producto-card">${doc.data().name}</div>`;    
                taskPrecio.innerHTML += `<div class="card-title producto-card">$ ${doc.data().id}</div>`;   
                taskMarca.innerHTML += `<div class="card-title producto-card">${doc.data().producto}</div>`;
                taskEstado.innerHTML += `<div class="titulo-trayecto"><strong>EN CAMINO</strong></div>`;
                taskqr.innerHTML += `<img src="img/qrcode.png" class="img-qr img-fluid rounded-start" alt="código QR">`;
            });*/

    const cositas = (data) => {
      data.forEach(doc => {
        const guide = doc.data();

        if (doc.data().uid == user.uid) {
          console.log(guide);
          /*
          taskNamepro.innerHTML += `<div class="card-title producto-card">${doc.data().name}</div>`;    
          taskPrecio.innerHTML += `<div class="card-title producto-card">$ ${doc.data().id}</div>`;   
          taskMarca.innerHTML += `<div class="card-title producto-card">${doc.data().producto}</div>`;
          taskEstado.innerHTML += `<div class="titulo-trayecto"><strong>EN CAMINO</strong></div>`;
          taskbot1.innerHTML += `<button class="btn btn-dark boton-azul-productos" type="button">Ver factura</button>
          <button class="btn boton-beige-productos" type="button">Ayuda</button>`;          
          taskqr.innerHTML += `<img src="img/qrcode.png" class="img-qr img-fluid rounded-start" alt="código QR">`;
          */
          card.innerHTML += `<div class="card mb-3 card-productos shadow p-3 mb-5 bg-body rounded" style="max-width: 1100px;">
            <div class="row g-0 align-items-center">
            <div class="col-md-2 linea-blanco-right">
              <p class="titulo-trayecto"><strong>EN CAMINO</strong></p>
            </div>
            <div class="col">
              <div class="card-body">
                <h6 class="card-title producto-card">${doc.data().name}</h6>
                <p class="card-text producto-card">${doc.data().producto}</p>
              </div>
            </div>
            <div class="col">
              <div class="card-body">
                <h6 class="card-title producto-card">$ ${doc.data().id}</h6>
              </div>
            </div>
            <div class="col">
              <div class="d-grid gap-2 col-6 mx-auto" id="bot1">
                <button class="btn btn-dark boton-azul-productos" type="button">Ver factura</button>
                <button class="btn boton-beige-productos" type="button">Ayuda</button>
              </div>
            </div>
          </div>
          <div class="row"> 
          <div class="col-12">
          <div class="progress">
              <div class="progress-bar progress-bar-striped progress-bar-animated bg-dark" id="barra"
               role="progressbar" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100"></div>
               <a href="traking.html">traking</a>
            
              </div>
          </div>
          </div>
            </div>
            `
        }

      });
    }

  } else {
    console.log('user logged out');
  }
})




/*
const logout = document.querySelector('#logout');
logout.addEventListener('click', (e)=>{
  e.preventDefault();
  auth.signOut().then()
})
*/
const taskName = document.getElementById("nombre_usua");
const taskNamepro = document.getElementById("producto");
const taskPrecio = document.getElementById("precio");
const taskMarca = document.getElementById("marca");
const taskCard = document.getElementById("card-1");
const taskEstado = document.getElementById("estado");
const taskqr = document.getElementById("qr");
auth.onAuthStateChanged(user =>{
    if (user){
        console.log('user logged in: ', user);
        const userdata =db.collection('users').doc(user.uid).get().then(doc =>{

            console.log(doc.data().apellido)
            console.log(doc.data().fecha)
            console.log(doc.data().UID)
            console.log(doc.data().email)

            taskName.innerHTML += `<div class="container usuario text-end">${doc.data().nombre}<img src="img/usuario-predeterminado.png"
            class="mx-1" height="35" alt="imagen de perfil del usuario"><button class="btn btn-dark boton-logout"
            type="button" id="logout">LOG OUT</button></div>`;

        });

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
        });

    }else {
        console.log('user logged out');
    }
})

const logout = document.querySelector('#logout');
logout.addEventListener('click', (e)=>{
  e.preventDefault();
  auth.signOut().then()
})

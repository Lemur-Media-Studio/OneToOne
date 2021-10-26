/*  DOCUMENTACION DE FIREBASE: https://firebase.google.com/docs/auth/web/start
    LINK DE BASE DE DATOS: https://console.firebase.google.com/u/1/project/inicio-logueo-one/overview
***************************************************************************************************************
***************************************************************************************************************
    DECLARO UNA FUNCION PARA MANDAR DATOS A BASE DE DATOS   */
const db = firebase.firestore();
const todoForm = document.getElementById("todo_form")
const taskContainer = document.getElementById("nom");
const taskContainer2 = document.getElementById("ape");
const taskContainer3 = document.getElementById("fn");
const taskContainer4 = document.getElementById("mail");
const taskContainer5 = document.getElementById("uid");
const taskContainer6 = document.getElementById("bot");
const taskProdu = document.getElementById("prod1");
const taskProdu2 = document.getElementById("prod2");
const taskContainer7 = document.getElementById("cont7");
const listarclientes = () => db.collection("Users").get();
window.addEventListener("DOMContentLoaded", async (e) => {
  e.preventDefault();
  const querySnapshot = await listarclientes();
  querySnapshot.forEach((doc) => {
    console.log(doc.data())
    taskContainer.innerHTML += `<div class="info-admin">${doc.data().nombre}</div>`;
    taskContainer2.innerHTML += `<div class="info-admin label-apellido">${doc.data().apellido}</div>`;
    taskContainer3.innerHTML += `<div class="info-admin">${doc.data().fecha}</div>`;
    taskContainer4.innerHTML += `<div class="info-admin">${doc.data().email}</div>`;
    taskContainer5.innerHTML += `<div class="info-admin">${doc.data().UID}</div>`;
    taskContainer6.innerHTML += `<div class="container-botones"><button class="boton-borrar"><img src="img/basura.png" height="25" alt="basura"></button></div>`;
  });
});
const create = (name, producto, id, description) => {
  db.collection("Productos").doc(producto).set({
    name,
    producto,
    id,
    description,
  });
};
const listarprod = () => db.collection("Productos").get();
window.addEventListener("DOMContentLoaded", async (e) => {
  e.preventDefault();
  const querySnapshot = await listarprod();
  querySnapshot.forEach((doc) => {
    //console.log(doc.data())
    taskProdu.innerHTML += `<div class="info-admin">${doc.data().producto}</div>`;
    taskProdu2.innerHTML += `<div class="info-admin">${doc.data().id}</div>`;
  });
});
todoForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const name = todoForm["todo_name"].value;
  const id = todoForm["todo_id"].value;
  const producto = todoForm["todo_url"].value;
  const description = todoForm["todo_description"].value;

  await create(name, id, producto, description); // Llamo a mi función create
  todoForm.reset(); // Reseteamos los campos
});



//<div class="col btn-group">
    //<button class="btn bg-success botones-usuarios-registrados px-2" style="color: #fff;">UID</button>
    //<button class="btn bg-danger px-2"><i class="fas fa-trash-alt" style="color: #fff;"></i></button>
    //<button class="btn bg-warning px-2" style="color: #fff;"><i class="fas fa-pen" style="color: #fff;"></></i></button>
    //</div>

    //<button type="button" class="btn btn-warning"><i class="fas fa-pen" style="color: #fff;"></></i></button> 

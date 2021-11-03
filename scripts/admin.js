const auth = firebase.auth();
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
const taskProdu3 = document.getElementById("prod3");
const taskProdu4 = document.getElementById("prod4");
const taskProdu5 = document.getElementById("prod5");

const listprod = document.getElementById("productlist");

const listarclientes = () => db.collection("users").get();
const deleteid = id => db.collection('users').doc(id).delete();
window.addEventListener("DOMContentLoaded", async (e) => {
  e.preventDefault();
  const querySnapshot = await listarclientes();
  querySnapshot.forEach((doc) => {
    //console.log(doc.data())
    const task = doc.data();
    task.id = doc.id;
    //console.log(task.id)
    taskContainer.innerHTML += `<div class="info-admin">${doc.data().nombre}</div>`;
    taskContainer2.innerHTML += `<div class="info-admin label-apellido">${doc.data().apellido}</div>`;
    taskContainer3.innerHTML += `<div class="info-admin">${doc.data().fecha}</div>`;
    taskContainer4.innerHTML += `<div class="info-admin">${doc.data().email}</div>`;
    taskContainer5.innerHTML += `<div class="info-admin">${doc.data().UID}</div>`;
    taskContainer6.innerHTML += `<div class="container-botones"><button class="boton-borrar boton-delete" data-id="${task.id}"><img src="img/basura.png" height="25" data-id="${task.id}" class="boton-delete" alt="basura"></button></div>`;

    const btnsDelete = document.querySelectorAll('.boton-delete');
    btnsDelete.forEach(btn => {
      btn.addEventListener('click', async (e) => {
        await deleteid(e.target.dataset.id)
        window.location.reload()
      })
    })
  });
});
const create = (name, producto, id, description, uid) => {
  db.collection("Productos").doc().set({
    name,
    producto,
    id,
    description,
    uid
  });

};
const listarprod = () => db.collection("Productos").get();
window.addEventListener("DOMContentLoaded", async (e) => {
  e.preventDefault();
  const querySnapshot = await listarprod();
  querySnapshot.forEach((doc) => {
    console.log(doc.data())
    taskProdu.innerHTML += `<div class="info-admin">${doc.data().name}</div>`;
    taskProdu2.innerHTML += `<div class="info-admin">${doc.data().producto}</div>`
    taskProdu3.innerHTML += `<div class="info-admin">${doc.data().id}</div>`
    taskProdu4.innerHTML += `<div class="info-admin">${doc.data().description}</div>`
    taskProdu5.innerHTML += `<div class="info-admin">${doc.data().uid}</div>`
  });
});
todoForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const name = todoForm["todo_name"].value;
  const id = todoForm["todo_id"].value;
  const producto = todoForm["todo_val"].value;
  const description = todoForm["todo_description"].value;
  const uid = todoForm["todo_uid"].value;


  await create(name, id, producto, description, uid); // Llamo a mi función create
  todoForm.reset(); // Reseteamos los campos
});




//<div class="col btn-group">
//<button class="btn bg-success botones-usuarios-registrados px-2" style="color: #fff;">UID</button>
//<button class="btn bg-danger px-2"><i class="fas fa-trash-alt" style="color: #fff;"></i></button>
//<button class="btn bg-warning px-2" style="color: #fff;"><i class="fas fa-pen" style="color: #fff;"></></i></button>
//</div>

//<button type="button" class="btn btn-warning"><i class="fas fa-pen" style="color: #fff;"></></i></button> 
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
const botones = document.getElementById("cont7");

let editStatus = false;
let id = '';

const listprod = document.getElementById("productlist");

const listarclientes = () => db.collection("users").get();
const getTask = (id) => db.collection('Productos').doc(id).get();
const deleteid = id => db.collection('users').doc(id).delete();
const updateTask = (id, updatedTask) => db.collection('Productos').doc(id).update(updatedTask);

  
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
const create = (name, producto, id, description, uid, track) => {
  db.collection("Productos").doc().set({
    name,
    producto,
    id,
    description,
    uid,
    track
  });

};
const listarprod = () => db.collection("Productos").get();
window.addEventListener("DOMContentLoaded", async (e) => {
  e.preventDefault();
  const querySnapshot = await listarprod();
  querySnapshot.forEach((doc) => {
    //console.log(doc.data())
    const task = doc.data();
    task.id = doc.id;
    taskProdu.innerHTML += `<div class="info-admin">${doc.data().name}</div>`;
    taskProdu2.innerHTML += `<div class="info-admin">${doc.data().producto}</div>`
    taskProdu3.innerHTML += `<div class="info-admin">${doc.data().id}</div>`
    taskProdu4.innerHTML += `<div class="info-admin">${doc.data().description}</div>`
    taskProdu5.innerHTML += `<div class="info-admin">${doc.data().uid}</div>`
    botones.innerHTML += `<div class="container-botones">
    <button class="boton-borrar boton-delete"><img src="img/basura.png" height="25" class="boton-delete" alt="basura"></button>
    <button class="boton-borrar boton-edit" data-id="${task.id}"><img src="img/editar.png" data-id="${task.id}" height="25" class="boton-editar" alt="lapiz"></button>
    </div>`


    const btnsEdit = document.querySelectorAll('.boton-edit');
    btnsEdit.forEach(btn => {
      btn.addEventListener('click', async (e) => {
        const doc = await getTask(e.target.dataset.id);
        const task = doc.data();

        editStatus = true;
        id = doc.id;

        todoForm['todo_name'].value = task.name;
        todoForm['todo_id'].value = task.id;
        todoForm['todo_val'].value = task.producto;
        todoForm['todo_description'].value = task.description;
        todoForm['todo_uid'].value = task.uid;
        todoForm['btn_todo_form'].innerText = "ACTUALIZAR";
      })
    })
  });
});


todoForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const name = todoForm["todo_name"];
  const id = todoForm["todo_id"];
  const producto = todoForm["todo_val"];
  const description = todoForm["todo_description"];
  const uid = todoForm["todo_uid"];

  if(!editStatus){
    await create(name, id, producto, description, uid); 
  }else{
    await updateTask(id, {
      name: name.value,
      id: id.value,
      producto: producto.value,
      description:  description.value,
      uid: uid.value
    })

  }
  
  todoForm.reset(); // Reseteamos los campos
});
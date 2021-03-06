const db = firebase.firestore();
const taskForm = document.getElementById("task-form");
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
const estados = document.getElementById("estado");

//tabla
const t1 = document.getElementById("t1");
const t2 = document.getElementById("t2");
const t3 = document.getElementById("t3");

const ref = firebase.storage().ref();
let editStatus = false;

$(document).ready(function(){

  $("#search").keyup(function(){

  _this = this;

  

      $.each($("#t1 tbody tr"), function() {

      if($(this).text().toLowerCase().indexOf($(_this).val().toLowerCase()) === -1)

      $(this).hide();

      else

      $(this).show();

      });

  });

});

const saveProduto = (producto, marca, valor, idt, uid, estado, name, nota, fecha) =>
  db.collection("tasks").doc().set({
    producto,
    marca,
    valor,
    idt,
    uid,
    estado,
    name,
    nota,
    fecha
  });

const getTasks = () => db.collection("tasks").get();

const getUsers = (callback) => db.collection("users").onSnapshot(callback);

const deleteid = (id) => db.collection("users").doc(id).delete();

const onGetTasks = (callback) => db.collection("tasks").onSnapshot(callback);

const deleteTask = (id) => db.collection("tasks").doc(id).delete();

const getTask = (id) => db.collection("tasks").doc(id).get();

const updateTask = (id, updatedTask) =>
  db.collection("tasks").doc(id).update(updatedTask);

window.addEventListener("DOMContentLoaded", async (e) => {
  getUsers((querySnapshot) => {
    taskContainer.innerHTML = `<h6 class="label-admin">Nombre</h6>`;
    taskContainer2.innerHTML = `<h6 class="label-admin label-apellido">Apellido</h6>`;
    taskContainer3.innerHTML = `<h6 class="label-admin">F/N</h6>`;
    taskContainer4.innerHTML = `<h6 class="label-admin">E-mail</h6>`;
    taskContainer5.innerHTML = `<h6 class="label-admin">UID</h6>`;
    taskContainer6.innerHTML = `<h6 class="label-admin">Borrar</h6>`;
    querySnapshot.forEach((doc) => {
      //console.log(doc.data())
      const task = doc.data();
      task.id = doc.id;
      //console.log(task.id)
      taskContainer.innerHTML += `<div class="info-admin">${doc.data().nombre}</div>`;
      taskContainer2.innerHTML += `<div class="info-admin label-apellido">${doc.data().apellido}</div>`;
      taskContainer3.innerHTML += `<div class="info-fecha-nacimiento">${doc.data().fecha}</div>`;
      taskContainer4.innerHTML += `<div class="info-admin">${doc.data().email}</div>`;
      taskContainer5.innerHTML += `<div class="info-admin">${doc.data().UID}</div>`;
      taskContainer6.innerHTML += `<div class="container-botones"><button class="boton-borrar boton-delete" data-id="${task.id}">
      <img src="img/basura.png" height="25" data-id="${task.id}" class="boton-delete" alt="basura"></button></div>`;

      const btnsDelete = document.querySelectorAll(".boton-delete");
      btnsDelete.forEach((btn) => {
        btn.addEventListener("click", async (e) => {
          await deleteid(e.target.dataset.id);
          await deleteuserid();
        });
      });
    });
  });
});

window.addEventListener("DOMContentLoaded", async (e) => {
  onGetTasks((querySnapshot) => {
    querySnapshot.forEach((doc) => {
      const task = doc.data();
      task.id=doc.id;

      
      t1.innerHTML += `
    <tbody>
      <tr>
        <th scope="row"></th>
        <td >${task.fecha}</td>
        <td >${task.producto}</td>
        <td >${task.marca}</td>
        <td >${task.valor}</td>
        <td >${task.idt}</td>
        <td >${task.uid}</td>
        <td >${task.estado}</td>
        <td >${task.nota}</td>
        
        <td ><div class="container-botones" data-id="MIID">
        <button class="boton-borrar" botondelete" data-id="${task.id}">
        <img src="img/basura.png" data-id="${doc.id}" height="25" class="botondelete" alt="basura"></button>
  
        <button class="boton-borrar btn-edit" data-id="${task.id}">
        <img src="img/editar.png" data-id="${doc.id}" height="25" class="boton-editar" alt="lapiz"></button>
        </div>
        </td>

      </tr>
    </tbody>`;
    rows = t1.getElementsByTagName('tr')
    text = 'textContent' in document ? 'textContent' : 'innerText';

    for (var i = 0, len = rows.length; i < len; i++){
        rows[i].children[0][text] = i ;
    }


      URLd = firebase
        .storage()
        .ref(task.name)
        .getDownloadURL()
        .then((url) => {
          console.log(url);
        });
    });

    const btnsDelete = document.querySelectorAll(".botondelete");   
    btnsDelete.forEach(btn => {
      btn.addEventListener("click", async (e)=>{
        await deleteTask(e.target.dataset.id)
        location.reload();
      
      })
    })


    /*
    btnsDelete.forEach((btn) =>
      btn.addEventListener("click", async (e) => {
        console.(e.target.dataset.id);
        try {
          await deleteTask(e.target.dataset.id);
        } catch (error) {
          console.log(error);
        }
      })
    );
    */

    const btnsEdit = document.querySelectorAll(".btn-edit");
    btnsEdit.forEach((btn) => {
      btn.addEventListener("click", async (e) => {
        try {
          const doc = await getTask(e.target.dataset.id);
          const task = doc.data();
          taskForm["task-title"].value = task.producto;
          taskForm["task-description"].value = task.marca;
          taskForm["task-valor"].value = task.valor;
          taskForm["task-track"].value = task.idt;
          taskForm["task-uid"].value = task.uid;
          taskForm["task-estado"].value = task.estado;
          taskForm["task-nota"].value = task.nota;
          taskForm["task-fecha"].value = task.fecha;

          editStatus = true;
          id = doc.id;
          taskForm["btn_todo_form"].innerText = "Update";
          
        } catch (error) {
          console.log(error);
        }
        
      });
      
    });
  });
});

taskForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const producto = taskForm["task-title"];
  const marca = taskForm["task-description"];
  const valor = taskForm["task-valor"];
  const idt = taskForm["task-track"];
  const uid = taskForm["task-uid"];
  const estado = taskForm["task-estado"];
  const nota = taskForm["task-nota"];
  const fecha = taskForm["task-fecha"];
  console.log(ref);
  const file = document.querySelector("#facturas").files[0];
  const name = file.name;
  const task = ref.child(name).put(file);

  try {
    if (!editStatus) {
      await saveProduto(
        producto.value,
        marca.value,
        valor.value,
        idt.value,
        uid.value,
        estado.value,
        name,
        nota.value,
        fecha.value
      );
      
    } else {
      await updateTask(id, {
        producto: producto.value,
        marca: marca.value,
        valor: valor.value,
        idt: idt.value,
        uid: uid.value,
        estado: estado.value,
        name: name,
        nota: nota.value,
        fecha:fecha.value
      });

      editStatus = false;
      id = "";
      taskForm["btn_todo_form"].innerText = "Save";
      location.reload();
      
    }

    taskForm.reset();
    producto.focus();
  } catch (error) {
    console.log(error);
  }
});


/*
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
        taskContainer6.innerHTML += `<div class="container-botones"><button class="boton-borrar boton-delete" data-id="${task.id}">
        <img src="img/basura.png" height="25" data-id="${task.id}" class="boton-delete" alt="basura"></button></div>`;
    
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
    const deleteprod = id => db.collection('Productos').doc(id).delete();
    const getProd = id => db.collection('Productos').doc(id).get();
    const updateProd = (id, updatedProd) => db.collection('Productos').doc(id).update(updatedProd);
    let editestado = false;
    let id = '';
    
    window.addEventListener("DOMContentLoaded", async (e) => {
      e.preventDefault();
      const querySnapshot = await listarprod();
      querySnapshot.forEach((doc) => {

        const task = doc.data();
        task.id = doc.id;
        taskProdu.innerHTML += `<div class="info-admin">${doc.data().name}</div>`;
        taskProdu2.innerHTML += `<div class="info-admin">${doc.data().producto}</div>`
        taskProdu3.innerHTML += `<div class="info-admin">${doc.data().id}</div>`
        taskProdu4.innerHTML += `<div class="info-admin">${doc.data().description}</div>`
        taskProdu5.innerHTML += `<div class="info-admin">${doc.data().uid}</div>`
        botones.innerHTML += `<div class="container-botones">
        <button class="boton-borrar botondelete" data-id="${task.id}">
        <img src="img/basura.png" data-id="${task.id}" height="25" class="botondelete" alt="basura"></button>

        <button class="boton-borrar botoneditar" data-id="${task.id}">
        <img src="img/editar.png" data-id="${task.id}" height="25" class="boton-editar" alt="lapiz"></button>
        </div>`

        const btndeletepro = document.querySelectorAll('.botondelete');
        btndeletepro.forEach(btn => {
          btn.addEventListener('click', async (e) => {
            await deleteprod(e.target.dataset.id)

          })
        });

        const btneditpro = document.querySelectorAll('.botoneditar');
        btneditpro.forEach(btn => {
          btn.addEventListener('click', async (e) => {
            const doc = await getProd(e.target.dataset.id);
            const task = (doc.data());
            
            editestado = true;
            id = doc.id;

            todoForm['todo_name'].value = task.name;
            todoForm['todo_id'].value = task.id;
            todoForm['todo_val'].value = task.producto;
            todoForm['todo_description'].value = task.description;
            todoForm['todo_uid'].value = task.uid;
            todoForm['btn_todo_form'].innerText = 'Actualizar'

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

    
    
      if(!editestado){
        await create(name.value, id.value, producto.value, description.value, uid.value); 
      }else{
        await updateProd(id, {
          name: name.value,
          id: id.value,
          producto: producto.value,
          description: description.value,
          uid: uid.value
        })

        
      }
      todoForm.reset(); // Reseteamos los campos
    });


/*const auth = firebase.auth();
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

      })
    })



todoForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const name = todoForm["todo_name"];
  const id = todoForm["todo_id"];
  const producto = todoForm["todo_val"];
  const description = todoForm["todo_description"];
  const uid = todoForm["todo_uid"];
  await create(name, id, producto, description, uid); 
  todoForm.reset(); // Reseteamos los campos
});
*/
  
/*  DOCUMENTACION DE FIREBASE: https://firebase.google.com/docs/auth/web/start
    LINK DE BASE DE DATOS: https://console.firebase.google.com/u/1/project/inicio-logueo-one/overview
***************************************************************************************************************
***************************************************************************************************************
    DECLARO UNA FUNCION PARA MANDAR DATOS A BASE DE DATOS   */

    const db = firebase.firestore();
    const todoForm = document.getElementById('todo_form');
    const taskContainer = document.getElementById('cont');
    const taskContainer2 = document.getElementById('cont2');
    const taskContainer3 = document.getElementById('cont3');
    const taskContainer4 = document.getElementById('cont4');
    const taskProdu = document.getElementById('prod1');
    const taskProdu2 = document.getElementById('prod2');
    const taskContainer5 = document.getElementById('cont5');

    const create = (name, producto, id, description) => {
        db.collection('Usuarios').doc(name).set({
            id,
            name,
            producto
        })
    
        db.collection('Productos').doc(producto).set({
            name,
            producto,
            description
        })
    
    }
    
    const listar = () => db.collection('Usuarios').get();
    window.addEventListener('DOMContentLoaded', async (e) => {
        e.preventDefault();
        const querySnapshot = await listar();
        querySnapshot.forEach(doc => {
            console.log(doc.data())
            taskContainer.innerHTML += `<div>${doc.data().name}</div>`
            taskContainer2.innerHTML += `<div>${doc.data().id}</div>`
            taskContainer3.innerHTML += `<div>${doc.data().producto}</div>`
            taskContainer4.innerHTML += `<div class="col btn-group"><button class="btn bg-success px-2" style="color: #fff;">UID</button>
            <button class="btn bg-danger px-2"><i class="fas fa-trash-alt" style="color: #fff;"></i></button>
            <button class="btn bg-warning px-2" style="color: #fff;">EDITAR</button> </div>`
            taskProdu.innerHTML += `<div>${doc.data().producto}</div>`
            taskProdu2.innerHTML += `<div>${doc.data().description}</div>`
            taskContainer5.innerHTML += `<div class="col btn-group"><button class="btn bg-success px-2" style="color: #fff;">UID</button>
            <button class="btn bg-info px-2" style="color: #fff;">FID</button>
            <button class="btn bg-danger px-2"><i class="fas fa-trash-alt" style="color: #fff;"></i></button>
            <button class="btn bg-warning px-2" style="color: #fff;">EDITAR</button> </div>`
        })
    })
    

    
    todoForm.addEventListener('submit', async e => {
        e.preventDefault();
        const name = todoForm['todo_name'].value;
        const id = todoForm['todo_id'].value;
        const producto = todoForm['todo_url'].value;
        const description = todoForm['todo_description'].value;
    
        await create(name, id, producto, description); // Llamo a mi función create
        todoForm.reset(); // Reseteamos los campos
    });


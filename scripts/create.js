  
/*  DOCUMENTACION DE FIREBASE: https://firebase.google.com/docs/auth/web/start
    LINK DE BASE DE DATOS: https://console.firebase.google.com/u/1/project/inicio-logueo-one/overview
***************************************************************************************************************
***************************************************************************************************************
    DECLARO UNA FUNCION PARA MANDAR DATOS A BASE DE DATOS   */

const db = firebase.firestore();
const todoForm = document.getElementById('todo_form');

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

todoForm.addEventListener('submit', async e => {
    e.preventDefault();
    const name = todoForm['todo_name'].value;
    const id = todoForm['todo_id'].value;
    const producto = todoForm['todo_url'].value;
    const description = todoForm['todo_description'].value;

    await create(name, id, producto, description); // Llamo a mi función create
    todoForm.reset(); // Reseteamos los campos
});


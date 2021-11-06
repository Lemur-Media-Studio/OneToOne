
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
        })
  
      });
      const cositas = (data) => {
        data.forEach(doc => {
          const guide = doc.data();
  
          if (doc.data().uid == user.uid) {
            console.log(guide);
    
              
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
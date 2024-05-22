
const firebaseConfig = {
    apiKey: "AIzaSyACj36Y_y7nY_c2j6Aj4LQ-FeUC3G9IyGs",
  authDomain: "lunar-apps.firebaseapp.com",
  projectId: "lunar-apps",
  storageBucket: "lunar-apps.appspot.com",
  messagingSenderId: "566177281549",
  appId: "1:566177281549:web:17edabaf5a4dadbb0e0744"
  };
  

  firebase.initializeApp(firebaseConfig);
  
  const db = firebase.firestore();
  
  const taskForm = document.getElementById('taskForm');
  const taskList = document.getElementById('taskList');

  taskForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const title = taskTitle.value.trim();
    if (title !== '') {
      db.collection('tasks').add({
        title: title,
        createdAt: firebase.firestore.FieldValue.serverTimestamp()
      })
      .then(() => {
        taskForm.reset();
      })
      .catch((error) => {
        console.error('Error adding task: ', error);
      });
    }
  });
  
  
  db.collection('tasks').orderBy('createdAt', 'desc').onSnapshot(snapshot => {
    taskList.innerHTML = '';
    snapshot.forEach(doc => {
      const task = doc.data();
      const li = document.createElement('li');
      li.textContent = task.title;
      const deleteButton = document.createElement('button');
      deleteButton.textContent = 'Delete';
      deleteButton.addEventListener('click', () => {
        db.collection('tasks').doc(doc.id).delete();
      });
      li.appendChild(deleteButton);
      taskList.appendChild(li);
    });
  });
  
import * as firebase from 'firebase';
import 'firebase/storage';

class Storage {
  constructor() {
    if (!firebase.apps.length) {
      firebase.initializeApp({
        apiKey: 'AIzaSyBZBRyPvB-QehoKLJE4sCo0FSk8L27DU4g',
        authDomain: 'myproject-fcf1f.firebaseapp.com',
        databaseURL: 'https://myproject-fcf1f.firebaseio.com',
        projectId: 'myproject-fcf1f',
        storageBucket: 'myproject-fcf1f.appspot.com',
        messagingSenderId: '664454986780',
        appId: '1:664454986780:web:a16135805279656d74b3d9',
        measurementId: 'G-6RH15BK2KG',
      });
    } else {
      console.log('firebase apps already running...');
    }
  }

  uploadToFirebase = async (uri, name, success, reject) => {
    const response = await fetch(uri);
    const blob = await response.blob();

    var ref = firebase
      .storage()
      .ref()
      .child('image/' + name);
    ref
      .put(blob)
      .then(function (snapshot) {
        snapshot.ref.getDownloadURL().then(function (uri) {
          success(uri);
        });
      })
      .catch(function (error) {
        reject(error);
      });
  };

  uploadToFirebase2 = async (uri, name, success, reject, uploading) => {
    const response = await fetch(uri);
    const blob = await response.blob();
    var uploadTask = firebase
      .storage()
      .ref()
      .child('image/' + name)
      .put(blob);

    uploadTask.on(
      'state_change',
      function (snapshot) {
        var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        uploading(progress);
      },
      function (error) {
        reject(error);
        console.log('error Picture')
      },
      function () {
        uploadTask.snapshot.ref.getDownloadURL().then(function (uri) {
          success(uri);
        });
      }
    );
  };

  getList=async(success , reject)=>{
    var ref = firebase.storage().ref().child('image');

    await ref.listAll()
    .then(function(res){
      success(res)
    })
    .catch(function(error){
      reject(error)
    })

  }

}

const storage = new Storage();

export default storage;

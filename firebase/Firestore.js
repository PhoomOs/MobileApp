import * as firebase from 'firebase';
import '@firebase/firestore'
import '@firebase/auth';

class Firestore {
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
    }
    else {
      console.log("firebase apps already running...");
    }
    //this.db = firebase.firestore();
    
  }

  addCarWithID = (car, success, reject) => {
    car.createdDate = firebase.firestore.FieldValue.serverTimestamp();
    firebase.firestore().collection('Car').doc('123456').set(car)
      .then(function (docRef) {
        success(docRef);
      })
      .catch(function (error) {
        reject(error);
      });
  }

  addCar = (car, success, reject) => {
    car.createdDate = firebase.firestore.FieldValue.serverTimestamp();
    firebase.firestore().collection('Car').add(car)

      .then(function (docRef) {
        success(docRef);
      })
      .catch(function (error) {
        reject(error);
      });
  }

  getAllCar = (success, reject) => {
    firebase.firestore().collection("Car").get()
      .then(function (querySnapshot) {
        success(querySnapshot);
      })
      .catch(function (error) {
        reject(error);
      });
  }
  
  updateUser = (user, success, reject) => {
    firebase.firestore().collection('Account')
      .doc(user.id)
      .update({
        firstname: user.firstname,
        lastname: user.lastname,
        // studentID: user.studentID,
        // username: user.username,
      })
      .then(function () {
        success(null);
      })
      .catch(function (error) {
        reject(error)
      });
  }


  getCarByPrice = (price, success, reject) => {
    firebase.firestore().collection('Car')
      .where("price", ">=", price)
      .orderBy("price", "desc")
      .limit(6)
      .get()
      .then(function (querySnapshot) {
        success(querySnapshot);
      })
      .catch(function (error) {
        reject(error);
      });
  }

  updateCarByID = (car, success, reject) => {
    firebase.firestore().collection('Car')
      .doc(car.id)
      .update({
        model: car.model,
        description: car.description,
        // price: car.price
      })
      .then(function () {
        success();
      })
      .catch(function (error) {
        reject(error);
      });
  }

  deleteCar = (id, success, reject) => {
    firebase.firestore().collection('Car')
      .doc(id)
      .delete()
      .then(function () {
        success();
      })
      .catch(function (error) {
        reject(error);
      });
  }

  //////////USER 

  addUser = (User, success, reject) => {
    User.createdDate = firebase.firestore.FieldValue.serverTimestamp();
    firebase.firestore().collection('Account').add(User)
      .then(function (docRef) {
        success(docRef);
      })
      .catch(function (error) {
        reject(error);
      });
  }
  getUser = (success, reject) => {
    firebase.firestore().collection('Account').get()
      .then(function (querySnapshot) {
        success(querySnapshot);
      })
      .catch(function (error) {
        reject(error);
      });
  }

  getUserByUid = (uid, success, reject) => {
    firebase.firestore().collection('Account')
      .where("uid", "==", uid)
      .get()
      .then(function (querySnapshot) {
        success(querySnapshot);
      })
      .catch(function (error) {
        reject(error);
      });
  }






}
const firestore = new Firestore();
export default firestore;
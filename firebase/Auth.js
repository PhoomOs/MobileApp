import * as firebase from 'firebase';
import '@firebase/auth';
import '@firebase/firestore';
class Auth {
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
            console.log('firebase app already running');
        }
        this.auth = firebase.auth();
    }

    signIn = (email, password,success, reject) => {
        this.auth
            .signInWithEmailAndPassword(email, password)
            .then(function (user) {
                success(user);
            })
            .catch(function (error) {
                reject(error);
            });
    };
    //ดูตัวที่กำลัง login , userID ตัวบอก
    listeningCurrentUser = (getSuccess) => {
        this.auth.onAuthStateChanged(function (user) {
            getSuccess(user);
        });
    };

    signOut = (success, reject) => {
        this.auth
            .signOut()
            .then(function () {
                success(null);
                console.log("Signed out")
            })
            .catch(function (error) {
                reject(error);
            });
    };

    resetUser = (email, success, reject) => {
        this.auth
            .sendPasswordResetEmail(email)
            .then(function () {
                success(null);
            })
            .catch(function (error) {
                reject(error);
            });
    };

    createUser = (email, password, success, reject) => {
        this.auth
            .createUserWithEmailAndPassword(email, password)
            .then((user) => {
                success(user)
            }
            )
            .catch(function (error) {
                reject(error)
            });
    };
}

const auth = new Auth();
export default auth;

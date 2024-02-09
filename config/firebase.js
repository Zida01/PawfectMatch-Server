const firebase = require('firebase/app');
require('firebase/auth');
require('firebase/firestore')



const firebaseConfig = {
    apiKey: "AIzaSyCGmIbdR8VI0Qdh01jx7u2whQPHuHDKdRw",
    authDomain: "pawfectmatch-57373.firebaseapp.com",
    projectId: "pawfectmatch-57373",
    storageBucket: "pawfectmatch-57373.appspot.com",
    messagingSenderId: "433428891639",
    appId: "1:433428891639:web:3f7be991cde0f419ba50f2",
    measurementId: "G-TJVL7CZSTT"
};


firebase.initializeApp(firebaseConfig);

module.exports = firebase;

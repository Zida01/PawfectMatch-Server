const firebase = require('firebase/app');
require('firebase/auth');
require('firebase/firestore')




const firebaseConfig = {
    apiKey: process.env.apiKey,
    authDomain: process.authDomain,
    projectId: process.env.projectId,
    storageBucket: process.env.storageBucket,
    messagingSenderId: process.env.messagingSenderId,
    appId: process.env.appId,
    measurementId: process.env.measurementId,
};



firebase.initializeApp(firebaseConfig);

module.exports = firebase;

//firebase configuration

import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyBgyGIHcBlqkV2XHNTEnLPH3xd6ecXzY1w",
    authDomain: "guessthegraph-app.firebaseapp.com",
    projectId: "guessthegraph-app",
    storageBucket: "guessthegraph-app.firebasestorage.app",
    messagingSenderId: "250501863956",
    appId: "1:250501863956:web:8fe7d2df70620755da2501"
}

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

export {firebase};
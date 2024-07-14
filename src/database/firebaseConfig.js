import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyAITQcjX6svjbt9MbYWOqp9RM9Q6BnPr98",
    authDomain: "pousada-112ff.firebaseapp.com",
    projectId: "pousada-112ff",
    storageBucket: "pousada-112ff.appspot.com",
    messagingSenderId: "974847965877",
    appId: "1:974847965877:web:c9e9be4087d0c5ad555cfc"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
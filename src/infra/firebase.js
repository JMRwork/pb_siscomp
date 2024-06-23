import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyDIal89APc8ZkD5fdZn3n0vr0F_TnaCUTo",
    authDomain: "react-pb-a8608.firebaseapp.com",
    projectId: "react-pb-a8608",
    storageBucket: "react-pb-a8608.appspot.com",
    messagingSenderId: "152144743421",
    appId: "1:152144743421:web:8922b2f8675b1a0fc82794"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export default app;
export const db = getFirestore(app);

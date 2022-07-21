import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyDYMRR5EQvUoKXguBh5jX6Z1Frg6yIgX-s",
    authDomain: "my-gadget-b96ab.firebaseapp.com",
    projectId: "my-gadget-b96ab",
    storageBucket: "my-gadget-b96ab.appspot.com",
    messagingSenderId: "613174100890",
    appId: "1:613174100890:web:44d40bfde070c536bdf023"
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

export default auth;
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Web app's Firebase configuration

const firebaseConfig = {
  apiKey: "AIzaSyChPE80KI0LOCBu7e_RoPnCKd5fL-tLaow",
  authDomain: "crwn-db-a66bd.firebaseapp.com",
  databaseURL: "https://crwn-db-a66bd.firebaseio.com",
  projectId: "crwn-db-a66bd",
  storageBucket: "crwn-db-a66bd.appspot.com",
  messagingSenderId: "171162464806",
  appId: "1:171162464806:web:4ec570d866de37d85cace7",
  measurementId: "G-6Y4W7PW2TL",
};

// Initialize Firebase
const firbaseApp = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(firbaseApp);
export default firbaseApp;

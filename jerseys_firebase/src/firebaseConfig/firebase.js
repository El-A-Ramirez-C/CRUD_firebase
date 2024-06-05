import { initializeApp } from "firebase/app";

import {getFirestore} from '@firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyBzrBl-Ro1X3EjjMCc2CldhdGJE6DCRCNE",
  authDomain: "react-crud-840e3.firebaseapp.com",
  projectId: "react-crud-840e3",
  storageBucket: "react-crud-840e3.appspot.com",
  messagingSenderId: "795647531485",
  appId: "1:795647531485:web:0c7313ddf2fc8baaf87e34"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app)
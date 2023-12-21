

import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyA-iWDwN9qvPkZ_6bXOw88OOJf6Y5asiwY",
  authDomain: "react-hp-325a3.firebaseapp.com",
  databaseURL: "https://react-hp-325a3-default-rtdb.firebaseio.com",
  projectId: "react-hp-325a3",
  storageBucket: "react-hp-325a3.appspot.com",
  messagingSenderId: "38820397731",
  appId: "1:38820397731:web:e0080b908c7a4592d6b516",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth, firebaseConfig }; // Export both auth and firebaseConfig

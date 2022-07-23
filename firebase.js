import {initializeApp} from 'firebase/app'
import { getFirestore } from 'firebase/firestore';


const firebaseConfig = {
  apiKey: "AIzaSyBP03uF84vDQmy2-UX1MSFr9gl2aWKLDNQ",
  authDomain: "exemplorn-78246.firebaseapp.com",
  projectId: "exemplorn-78246",
  storageBucket: "exemplorn-78246.appspot.com",
  messagingSenderId: "488393198753",
  appId: "1:488393198753:web:2342e87a84de77d711f4e0"
};

const app = initializeApp(firebaseConfig);

  const firestore = getFirestore(app)
  export {firestore}
  
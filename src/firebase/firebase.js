import { initializeApp} from "firebase/app";
import { getAuth } from "firebase/auth";



const firebaseConfig = {
  apiKey: "AIzaSyCPNBgZvka_s2kJ1l1BhofeWN228shfsBA",
  authDomain: "routeease-39a6e.firebaseapp.com",
  projectId: "routeease-39a6e",
  storageBucket: "routeease-39a6e.appspot.com",
  messagingSenderId: "386809477081",
  appId: "1:386809477081:web:2324d8c1ac68de18dfcbc8",
  measurementId: "G-C11Y3TRL86"
};




// Initialize Firebase

const app = initializeApp(firebaseConfig);
// export const auth = getAuth(app)
 const auth = getAuth(app);
 export {auth, app}
export default app;
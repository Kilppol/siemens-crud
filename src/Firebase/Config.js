import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
const firebaseConfig = {
	apiKey: 'AIzaSyDMe-SwaLevYy3S-ENiE7MVQ4pbzXgkM9k',
	authDomain: 'siemens-crud.firebaseapp.com',
	projectId: 'siemens-crud',
	storageBucket: 'siemens-crud.appspot.com',
	messagingSenderId: '151622948968',
	appId: '1:151622948968:web:cc98795794b511a01943dd',
	measurementId: 'G-WPQD248CP2',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
export default db;

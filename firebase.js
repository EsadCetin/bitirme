import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

const firebaseConfig = {
	apiKey: "AIzaSyCKGYqJIN2JfhWZOX6GFj6UJAgpli-R_Lw",
	authDomain: "okulicimesajlasma.firebaseapp.com",
	projectId: "okulicimesajlasma",
	storageBucket: "okulicimesajlasma.appspot.com",
	messagingSenderId: "762685874456",
	appId: "1:762685874456:web:e07b51fe83f728825bbe6d",
	measurementId: "G-0H28J77K34",
};
let app;

if (firebase.apps.length === 0) {
	const firebaseApp = firebase.initializeApp(firebaseConfig);
} else {
	app = firebase.app();
}

const db = firebase.firestore();
const auth = firebase.auth();

export { db, auth };

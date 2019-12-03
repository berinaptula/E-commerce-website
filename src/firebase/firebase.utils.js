import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyAwL605A9Rkv5Brh1LtPhKPhSijJUcCj-U",
    authDomain: "e-commerce-28761.firebaseapp.com",
    databaseURL: "https://e-commerce-28761.firebaseio.com",
    projectId: "e-commerce-28761",
    storageBucket: "e-commerce-28761.appspot.com",
    messagingSenderId: "905036610438",
    appId: "1:905036610438:web:114a83fb4b2cb3e7898a07",
    measurementId: "G-SEEZ6S0BSP"
}
firebase.initializeApp(config);

export const createUserProfileDocument = async (userAuth, additionalData) => {
    if (!userAuth) return;

    const userRef = firestore.doc(`users/${userAuth.uid}`);

    const snapShot = await userRef.get();

    if (!snapShot.exists) {
        const { displayName, email } = userAuth;
        const createdAt = new Date();
        try {
            await userRef.set({
                displayName,
                email,
                createdAt,
                ...additionalData
            });
        } catch (error) {
            console.log('error creating user', error.message);
        }
    }

    return userRef;
};

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
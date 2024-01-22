import { initializeApp } from 'firebase/app';
import { getAuth, 
    signInWithRedirect, 
    signInWithPopup, 
    GoogleAuthProvider 
} from 'firebase/auth';
import { getFirestore, 
    doc, 
    getDoc, 
    setDoc 
} from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyAXZINmfU5wwECGDWiXaTP_wex3ymWVfp4",
    authDomain: "crwn-clothing-rt.firebaseapp.com",
    projectId: "crwn-clothing-rt",
    storageBucket: "crwn-clothing-rt.appspot.com",
    messagingSenderId: "750519524777",
    appId: "1:750519524777:web:61857c14943d5f91dcb8b8"
  };

  const firebaseApp = initializeApp(firebaseConfig);

  const provider = new GoogleAuthProvider();
  provider.setCustomParameters({
    prompt: 'select_account'
  });

  export const auth = getAuth();
  export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

  export const db = getFirestore();

  export const createUserDocumentFromAuth = async (userAuth) => {
    const userDocRef = doc(db, 'users', userAuth.uid);

    console.log(userDocRef);

    const userSnapshot = await getDoc(userDocRef);
    console.log(userSnapshot);
    console.log(userSnapshot.exists());

    if(!userSnapshot.exists()) {
        const { displayName, email } = userAuth;
        const createdAt = new Date();

        try {
            await setDoc(userDocRef, {
                displayName,
                email,
                createdAt
            });
        } catch (error) {
            console.log('error creating the user', error.message);
        }
    }

    return userDocRef;
  }
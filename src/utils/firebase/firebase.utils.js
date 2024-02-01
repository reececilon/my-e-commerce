import { initializeApp } from 'firebase/app';
import { getAuth, 
    signInWithRedirect, 
    signInWithPopup, 
    GoogleAuthProvider,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
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

  const googleProvider = new GoogleAuthProvider();

  googleProvider.setCustomParameters({
    prompt: 'select_account'
  });

  export const auth = getAuth();
  export const signInWithGooglePopup = () => signInWithPopup(auth, googleProvider);

  export const db = getFirestore();

  export const createUserDocumentFromAuth = async (userAuth, additionalInformation = {}) => {
    if (!userAuth) return;
    /*
    <<signInWithGooglePopup>> 
    
    userDocRef is created by using the doc method and passing in the db, 
    with collection name 'users' and userAuth.uid (which comes from the user that is passed in from the sign in component). 
    This is just to get the location of the document.
    The this reference is user by the getDoc method to get the data of the document in the variable userSnapshot. 
    The exists method is used to check whether there is actually data there for this user.

    In the if statement, the condition checks whether the user exists. 
    If the user exists the first code block doesn't run and the userDocRef is returned. 
    If the user does not exist, the code block executes and the user is created, setting all the data fields: displayName, email, and createdAt.
    */
    
    const userDocRef = doc(db, 'users', userAuth.uid);

    const userSnapshot = await getDoc(userDocRef);

    if(!userSnapshot.exists()) {
        const { displayName, email } = userAuth;
        const createdAt = new Date();

        try {
            await setDoc(userDocRef, {
                displayName,
                email,
                createdAt,
                ...additionalInformation
            });
        } catch (error) {
            console.log('error creating the user', error.message);
        }
    }

    return userDocRef;
  }

  export const createAuthUserWithEmailAndPassword = async (email, password) => {
    if (!email || !password) return;
    
    return await createUserWithEmailAndPassword(auth, email, password);
  }

  export const signInAuthUserWithEmailAndPassword = async (email, password) => {
    if (!email || !password) return;
    
    return await signInWithEmailAndPassword(auth, email, password);
  }
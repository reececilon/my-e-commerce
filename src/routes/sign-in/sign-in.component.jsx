import { 
    signInWithGooglePopup, 
    createUserDocumentFromAuth,
} from "../../utils/firebase/firebase.utils";
import SignUpForm from "../../components/sign-up-form/sign-up-form.component";

const SignIn = () => {

    /* 
    <<signInWithGooglePopup>> 
    
    Here the logGoogleUser function asynchronously calls the sign in with google popup. 
    This gets us the user variable which is passed into the createUserDocumentFromAuth 
    function and assigned to the variable userDocRef --> *Continues in utils*
    */
    const logGoogleUser = async () => {
        const { user } = await signInWithGooglePopup();
        const userDocRef = await createUserDocumentFromAuth(user);
    }

    return (
        <div>
            <h1>Sign In Page</h1>
            <button onClick={logGoogleUser}>Sign in with Google Popup</button>
            <SignUpForm />
        </div>
    );
};

export default SignIn;
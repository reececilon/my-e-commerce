import SignUpForm from "../../components/sign-up-form/sign-up-form.component";
import SignInForm from "../../components/sign-in-form/sign-in-form.component";

import './authentication.styles.scss';

const Authentication = () => {

    /* 
    <<signInWithGooglePopup>> 
    
    Here the logGoogleUser function asynchronously calls the sign in with google popup. 
    This gets us the user variable which is passed into the createUserDocumentFromAuth 
    function and assigned to the variable userDocRef --> *Continues in utils*
    */

    return (
        <div className='authentication-container'>
            <SignInForm />
            <SignUpForm />
        </div>
    );
};

export default Authentication;

/*
Try to figure out why the website wont login with google signin
*/
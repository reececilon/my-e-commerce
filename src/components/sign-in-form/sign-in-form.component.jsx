import { useState } from "react";
import { signInWithGooglePopup, signInAuthUserWithEmailAndPassword } from "../../utils/firebase/firebase.utils";
import { ButtonsContainer, SignInContainer } from './sign-in-form.styles';
import FormInput from "../form-input/form-input.component";
import Button, { BUTTON_TYPE_CLASSES } from "../button/button.component";
/*
<<SignUpForm>>

Here the default form fields are set to be empty strings, ''. 
Within the SignUpForm itself the useState is use to track the 
form fields and the default of the useState is set to equal the defaultFormFields. 
In the line after that, formFields is expanded out to easily get the fields inside.

From here, each of the fields are set with an onChange event listener. 
This calls the handleChange function whenever the inputs are changed. 
The event is sent through with this function. From the event, the name 
and value of the input can be obtained, but the value that is sent is not the 
value attribute that is set on the input, but the value that is typed in the input.

From here, the fields are set with the set function of the useState hook. 
The fields that are unchanged are spread into the set method. and then the 
field which is changed is added in and made to equal the value of the input.

The fields that are set with the set method then changes the value attribute of each of the inputs.
*/

/*
    <<SignUpForm>>

    onSubmit of the sign up form, the handleSubmit method is called. 
    This method takes the event, the default behaviour of the form is 
    prevented. The if statement checks whether the passwords match. 
    And alerts the user if they do not. A try catch block is then executed, 
    then within the try, the createAuthUserWithEmailAndPassword is 
    called and sent with parameters email and password. Within this function, 
    the iff statement checks if either the email or passwords are missing, 
    and returns if so. Otherwise the createUserWithEmailAndPassword is then called. 
    With the variables auth, email, password. This returns a user credential, 
    where we can get the user object from, as shown. 
    Then createUserDocumentFromAuth is called and sent with the 
    user object we got previously and the displayname key 
    and value pair obtained from the submitted form.
*/
const defaultFormFields = {
    email: '',
    password: ''
}

const SignInForm = () => {
    const [formFields, setFormFields] = useState(defaultFormFields);
    const { email, password } = formFields;

    const resetFormFields = () => {
        setFormFields(defaultFormFields);
    }

    const signInWithGoogle = async () => {
        await signInWithGooglePopup();
    }


    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            await signInAuthUserWithEmailAndPassword(email, password);
            resetFormFields();
        } catch(error) {
            switch (error.code) {
                case 'auth/invalid-password':
                    alert('Incorrect password!');
                    break;
                case 'auth/user-not-found':
                    alert('No user associated with this email');
                    break;
                case 'auth/invalid-credential':
                    alert('Incorrect password or email');
                    break;
                default:
                    console.log(error);
            }
        }

        // See if user is authenticated with email and password
        // Create user document. from what the createAuthUserWIthEmailFunction returns
    }

    const handleChange = (event) => {
        const { name, value } = event.target;

        setFormFields({...formFields, [name]: value })
    }

    return (
        <SignInContainer>
            <h2>Already have an account?</h2>
            <span>Sign up with your email and password</span>
            <form onSubmit={handleSubmit}>
                <FormInput label='Email' type='email' onChange={handleChange} name='email' value={email} required/>
                <FormInput label='Password' type='password' onChange={handleChange} name='password' value={password} required />
                <ButtonsContainer>
                    <Button type='submit'>Sign In</Button>
                    <Button type='button' onClick={signInWithGoogle} buttonType={BUTTON_TYPE_CLASSES.google}>Google Sign In</Button>
                </ButtonsContainer>
            </form>
        </SignInContainer>
    )
}

export default SignInForm;
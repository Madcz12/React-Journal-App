import { loginWithEmailPassword, logoutFirebase, registerUserWithEmailPassword, signInWithGoogle } from "../../firebase/providers";
import { checkingCredentials, login, logout } from "./"


// eslint-disable-next-line no-unused-vars
export const checkingAuthentication = ( email, password ) => {
    return async( dispatch ) => {

        dispatch(checkingCredentials());

    }
}

export const startGoogleSignIn = () => {
    return async( dispatch ) => {
        dispatch(checkingCredentials());
        const result = await signInWithGoogle();
        if(!result.ok) return dispatch(logout(result.errorMessage));
        dispatch( login(result) );

    }
}

// esta es la función de register para despachar una nueva cuenta
export const startCreatingUserWithEmailPassword = ({ email, password, displayName }) => {

    return async( dispatch ) => {

        dispatch(checkingCredentials());

        const { ok, uid, photoURL, errorMessage } = await registerUserWithEmailPassword({ email, password, displayName });

        if( !ok ) return dispatch( logout({ errorMessage }) )

        dispatch(login({uid, displayName, email, photoURL}));

    }

}
// esta es la función para iniciar sesión directamente 
export const startLoginWithEmailPassword = ({ email, password }) => {

    return async( dispatch ) => {

        dispatch(checkingCredentials());

        const result = await loginWithEmailPassword({ email, password });

        console.log(result);

        if( !result.ok ) return dispatch( logout(result) );
        dispatch(login(result));
        

    }

}

export const startLogout = () => {
    return async( dispatch ) => {

        await logoutFirebase();

        dispatch( logout() );

    }
}
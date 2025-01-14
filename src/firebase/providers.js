import { createUserWithEmailAndPassword, GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup, updateProfile } from "firebase/auth";

import { FirebaseAuth } from "./config";

const googleProvider = new GoogleAuthProvider();


export const signInWithGoogle = async () => {

  try {
    signInWithPopup(FirebaseAuth, googleProvider).then((result) => {
        const user = result.user;
        console.log({user});
    });
  } catch (error) {
    console.log(error);
  }

};

export const registerUserWithEmailPassword = async({ email, password, displayName }) => {

  try {
    
    const resp = await createUserWithEmailAndPassword( FirebaseAuth, email, password );
    const { uid, photoURL } = resp.user;
    
    await updateProfile( FirebaseAuth.currentUser,  { displayName });
    
    return {
      ok: true, 
      uid, photoURL, email, displayName
  }


  } catch (error) {
    //console.log(error);
    return { ok: false, errorMessage: error.message }
  }

}

export const loginWithEmailPassword = async({ email, password }) => {

  //! signInWithEmailAndPassword
  try {

    const resp = await signInWithEmailAndPassword( FirebaseAuth, email, password );
    
    const {uid, photoURL, displayName } = resp.user;
    
    return {
      ok: true, 
      uid, photoURL, displayName
    }

  } catch (error) {
    return { ok: false, errorMessage: error.message }
  }

}

export const logoutFirebase = async() => {
  return await FirebaseAuth.signOut();
}
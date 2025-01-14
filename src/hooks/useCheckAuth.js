import { onAuthStateChanged } from "firebase/auth";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FirebaseAuth } from "../firebase/config";
import { login, logout } from "../store/auth";

export const useCheckAuth = () => {
  
    const { status } = useSelector( state => state.auth ); // esto devuelve los valores del usuario en Redux
  // dispatch del usuario 
  const dispatch = useDispatch();

  useEffect(() => {
    onAuthStateChanged(FirebaseAuth, async(user) => {
      if( !user ) return dispatch( logout() ); 
      
      const { displayName, email, photoURL, uid } = user;
      dispatch(login({displayName, email, photoURL, uid}));
    })
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
    return {
        status 
    }
}

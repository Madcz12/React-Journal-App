import { authSlice, checkingCredentials, login, logout } from "../../../src/store/auth/authSlice";
import { authenticatedState, demoUser, initialState } from "../../fixtures/authFixures";

describe('Pruebas en authSlice', () => { 

    test('Debe de regresar el estado inicial y llamarse "auth"', () => { 
        
        const state = authSlice.reducer(initialState, {});
        
        expect(authSlice.name).toBe('auth');
        expect(state).toEqual(initialState);


     });

    test('Debe de realizar la autenticación', () => { 
        
        //console.log(login(demoUser));
        const state = authSlice.reducer(initialState, login(demoUser));
        expect(state).toEqual({
            status: 'authenticated', // 'checking', 'not-authenticated', 'authenticated'
            uid: demoUser.uid,
            email: demoUser.email,
            displayName: demoUser.displayName,
            photoURL: demoUser.photoURL,
            errorMessage: null,
        });

     });

     test('Debe de realizar el logout sin argumentos', () => { 

        const state = authSlice.reducer(authenticatedState, logout());

        //const errorMessage = "Credenciales no correctas";

        expect(state).toEqual({
            status: 'not-authenticated', // 'checking', 'not-authenticated', 'authenticated'
            uid: null,
            email: null,
            displayName: null,
            photoURL: null,
            errorMessage: undefined,
        });

      });

      test('Debe de realizar el logout y mostrar un mensaje de error', () => {
        
        const errorMessage = "Credenciales no correctas";

        const state = authSlice.reducer(authenticatedState, logout({errorMessage}));

        //const errorMessage = "Credenciales no correctas";

        expect(state).toEqual({
            status: 'not-authenticated', // 'checking', 'not-authenticated', 'authenticated'
            uid: null,
            email: null,
            displayName: null,
            photoURL: null,
            errorMessage: errorMessage,
        });

      });

      test('Debe de cambiar el status a checking de nuevo', () => { 

        const state = authSlice.reducer(authenticatedState, checkingCredentials());

        expect(state.status).toBe('checking');

       });


 });
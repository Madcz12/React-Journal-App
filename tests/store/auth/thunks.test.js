import { loginWithEmailPassword, logoutFirebase, singInWithGoogle } from "../../../src/firebase/providers";
import { checkingAuthentication, checkingCredentials, login, logout, startGoogleSignIn, startLoginWithEmailPassword, startLogout } from "../../../src/store/auth";
import { clearNotesLogout } from "../../../src/store/journal/journalSlice";
import { demoUser } from "../../fixtures/authFixures";

jest.mock('../../../src/firebase/providers');


describe('Pruebas en auth/thunks', () => { 
    const dispatch = jest.fn();

    beforeEach(() => jest.clearAllMocks());

    test('Debe de invocar el checkingCredentials', async() => { 
        
        

        await checkingAuthentication()(dispatch);
        expect(dispatch).toHaveBeenCalledWith(checkingCredentials());
     });

     test('startGoogleSignIn debe de llamar checkingCredentials y logout - error', async() => { 

        const loginData = {
            ok: false,
            errorMessage: 'Un error en Google'
        };

        await singInWithGoogle.mockResolvedValue(loginData);

        // thunk
        await startGoogleSignIn()(dispatch);

        expect(dispatch).toHaveBeenCalledWith(checkingCredentials());
        expect(dispatch).toHaveBeenCalledWith(logout(loginData.errorMessage));
      });

      test('startLoginWithEmailPassword debe de llamar checkingCredentials y Login - exito', async() => { 

        const loginData = {
            ok: true, 
            ...demoUser
        };

        const formData = {
            email: demoUser.email,
            password: '123456'
        };

        await loginWithEmailPassword.mockResolvedValue(loginData);

        await startLoginWithEmailPassword(formData)(dispatch);

        expect(dispatch).toHaveBeenCalledWith(checkingCredentials());
        expect(dispatch).toHaveBeenCalledWith(login(loginData));

       });

       test('startLogout debe de llamar logoutFirebase, clearNotes y logout', async() => { 

        // el primer paréntensis significa que solo se está llamando la función - el segundo es para llamarla con el return del dispatch
            await startLogout()(dispatch);

            expect(logoutFirebase).toHaveBeenCalled();
            expect(dispatch).toHaveBeenCalledWith(clearNotesLogout());
            expect(dispatch).toHaveBeenCalledWith(logout());

        });

 });
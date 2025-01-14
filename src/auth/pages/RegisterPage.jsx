import { useMemo, useState } from "react";
import { Alert, Button, Grid, Link, TextField, Typography } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import { AuthLayout } from "../layout/AuthLayout";
import { useForm } from "../../hooks/useForm";
import { useDispatch, useSelector } from "react-redux";
import { startCreatingUserWithEmailPassword } from "../../store/auth";


  const formData = {
        email: '',
        password: '',
        displayName: ''
  }

  // Creamos un objeto de validacion de formData
  const formValidations = {
    email: [ (value) => value.includes('@'), 'El correo debe tener un @'], 
    password: [ (value) => value.length >= 6, 'El password debe de tener más de 6 letras'], 
    displayName: [ (value) => value.length >= 1, 'El nombre es obligatorio'], 
  }

export const RegisterPage = () => {

  const dispatch = useDispatch();

  const [formSubmitted, setFormSubmitted] = useState(false);

  const { status, errorMessage } = useSelector( state => state.auth );
  const isCheckingAuthentication = useMemo( () => status === 'checking', [status] );


  const { 
      formState, displayName, email, password, onInputChange, 
      isFormValid, emailValid, passwordValid, displayNameValid,
        } = useForm(formData, formValidations); // enviamos el objeto de validación como parámetro al hookForm


  const onSubmit = ( event ) => {
    event.preventDefault();
    setFormSubmitted(true);

    if(!isFormValid) return;

    dispatch(startCreatingUserWithEmailPassword(formState)); // el formState tiene el objeto con toda la info del user
  }

  return (
    <AuthLayout title="Registro de cuenta">
      <h1>FormValid: { isFormValid ? 'Válido' : 'Incorrecto' }</h1>
        <form onSubmit={ onSubmit } className='animate__animated animate__fadeIn animate__faster'>
          <Grid container>
            <Grid item xs={12} sx={{mt:2}}>
              <TextField 
                label="Nombre completo" 
                type="text" 
                placeholder="Nombre completo"
                fullWidth
                name="displayName"
                value={ displayName }
                onChange={ onInputChange }
                error={ !!displayNameValid && formSubmitted }
                helperText={ displayNameValid }
              />
            </Grid>

            <Grid item xs={12} sx={{mt:2}}>
              <TextField 
                label="Correo" 
                type="email" 
                placeholder="correo"
                fullWidth
                name="email"
                value={ email }
                onChange={ onInputChange }
                error={ !!emailValid && formSubmitted }
                helperText={ emailValid }
              />
            </Grid>

            <Grid item xs={12} sx={{mt:2}}>
              <TextField 
                label="Contraseña" 
                type="password" 
                placeholder="contraseña"
                fullWidth
                name="password"
                value={ password }
                onChange={ onInputChange }
                error={ !!passwordValid && formSubmitted }
                helperText={ passwordValid }

              />
            </Grid>

            <Grid container spacing={2} sx={{mb:2, mt:1}}>

              <Grid 
                item 
                xs={12} 
                sm={6}
                display={ !!errorMessage ? '' : 'none' }
              >
                <Alert severity='error'>{ errorMessage }</Alert>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Button
                  disabled={isCheckingAuthentication} 
                  type="submit"
                  variant="contained" 
                  fullWidth
                >
                  Crear cuenta
                </Button>
              </Grid>
            </Grid>

          </Grid>
          
          <Grid container direction='row' justifyContent='end'>
            <Typography sx={{mr:1}}>¿Ya tienes cuenta? Inicia sesion</Typography>
            <Link component={RouterLink} color='inherit' to="/auth/login">
              Ingresar
            </Link>
          </Grid>

        </form>
    </AuthLayout>

  )
}

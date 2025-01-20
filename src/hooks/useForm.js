import { useEffect, useMemo, useState } from 'react';

export const useForm = ( initialForm = {}, formValidations = {} ) => {
  
    const [ formState, setFormState ] = useState( initialForm );
    const [ formValidation, setFormValidation ] = useState({}); // la idea de el formValidation es que determine si hay un error o no

    useEffect(() => {
        createValidators();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [formState])
    
    useEffect(() => {
      setFormState(initialForm);
    }, [initialForm])
    

    const isFormValid = useMemo( () => { // useMemo se utiliza para memorizar el valor que retorne el forOf

        for (const formValue of Object.keys(formValidation)) { // barremos las opciones dentro del formValidation
            if ( formValidation[formValue] !== null ) return false;
        }

        return true;
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [ setFormValidation ])
    

    const onInputChange = ({ target }) => {
        const { name, value } = target;
        setFormState({
            ...formState,
            [ name ]: value
        });
    }

    const onResetForm = () => {
        setFormState( initialForm );
    }

    const createValidators = () => { // se crea un nuevo estado en el que los inputs del formulario son validos o no 

        const formCheckedValues = {}; // este es el objeto que almacenará lo que se terminara mandando, es decir modificado con la evaluacion de los input

        for (const formField of Object.keys(formValidations)) {
            const [ fn, errorMessage ] = formValidations[formField]; // se desestructura del formValidation 
            
            formCheckedValues[`${ formField }Valid`] = fn( formState[formField] ) ? null : errorMessage;
        
        }

        setFormValidation(formCheckedValues);
    }

    return {
        ...formState,
        formState,
        onInputChange,
        onResetForm,
        ...formValidation, 
        isFormValid
    }
}
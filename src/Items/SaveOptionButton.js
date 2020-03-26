import React from 'react';
// import { useFormState } from 'react-final-form';
import { 
    // Button,
    SaveButton,
    // SimpleForm,
    // TextInput,
    // ArrayInput,
    // SimpleFormIterator,
    // NumberInput,
    // SelectInput,
    // useCreate,
    // useNotify,
    // required
 } from 'react-admin';

 const SaveOptionButton = (props) => {

    // const [create] = useCreate('posts');
    // // const redirectTo = useRedirect();
    // const notify = useNotify();
    // // get values from the form
    // const formState = useFormState();

    const handleClick = (values) => {
        console.log(values)
    }
    
     
     return <SaveButton {...props} onSave={handleClick} />
 }

 export default SaveOptionButton;
 
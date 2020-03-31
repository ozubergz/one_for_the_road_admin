import React from 'react';
import {
    Create,
    TextInput,
    SimpleForm,
    Toolbar,
    SaveButton,
    Button,
    required
} from 'react-admin';

const ToolbarCreate = ({onCancel, ...props}) => (
    <Toolbar {...props} >
        <SaveButton />
        <Button label="cancel" onClick={onCancel} />
    </Toolbar>
);

const CategoryCreate = ({onCancel, ...props}) => (
    <Create title=" " {...props}>
        <SimpleForm toolbar={<ToolbarCreate onCancel={onCancel} {...props}/>}>
            <TextInput source="name" validate={required()} />
        </SimpleForm>
    </Create>
);

export default CategoryCreate;
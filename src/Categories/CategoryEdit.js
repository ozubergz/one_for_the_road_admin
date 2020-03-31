import React from 'react';
import {
    Edit,
    TextInput,
    SimpleForm,
    Toolbar,
    SaveButton,
    Button,
    required
} from 'react-admin';

const ToolbarEdit = ({onCancel, ...props}) => (
    <Toolbar {...props}>
        <SaveButton />
        <Button label="cancel" onClick={onCancel} />
    </Toolbar>
)

const CategoryEdit = ({ onCancel, ...props}) => (
    <Edit title=" " {...props}>
        <SimpleForm toolbar={<ToolbarEdit onCancel={onCancel} />}>
            <TextInput source="name" validate={required()} />
        </SimpleForm>
    </Edit>
);

export default CategoryEdit;
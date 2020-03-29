import React from 'react';
import {
    Edit,
    TextInput,
    SimpleForm,
    required
} from 'react-admin';

const CategoryEdit = props => (
    <Edit {...props}>
        <SimpleForm>
            <TextInput disabled source="id" />
            <TextInput source="name" validate={required()} />
        </SimpleForm>
    </Edit>
);

export default CategoryEdit;
import React from 'react';
import {
    Create,
    TextInput,
    SimpleForm,
    required
} from 'react-admin';

const CategoryCreate = props => (
    <Create {...props}>
        <SimpleForm>
            <TextInput source="name" validate={required()} />
        </SimpleForm>
    </Create>
);

export default CategoryCreate;
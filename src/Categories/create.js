import React from 'react';
import {
    Create,
    TextInput,
    SimpleForm
} from 'react-admin';

const CategoryCreate = props => (
    <Create {...props}>
        <SimpleForm>
            <TextInput source="name" />
        </SimpleForm>
    </Create>
);

export default CategoryCreate;
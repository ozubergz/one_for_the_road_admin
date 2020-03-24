import React from 'react';
import {
    Create,
    SimpleForm,
    TextInput,
    NumberInput,
    ReferenceInput,
    SelectInput,
} from 'react-admin';

const ItemCreate = (props) => (
    <Create {...props}>
        <SimpleForm>
            <TextInput source="name" />
            <TextInput source="description" />
            <NumberInput source="price" />
            <ReferenceInput source="category_id" reference="categories">
                <SelectInput optionText="name" />
            </ReferenceInput>
        </SimpleForm>
    </Create>
);

export default ItemCreate;
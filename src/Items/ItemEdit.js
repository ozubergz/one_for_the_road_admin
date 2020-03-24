import React from 'react';
import {
    Edit,
    SimpleForm,
    TextInput,
    NumberInput,
    ReferenceInput,
    SelectInput,
} from 'react-admin';

const ItemEdit = props => (
    <Edit {...props}>
        <SimpleForm>
            <TextInput disabled source="id" />
            <TextInput source="name" />
            <TextInput source="description" />
            <NumberInput source="price" step={1} format={price => price.toFixed(2)} />
            <ReferenceInput source="category_id" reference="categories">
                <SelectInput optionText="name" />
            </ReferenceInput>
        </SimpleForm>
    </Edit>
)

export default ItemEdit;

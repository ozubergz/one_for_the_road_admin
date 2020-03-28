import React from 'react';
import {
    Create,
    SimpleForm,
    TextInput,
    NumberInput,
    ReferenceInput,
    SelectInput,
    required,
    number,
    minValue
} from 'react-admin';

const ItemCreate = (props) => (
    <Create {...props}>
        <SimpleForm>
            <TextInput source="name" validate={required()} />
            <TextInput source="description" validate={required()} />
            <NumberInput 
                source="price" 
                // validate={[number(), minValue(0)]}
                validate={[required(), number(), minValue(0)]}
            />
            <ReferenceInput 
                source="category_id" 
                reference="categories"
                validate={required()}
            >
                <SelectInput optionText="name" />
            </ReferenceInput>
        </SimpleForm>
    </Create>
);

export default ItemCreate;
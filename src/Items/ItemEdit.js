import React from 'react';
import {
    Edit,
    SimpleForm,
    TextInput,
    NumberInput,
    ReferenceInput,
    SelectInput,
    number,
    minValue
} from 'react-admin';

const ItemEdit = props => (
    <Edit {...props}>
        <SimpleForm variant="standard">
            <TextInput source="name" />
            <TextInput 
                fullWidth
                multiline
                source="description"
            />
            <NumberInput 
                source="price" 
                step={1} 
                format={price => price.toFixed(2)}
                validate={[number(), minValue(0)]}
            />
            <ReferenceInput source="category_id" reference="categories">
                <SelectInput optionText="name" />
            </ReferenceInput>
        </SimpleForm>
    </Edit>
)

export default ItemEdit;

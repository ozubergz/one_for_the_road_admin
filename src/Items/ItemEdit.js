import React from 'react';
import {
    Edit,
    SimpleForm,
    TextInput,
    NumberInput,
    ReferenceInput,
    SelectInput,
    number,
    minValue,
    Toolbar,
    SaveButton,
    Button
} from 'react-admin';

const CustomToolBar = ({onCancel, ...props}) => (
    <Toolbar {...props}>
        <SaveButton />
        <Button label="cancel" onClick={onCancel} />
    </Toolbar>
);

const ItemEdit = ({ onCancel, ...props}) => (
    <Edit {...props}>
        <SimpleForm variant="standard" toolbar={<CustomToolBar onCancel={onCancel} />}>
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

import React from 'react';
import {
    Edit,
    SimpleForm,
    TextInput,
    SelectInput,
    NumberInput,
    ArrayInput,
    SimpleFormIterator,
    Toolbar,
    SaveButton,
    DeleteButton,
    number,
    minValue
} from 'react-admin';

const redirect = (basePath, id, data) => `/item_options/${id}/show`;

const EditToolbar = props => (
    <Toolbar {...props} >
        <SaveButton />
        <DeleteButton redirect={`/items/${props.record.item_id}/show/2`} />
    </Toolbar>
)

const Item_optionEdit = props => (
    <Edit {...props}>
        <SimpleForm 
            redirect={redirect}
            toolbar={<EditToolbar />}
        >
            <TextInput disabled source="id" />
            <TextInput label="Title" source="name" />
            <ArrayInput source="options">
                <SimpleFormIterator >
                    <TextInput label="Name" source="name" />
                    <NumberInput 
                        label="Price" 
                        source="price" 
                        validate={[number(), minValue(0)]}
                        format={price => price.toFixed(2)}
                    />
                    <SelectInput label="Input Type" source="input_type" choices={[
                        { id: "radio", name: "radio" },
                        { id: "checkbox", name: "checkbox" }
                    ]}/>
                </SimpleFormIterator>
            </ArrayInput>
        </SimpleForm>
    </Edit>
);

export default Item_optionEdit;


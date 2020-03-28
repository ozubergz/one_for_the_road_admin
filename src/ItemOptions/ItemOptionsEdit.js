import React from 'react';
import {
    Edit,
    SimpleForm,
    TextInput,
    // ReferenceInput,
    SelectInput,
    ArrayInput,
    SimpleFormIterator,
} from 'react-admin';

const Item_optionEdit = props => (
    <Edit {...props}>
        <SimpleForm>
            <TextInput disabled source="id" />
            <TextInput label="Title" source="name" />
            {/* <ReferenceInput source="item_id" reference="items">
                <SelectInput optionText="name" />
            </ReferenceInput> */}
            <ArrayInput source="options">
                <SimpleFormIterator  >
                    <TextInput label="Name" source="name" />
                    <TextInput label="Price" source="price" />
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


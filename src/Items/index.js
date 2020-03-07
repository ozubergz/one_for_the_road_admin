import React from 'react';
import {
    List,
    Edit,
    SimpleForm,
    Datagrid,
    TextField,
    TextInput,
    NumberField,
    NumberInput,
    ChipField,
    ReferenceField,
    ReferenceInput,
    SelectInput,
    EditButton
} from 'react-admin';

export const ItemList = props => (
    <List {...props}>
        <Datagrid>
            <TextField source="id" />
            <TextField source="name" />
            <TextField source="description" />
            <NumberField source="price" />
            {/* <TextField source="selections" /> */}
            <ReferenceField source="category_id" reference="categories">
                <ChipField source="name" />
            </ReferenceField>
            <EditButton />
        </Datagrid>
    </List>
);

export const ItemEdit = props => (
    <Edit {...props}>
        <SimpleForm>
            <TextInput disabled source="id" />
            <TextInput source="name" />
            <TextInput source="description" />
            <NumberInput source="price" />
            {/* <TextInput source="selections" /> */}
            <ReferenceInput source="category_id" reference="categories">
                <SelectInput optionText="name" />
            </ReferenceInput>
        </SimpleForm>
    </Edit>
);

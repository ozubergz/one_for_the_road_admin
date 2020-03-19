import React from 'react';
import {
    Create,
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
    EditButton,
} from 'react-admin';

const PriceField = props => {
    const price = props.record.price;
    const fixedPrice = price.toFixed(2);
    return <span>{`$${fixedPrice}`}</span>    
}

const Description = props => {
    const description = props.record.description;
    return <span>{description ? description : null}</span>
}

export const ItemList = props => (
    <List {...props}>
        <Datagrid>
            <TextField source="id" />
            <TextField source="name" />
            <Description source="description" />
            <PriceField source="price" />
            {/* <TextField source="selections" /> */}
            <ReferenceField source="category_id" reference="categories">
                <ChipField source="name" />
            </ReferenceField>
            <EditButton />
        </Datagrid>
    </List>
);

export const ItemCreate = props => (
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


export const ItemEdit = props => (
    <Edit {...props}>
        <SimpleForm>
            <TextInput disabled source="id" />
            <TextInput source="name" />
            <TextInput source="description" />
            <NumberInput source="price" step={1} format={price => price.toFixed(2)} />
            {/* <TextInput source="selections" /> */}
            <ReferenceInput source="category_id" reference="categories">
                <SelectInput optionText="name" />
            </ReferenceInput>
        </SimpleForm>
    </Edit>
);

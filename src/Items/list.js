import React from 'react';
import {
    List,
    Datagrid,
    TextField,
    NumberField,
    ChipField,
    ReferenceField,
    EditButton,
} from 'react-admin';

const Description = props => {
    const description = props.record.description;
    return <span>{description ? description : null}</span>
}

const ItemList = props => (
    <List {...props}>
        <Datagrid>
            <TextField source="id" />
            <TextField source="name" />
            <Description source="description" />
            <NumberField source="price" options={{ style: 'currency', currency: 'USD' }} />
            <ReferenceField source="category_id" reference="categories">
                <ChipField source="name" />
            </ReferenceField>
            <EditButton />
        </Datagrid>
    </List>
);

export default ItemList;
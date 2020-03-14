import React from 'react';
import {
    List,
    Show,
    Datagrid,
    TextField,
    NumberField,
    ArrayField,
    ReferenceField,
    DateField,
    ShowButton,
    SimpleShowLayout
} from 'react-admin';

export const OrderList = props => (
    <List {...props}>
        <Datagrid >
            <TextField source="id" />
            <ReferenceField source="user_id" reference="users">
                <TextField source="email" />
            </ReferenceField>
            <DateField source="created_at" />
            <ShowButton />
        </Datagrid>
    </List>
);

export const OrderShow = props => (
    <Show {...props}>
        <SimpleShowLayout>
            <TextField source="id" />
            <ReferenceField reference="users" source="user_id">
                <TextField source="email" />
            </ReferenceField>
            <ArrayField source="items">
                <Datagrid>
                    <TextField source="id" />
                    <TextField source="name" />
                    <TextField source="description" />
                    <NumberField source="price" />
                    <TextField source="selections" />
                </Datagrid>
            </ArrayField>
            <DateField source="created_at" />
        </SimpleShowLayout>
    </Show>
);
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
    EmailField,
    ShowButton,
    SimpleShowLayout
} from 'react-admin';

export const OrderList = props => (
    <List {...props}>
        <Datagrid >
            <TextField source="id" />
            <TextField source="customer" />
            <EmailField source="email" />
            <TextField source="phone" />
            <NumberField source="amount" />
            <DateField source="created_at" />
            <ShowButton />
        </Datagrid>
    </List>
);

export const OrderShow = props => (
    <Show {...props}>
        <SimpleShowLayout>
            <TextField source="id" />
            <TextField source="customer" />
            <TextField source="address" />
            <EmailField source="email" />
            <TextField source="phone" />
            <ArrayField source="items">
                <Datagrid>
                    <TextField source="id" />
                    <TextField source="name" />
                    <TextField source="description" />
                    <NumberField source="price" />
                    <TextField source="selections" />
                </Datagrid>
            </ArrayField>
            <NumberField source="amount" />
            <DateField source="created_at" />
            <DateField source="updated_at" />
        </SimpleShowLayout>
    </Show>
);
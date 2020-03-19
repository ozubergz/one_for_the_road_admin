import React from 'react';
import {
    List,
    Show,
    Datagrid,
    TextField,
    NumberField,
    ArrayField,
    DateField,
    EmailField,
    ShowButton,
    SimpleShowLayout
} from 'react-admin';

export const OrderList = props => (
    <List {...props} sort={{ field: 'created_at', order: 'DESC'}}>
        <Datagrid >
            <TextField source="id" />
            <TextField source="customer" />
            <EmailField source="email" />
            <TextField source="phone" />
            <NumberField source="amount" options={{ style: 'currency', currency: 'USD' }} />
            <DateField source="created_at" showTime label="Date" />
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
            <NumberField source="amount" options={{ style: 'currency', currency: 'USD' }} />
            <DateField source="created_at" />
            <ArrayField source="items">
                <Datagrid>
                    <TextField source="id" />
                    <TextField source="name" />
                    <TextField source="description" />
                    <NumberField source="price" />
                    <TextField source="selections" />
                </Datagrid>
            </ArrayField>
        </SimpleShowLayout>
    </Show>
);
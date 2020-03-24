import React from 'react';
import {
    List,
    Datagrid,
    TextField,
    NumberField,
    DateField,
    EmailField,
    ShowButton,
} from 'react-admin';

const OrderList = props => (
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

export default OrderList;
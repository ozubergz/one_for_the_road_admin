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
import moment from 'moment';

const DateTimeField = props => {
    const utc = props.record.created_at;
    const localTime = moment(utc).format('L h:mm a');
    return <span>{localTime}</span>
}
DateTimeField.defaultProps = {label: "Date"}

const AmountField = props => {
    const amount = props.record.amount;
    const fixedAmount = amount.toFixed(2);
    return <span>{`$${fixedAmount}`}</span>    
}

export const OrderList = props => (
    <List {...props} sort={{ field: 'created_at', order: 'DESC'}}>
        <Datagrid >
            <TextField source="id" />
            <TextField source="customer" />
            <EmailField source="email" />
            <TextField source="phone" />
            <AmountField source="amount" />
            {/* <NumberField source="amount" /> */}
            <DateTimeField source="created_at" />
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
import React from 'react';
import {
    Show,
    Datagrid,
    TextField,
    NumberField,
    ArrayField,
    DateField,
    EmailField,
    SimpleShowLayout
} from 'react-admin';
import moment from 'moment';

const TimeField = props => {
    const utc = props.record.created_at;
    const localTime = moment(utc).format('h:mm:ss a');
    return <span>{localTime.toUpperCase()}</span>
}
TimeField.defaultProps = {label: "Time"}

const OrderShow = props => (
    <Show {...props}>
        <SimpleShowLayout>
            <TextField source="id" />
            <TextField source="customer" />
            <TextField source="address" />
            <EmailField source="email" />
            <TextField source="phone" />
            <NumberField source="amount" options={{ style: 'currency', currency: 'USD' }} />
            <DateField source="created_at" options={{ weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }}  label="Date"/>
            <TimeField source="created_at" />
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

export default OrderShow;
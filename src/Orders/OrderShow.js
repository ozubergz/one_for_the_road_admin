import React from 'react';
import {
    Show,
    Datagrid,
    TextField,
    NumberField,
    ArrayField,
    DateField,
    EmailField,
    TabbedShowLayout,
    Tab,
} from 'react-admin';
import moment from 'moment';

const TimeField = props => {
    const utc = props.record.created_at;
    const localTime = moment(utc).format('h:mm:ss a');
    return <span>{localTime.toUpperCase()}</span>
}
TimeField.defaultProps = { 
    label: "Time",
    addLabel: true
}

const OrderShow = props => (
    <Show {...props}>
        <TabbedShowLayout>
            <Tab label="Customer">
                <TextField source="customer" />
                <TextField source="phone" />
                <EmailField source="email" />
            </Tab>
            <Tab label="amount">
                <NumberField source="amount" options={{ style: 'currency', currency: 'USD' }} />
            </Tab>
            <Tab label="Delivery Address">
                <TextField source="address" />
            </Tab>
            <Tab label="Date/Time Order">
                <DateField source="created_at" options={{ weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }}  label="Date"/>
                <TimeField source="created_at" />
            </Tab>
            <Tab label="Delivery Items">
                <ArrayField source="items">
                    <Datagrid>
                        <TextField source="id" sortable={false} />
                        <TextField source="name" sortable={false} />
                        <TextField source="description" sortable={false} />
                        <ArrayField source="select_options" >
                            <Datagrid>
                                <TextField source="name" />
                            </Datagrid>
                        </ArrayField>
                    </Datagrid>
                </ArrayField>
            </Tab>
        </TabbedShowLayout>
    </Show>
);

export default OrderShow;
import React from 'react';
import {
    Show,
    List,
    Datagrid,
    DateField,
    TextField,
    EmailField,
    SimpleShowLayout,
    ShowButton
} from 'react-admin'

export const UserList = props => (
    <List {...props}>
        <Datagrid>
            <TextField source="id" />
            <EmailField source="email" />
            <TextField source="first_name" />
            <TextField source="last_name" />
            <TextField source="phone" />
            <ShowButton />
        </Datagrid>
    </List>
);

export const UserShow = props => (
    <Show {...props}>
        <SimpleShowLayout>
            <TextField source="id" />
            <EmailField source="email" />
            <TextField source="first_name" />
            <TextField source="last_name" />
            <TextField source="phone" />
        </SimpleShowLayout>
    </Show>
);





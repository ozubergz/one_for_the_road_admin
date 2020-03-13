import React from 'react';
import {
    List,
    Datagrid,
    TextField,
    EmailField,
} from 'react-admin'

export const UserList = props => (
    <List {...props}>
        <Datagrid>
            <TextField source="id" />
            <EmailField source="email" />
            <TextField source="first_name" />
            <TextField source="last_name" />
            <TextField source="phone" />
        </Datagrid>
    </List>
);

import React from 'react';
import {
    List,
    Datagrid,
    TextField,
    EmailField,
    NumberField
} from 'react-admin'

export const UserList = props => (
    <List {...props}>
        <Datagrid rowClick="edit">
            <TextField source="id" />
            <EmailField source="email" />
            <TextField source="first_name" />
            <TextField source="last_name" />
            <NumberField source="telephone" />
        </Datagrid>
    </List>
);
import React from 'react';
import {
    List,
    Datagrid,
    TextField,
    EmailField,
    ShowButton,
} from 'react-admin'

const UserList = props => (
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

export default UserList;
import React from 'react';
import {
    Show,
    TextField,
    EmailField,
    SimpleShowLayout
} from 'react-admin'

const UserShow = props => (
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

export default UserShow;
import React from 'react';
import {
    Show,
    TextField,
    EmailField,
    SimpleShowLayout,
    TabbedShowLayout,
    Tab,
} from 'react-admin'

const UserShow = props => (
    <Show {...props}>
        <TabbedShowLayout>
            <Tab label="Info">
                <TextField source="first_name" />
                <TextField source="last_name" />
            </Tab>
            <Tab label="Email">
                <EmailField source="email" />
            </Tab>
            <Tab label="Phone">
                <TextField source="phone" />
            </Tab>
        </TabbedShowLayout>
    </Show>
);

export default UserShow;
import React from 'react';
import {
    Show,
    Datagrid,
    ArrayField,
    NumberField,
    TextField,
    ReferenceField,
    TabbedShowLayout,
    Tab,
    // Title
    // EditButton,
} from 'react-admin';
import CreateOptionButton from './CreateOptionButton';
import ShowOptionButton from './ShowOptionButton';
import DeleteOptionButton from './DeleteOptionButton';
import EditOptionButton from './EditOptionButton';


const ItemShow = props => (
    <Show {...props} >
        <TabbedShowLayout>
            <Tab label="Info">
                <TextField source="name" />
                <NumberField 
                    source="price"
                    options={{style: "currency", currency: "USD"}}
                />
                <TextField source="description" />
            </Tab>
            <Tab label="Menu Category">
                <ReferenceField
                    source="category_id"
                    reference="categories"
                >
                    <TextField source="name" />
                </ReferenceField>
            </Tab>
            <Tab label="Options">
                <ArrayField source="item_options">
                    <Datagrid>
                        <TextField source="name" label="Title" />
                        <ShowOptionButton />
                        <EditOptionButton />
                        <DeleteOptionButton />
                    </Datagrid>
                </ArrayField>
                <CreateOptionButton />
            </Tab>
        </TabbedShowLayout>
    </Show>
);

export default ItemShow
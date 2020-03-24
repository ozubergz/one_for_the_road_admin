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
    // ShowButton,
    EditButton,
} from 'react-admin';
import VisibilityIcon from '@material-ui/icons/Visibility';
import Button from '@material-ui/core/Button';
import { useHistory } from 'react-router-dom';


const ShowButton = ({record}) => {
    const history = useHistory();
    return (
        <Button onClick={() => history.push(`/item_options/${record.id}/show`)}>
            <VisibilityIcon/>
        </Button>
    )
}

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
                        <ShowButton/>
                    </Datagrid>
                </ArrayField>
            </Tab>
        </TabbedShowLayout>
    </Show>
);

export default ItemShow
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
} from 'react-admin';
import CreateButton from './OptionCreateButton';
import ShowButton from './OptionShowButton';
import DeleteButton from './OptionDeleteButton';
import EditButton from './OptionEditButton';

const Description = props => {
    const description = props.record.description;
    return <span>{description ? description : null}</span>
}
Description.defaultProps = {
    label: "Description",
    addLabel: true
}

const NumberOfOptions = props => {
    const options = props.record.options.length;
    return <span>{options}</span>
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
                <Description source="description" />
            </Tab>
            <Tab label="Menu Category">
                <ReferenceField
                    link="show"
                    source="category_id"
                    reference="categories"
                >
                    <TextField source="name" />
                </ReferenceField>
            </Tab>
            <Tab label="Item Options">
                <ArrayField source="item_options">
                    <Datagrid>
                        <TextField source="id" />
                        <TextField source="name" label="Title" />
                        <NumberOfOptions label="# of Options" />
                        <EditButton />
                        <ShowButton />
                        <DeleteButton />
                    </Datagrid>
                </ArrayField>
                <CreateButton />
            </Tab>
        </TabbedShowLayout>
    </Show>
);

export default ItemShow
import React from 'react';
import {
    Show,
    Datagrid,
    NumberField,
    TextField,
    ArrayField,
    ReferenceField,
    TabbedShowLayout,
    Tab,
} from 'react-admin';

import CreateButton from './GroupOptionCreateButton';
import DeleteButton from './GroupOptionDeleteButton';
import EditButton from './GroupOptionEditButton';
import ShowOption from '../Options/OptionShowButton';

const Description = props => {
    const description = props.record.description;
    return <span>{description ? description : null}</span>
}
Description.defaultProps = {
    label: "Description",
    addLabel: true
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
            <Tab label="Group Options">
                <ArrayField source="group_options" label="Group of Options">
                    <Datagrid expand={ShowOption}>
                        <TextField source="id" sortable={false} />
                        <TextField label="Title" source="name" sortable={false} />
                        <TextField source="required" sortable={false} />
                        <EditButton />
                        <DeleteButton />
                    </Datagrid>
                </ArrayField>
                <CreateButton />
            </Tab>
        </TabbedShowLayout>
    </Show>
);

export default ItemShow
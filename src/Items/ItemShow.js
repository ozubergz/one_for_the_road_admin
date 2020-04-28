import React from 'react';
import {
    Show,
    Datagrid,
    NumberField,
    TextField,
    ArrayField,
    ReferenceField,
    // ReferenceManyField,
    TabbedShowLayout,
    Tab,
} from 'react-admin';

import CreateButton from './GroupOptionCreateButton';
import DeleteButton from './GroupOptionDeleteButton';
import OptionCreateButton from '../ItemOptions/OptionCreateButton';

// import ShowButton from './OptionShowButton';
// import EditButton from './OptionEditButton';

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
                    <Datagrid>
                        <TextField source="id" sortable={false} />
                        <TextField source="name" sortable={false} />
                        <TextField source="required" sortable={false} />
                        <ArrayField source="options" sortable={false}>
                            <Datagrid>
                                <TextField source="id" sortable={false} />
                                <TextField source="name" sortable={false} />
                                <TextField source="input_type" sortable={false} />
                                <NumberField 
                                    source="price" 
                                    sortable={false} 
                                    options={{ style: "currency", currency: "USD" }}
                                />

                            </Datagrid>
                        </ArrayField>
                        
                        <OptionCreateButton />
                        <DeleteButton />
                    </Datagrid>

                </ArrayField>

                <CreateButton/>
            </Tab>
        </TabbedShowLayout>
    </Show>
);

export default ItemShow
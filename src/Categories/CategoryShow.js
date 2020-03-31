import React from 'react';
import {
    Show,
    TextField,
    ArrayField,
    Datagrid,
    // ReferenceField,
    NumberField,
    TabbedShowLayout,
    Tab,
    // TopToolbar,
    // EditButton,
    // DeleteButton
} from 'react-admin';
import { ItemShowButton, ItemEditButton, ItemDeleteButton} from './ItemButtons';

const Description = props => {
    const description = props.record.description;
    return <span>{description ? description : null}</span>
}
Description.defaultProps = { label: "Description"}

const CategoryShow = props => (
    <Show  {...props}>
        <TabbedShowLayout>
            <Tab label="Info">
                <TextField source="id" />
                <TextField source="name" />
                <TextField label="#Items" source="number_of_items" />
            </Tab>
            <Tab label="Items">
                <ArrayField source="items">
                    <Datagrid>
                        <TextField source="id" />
                        <TextField source="name" />
                        <Description />
                        {/* <ReferenceField 
                            link={false} 
                            source="category_id" 
                            reference="categories"
                        >
                            <TextField source="name" />
                        </ReferenceField> */}
                        <NumberField 
                            source="price" 
                            options={{ style: "currency", currency: "USD" }}
                        />
                        <ItemShowButton />
                        {/* <ItemEditButton /> */}
                        <ItemDeleteButton />
                    </Datagrid>
                </ArrayField>
            </Tab>
        </TabbedShowLayout>
    </Show>
);

export default CategoryShow;
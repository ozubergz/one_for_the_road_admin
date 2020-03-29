import React from 'react';
import {
    Show,
    TextField,
    ArrayField,
    Datagrid,
    ReferenceField,
    NumberField,
    TabbedShowLayout,
    Tab,
    TopToolbar,
    EditButton,
    DeleteButton
} from 'react-admin';
import { ItemShowButton, ItemEditButton, ItemDeleteButton} from './ItemButtons';

const Description = props => {
    const description = props.record.description;
    return <span>{description ? description : null}</span>
}

const CategoryShow = props => (
    <Show  {...props}>
        <TabbedShowLayout>
            <Tab label="Name">
                <TextField source="id" />
                <TextField source="name" />
            </Tab>
            <Tab label="Items">
                <ArrayField source="items">
                    <Datagrid>
                        <TextField source="id" />
                        <TextField source="name" />
                        <Description />
                        <ReferenceField 
                            link={false} 
                            source="category_id" 
                            reference="categories"
                        >
                            <TextField source="name" />
                        </ReferenceField>
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
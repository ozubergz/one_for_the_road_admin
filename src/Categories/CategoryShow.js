import React, { Component } from 'react';
import {
    Show,
    TextField,
    ArrayField,
    Datagrid,
    NumberField,
    TabbedShowLayout,
    Tab,
    // TopToolbar,
    // EditButton,
    // DeleteButton
} from 'react-admin';
import ItemEditButton from './ItemEditButton';

// import { ItemShowButton, ItemEditButton, ItemDeleteButton} from './ItemActionButtons';

const Description = props => {
    const description = props.record.description;
    return <span>{description ? description : null}</span>
}
Description.defaultProps = { label: "Description"};



const CategoryShow = (props) => (
    <Show  {...props}>
        <TabbedShowLayout>
            <Tab label="Info">
                <TextField source="id" />
                <TextField source="name" />
                <TextField label="# of Items" source="number_of_items" />
            </Tab>
            <Tab label="Items">
                <ArrayField source="items">
                    <Datagrid>
                        <TextField source="id" />
                        <TextField source="name" />
                        <Description />
                        <NumberField 
                            source="price" 
                            options={{ style: "currency", currency: "USD" }}
                        />
                        <ItemEditButton />

                    </Datagrid>
                </ArrayField>
            </Tab>
        </TabbedShowLayout>
    </Show>
)



export default CategoryShow;
import React from 'react';
import {
    Show,
    TextField,
    ArrayField,
    Datagrid,
    NumberField,
    TabbedShowLayout,
    Tab,
} from 'react-admin';
import ItemEditButton from './ItemEditButton';
import ItemDeleteButton from './ItemDeleteButton';
import ItemShowButton from './ItemShowButton';

const Description = ({record, ...rest}) => (
    record.description 
        ? <TextField source="description" record={record} />
         : null
)
Description.defaultProps = { label: "Description" }

const NumberOfItems = ({record = {}}) => (
    <span>{record.items.length}</span>
)
NumberOfItems.defaultProps = {
    label: "Number of Items",
    addLabel: true
}

const CategoryShow = (props) => (
    <Show  {...props}>
        <TabbedShowLayout>
            <Tab label="Info">
                <TextField source="id" />
                <TextField source="name" />
                <NumberOfItems />
            </Tab>
            <Tab label="Items">
                <ArrayField source="items" sortBy="item_id" fieldKey='id'>
                    <Datagrid>
                        <TextField source="id" sortable={false}/>
                        <TextField source="name" sortable={false} />
                        <Description />
                        <NumberField 
                            sortable={false}
                            source="price"
                            options={{ style: "currency", currency: "USD" }}
                        />
                        <ItemEditButton />
                        <ItemShowButton />
                        <ItemDeleteButton />
                    </Datagrid>
                </ArrayField>
            </Tab>
        </TabbedShowLayout>
    </Show>
)



export default CategoryShow;
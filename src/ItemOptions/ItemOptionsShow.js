import React from 'react';
import { 
    Show,
    NumberField,
    Datagrid,
    TextField,
    ArrayField,
    ReferenceField,
    TabbedShowLayout,
    Tab,
} from 'react-admin';
import CreateButton from './OptionCreateButton';
import DeleteButton from './OptionDeleteButton';
import EditButton from './OptionEditButton';

const Item_optionShow = props => (
    <Show {...props}>
        <TabbedShowLayout>
            <Tab label="info">
                <TextField source="id" />
                <TextField source="name" />
                <ReferenceField source="item_id" reference="items" link="show">
                    <TextField source="name" />
                </ReferenceField>
            </Tab>
            <Tab label="options">
                <ArrayField source="options">
                    <Datagrid>
                        <TextField source="id" sortable={false} />
                        <TextField source="name" sortable={false} />
                        <NumberField 
                            source="price" 
                            sortable={false}
                            options={{ style: 'currency', currency: 'USD' }}
                        />
                        <TextField source="input_type" sortable={false} />
                        <EditButton />
                        <DeleteButton />
                    </Datagrid>
                </ArrayField>
                <CreateButton />
            </Tab>
        </TabbedShowLayout>
    </Show>
  );

  export default Item_optionShow;
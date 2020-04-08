import React from 'react';
import { 
    Show,
    SimpleShowLayout,
    NumberField,
    Datagrid,
    TextField,
    ArrayField,
    ReferenceField
} from 'react-admin';

const Item_optionShow = props => (
    <Show {...props}>
        <SimpleShowLayout>
            <TextField source="id" />
            <TextField source="name" />
            <ReferenceField source="item_id" reference="items" link="show">
                <TextField source="name" />
            </ReferenceField>
            <ArrayField source="options">
                <Datagrid>
                    <TextField source="name" />
                    <NumberField source="price" options={{ style: 'currency', currency: 'USD' }} />
                    <TextField source="input_type" />
                </Datagrid>
            </ArrayField>
        </SimpleShowLayout>
    </Show>
  );

  export default Item_optionShow;
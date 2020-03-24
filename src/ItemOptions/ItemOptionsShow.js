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
            <ReferenceField source="item_id" reference="items">
                <TextField source="id" />
            </ReferenceField>
            <ArrayField source="options">
                <Datagrid>
                    <TextField source="id" />
                    <TextField source="name" />
                    <TextField source="price" />
                    <NumberField source="input_type.id" />
                </Datagrid>
            </ArrayField>
        </SimpleShowLayout>
    </Show>
  );

  export default Item_optionShow;
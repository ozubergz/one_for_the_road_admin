import React from 'react';
import {
    Create,
    SimpleForm,
    TextInput
} from 'react-admin';
import { parse } from 'query-string';

const Item_optionCreate = props => {

    //parse the item_id from the location injected React Router
    const { item_id: item_id_string } = parse(props.location.search);
    
    const item_id = item_id_string ? parseInt(item_id_string, 10) : '';
    
    // const redirect = item_id ? `/items/${item_id}/show/2` : false;
    
    return (
        <Create {...props}>
            <SimpleForm
                initialValues={{ item_id }}
                // redirect={redirect}
            >
                <TextInput source="name" />
            </SimpleForm>
        </Create>
    )
};

  export default Item_optionCreate;
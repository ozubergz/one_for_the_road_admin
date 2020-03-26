import React from 'react';
import {
    Create,
    SimpleForm,
    // TextInput,
    // ReferenceInput,
    // SelectInput
} from 'react-admin';
import { parse } from 'query-string';
// import OptionCreateButton from './OptionCreateButton';

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
                {/* <ReferenceInput source="item_options" reference="item_options">
                    <SelectInput source="name" />
                </ReferenceInput>  */}
                
                {/* <TextInput label="Title" source="name" />
                <OptionCreateButton/> */}

            </SimpleForm>
        </Create>
    )
};

  export default Item_optionCreate;
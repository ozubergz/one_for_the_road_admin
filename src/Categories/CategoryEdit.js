import React from 'react';
import Chip from '@material-ui/core/Chip';
import { useHistory } from 'react-router-dom';
import {
    Edit,
    TextInput,
    SimpleForm
} from 'react-admin';

const TagField = ({record}) => {
    let history = useHistory();
    return (
        <div>
            <div className="items-label">Items</div>
            {
                record.items ?
                record.items.map(item => 
                    <Chip 
                        className="chip_field"
                        key={item.id}
                        label={item.name}
                        onClick={() => history.push(`/items/${item.id}`)}
                    />
                )
                :
                null
            }
        </div>
    );
}

const CategoryEdit = props => (
    <Edit {...props}>
        <SimpleForm>
            <TextInput disabled source="id" />
            <TextInput source="name" />
            <TagField />
        </SimpleForm>
    </Edit>
);

export default CategoryEdit;
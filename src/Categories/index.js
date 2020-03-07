import React from 'react';
import { useHistory } from 'react-router-dom';
import Chip from '@material-ui/core/Chip';
import {
    Edit,
    List,
    Datagrid,
    TextField,
    TextInput,
    EditButton,
    SimpleForm
} from 'react-admin'

export const CategoryList = props => (
    <List {...props}>
        <Datagrid>
            <TextField disabled source="id" />
            <TextField source="name" />
            <EditButton />
        </Datagrid>
    </List>
);

const TagField = ({record}) => {
    let history = useHistory();
    return (
        <div>
            <div className="items-label">Items</div>
            {record.items.map(item => 
                <Chip 
                    className="chip_field"
                    key={item.id}
                    label={item.name}
                    onClick={() => history.push(`/items/${item.id}`)}
                />
            )}
        </div>
    );
}

export const CategoryEdit = props => (
    <Edit {...props}>
        <SimpleForm>
            <TextInput disabled source="id" />
            <TextInput source="name" />
            <TagField />
        </SimpleForm>
    </Edit>
);
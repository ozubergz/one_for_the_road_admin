import React from 'react';
import {
    Edit,
    List,
    ArrayField,
    Datagrid,
    TextField,
    TextInput,
    EditButton,
    SimpleForm,
    ReferenceField,
    ReferenceArrayField,
    SingleFieldList,
    ChipField,
    ArrayInput,
    SimpleFormIterator,
    ReferenceManyField,
    SimpleList

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
    // console.log(record)
    return (
        <ul>
            {record.items.map(item => 
                <li key={item.id}>{item.name}</li>
            )}
        </ul>
    );
}

export const CategoryEdit = props => (
    <Edit {...props}>
        <SimpleForm>
            <TextInput disabled source="id" />
            <TextInput source="name" />
            <TagField />
            {/* <ArrayField source="items">
                <SingleFieldList >
                    <ChipField source="name" onClick={() => { console.log('click')}} />
                </SingleFieldList>
            </ArrayField> */}
        </SimpleForm>
        
    </Edit>
);
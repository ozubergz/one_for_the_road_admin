import React from 'react';
import {
    List,
    Datagrid,
    TextField,
    // ShowButton
} from 'react-admin';

const CategoryList = props => (
    <List {...props}>
        <Datagrid rowClick="show">
            <TextField disabled source="id" />
            <TextField source="name" />
            {/* <ShowButton /> */}
        </Datagrid>
    </List>
);

export default CategoryList;
import React, { useState, Fragment } from 'react';
import {
    Button,
    List,
    Datagrid,
    TextField,
    NumberField,
    ChipField,
    ReferenceField,
    TopToolbar,
    CreateButton,
    ShowButton,
    EditButton,
} from 'react-admin';
import ItemCreate from './ItemCreate';
import { Drawer } from '@material-ui/core';


const Description = props => {
    const description = props.record.description;
    return <span>{description ? description : null}</span>
}

const ItemList = (props) => {
    const [showDrawer, setShowDrawer] = useState(false);

    const handleClose = () => {
        setShowDrawer(false);
    }

    const handleShow = () => {
        setShowDrawer(true);
    }

    const ListActions = () => (
        <TopToolbar>
            <CreateButton
                to={{pathname: "/items"}} 
                onClick={handleShow}
            />
        </TopToolbar>
    );

    return (
        <Fragment>
            <List {...props} actions={<ListActions />} >
                <Datagrid >
                    <TextField source="id" />
                    <TextField source="name" />
                    <Description source="description" />
                    <NumberField 
                        source="price" 
                        options={{ style: "currency", currency: "USD" }}
                    />
                    <ReferenceField 
                        source="category_id" 
                        reference="categories" 
                        sortBy="categories.name"
                    >
                        <ChipField source="name" />
                    </ReferenceField>
                    <EditButton />
                    <ShowButton />
                </Datagrid>
            </List>
            <Drawer
                anchor="right"
                open={showDrawer}
                onClose={handleClose}
            >
                <ItemCreate
                    { ...props }
                    onCancel={handleClose}
                />
            </Drawer>            
        </Fragment>
    )
};

export default ItemList;
import React, { useState, Fragment } from 'react';
import {
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
import ItemEdit from './ItemEdit';
import { Drawer } from '@material-ui/core';
import { Route } from 'react-router';
import { connect } from "react-redux";
import { push } from "react-router-redux";

const Description = props => {
    const description = props.record.description;
    return <span>{description ? description : null}</span>
}


const ItemList = (props) => {
    const [showCreateDrawer, setShowCreateDrawer] = useState(false);

    const handleCloseCreate = () => {
        setShowCreateDrawer(false);
    }

    const handleCloseEdit = () => {
        props.push("/items")
    }

    const handleShowCreate = () => {
        setShowCreateDrawer(true);
    }

    const ListActions = () => (
        <TopToolbar>
            <CreateButton
                to={{pathname: "/items"}} 
                onClick={handleShowCreate}
            />
        </TopToolbar>
    );
    
    return (
        <Fragment>
            <List {...props} actions={<ListActions />} >
                <Datagrid >
                    <TextField source="id" />
                    <TextField source="name" />
                    <Description source="description" sortable={false} />
                    <NumberField 
                        source="price" 
                        options={{ style: "currency", currency: "USD" }}
                    />
                    <ReferenceField 
                        source="category_id" 
                        reference="categories" 
                        sortBy="categories.name"
                        link="show"
                    >
                        <ChipField source="name" />
                    </ReferenceField>
                    <EditButton  />
                    <ShowButton />
                </Datagrid>
            </List>
            <Drawer
                anchor="right"
                open={showCreateDrawer}
                onClose={handleCloseCreate}
            >
                <ItemCreate
                    { ...props }
                    onCancel={handleCloseCreate}
                />
            </Drawer>
            <Route path="/items/:id">
                {({match}) => (
                    <Drawer
                        anchor="right"
                        open={!!match}
                        onClose={handleCloseEdit}
                    >
                        { match ?
                            <ItemEdit
                                { ...props }
                                id={match.params.id}
                                onCancel={handleCloseEdit}
                            />
                            :
                            null
                        }
                    </Drawer>
                )}
            </Route>            
        </Fragment>
    )
};

export default connect(undefined, { push })(ItemList);
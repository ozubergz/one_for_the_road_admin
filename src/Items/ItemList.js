import React, { useState, Fragment } from 'react';
// import compose from 'recompose/compose';

import {
    Button,
    List,
    Datagrid,
    TextField,
    NumberField,
    ChipField,
    ReferenceField,
    TopToolbar,
    // CreateButton,
    ShowButton,
    EditButton
} from 'react-admin';
import ItemCreate from './ItemCreate';
// import { withStyles } from '@material-ui/core';
// import { Route } from 'react-router';
import { Drawer } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
// import { push } from "react-router-redux";
// import { connect } from "react-redux";


const Description = props => {
    const description = props.record.description;
    return <span>{description ? description : null}</span>
}

// const styles = {
//     drawerContent: {
//         width: 300
//     }
// };

// const ListActions = ({ basePath }) => (
//     <TopToolbar>
//         <CreateButton basePath={basePath} />
//     </TopToolbar>
// );

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
            <Button 
                label="create"
                startIcon={<AddIcon />}
                onClick={handleShow}
            />
        </TopToolbar>
    );

    // render() {
        // const { classes, ...props } = this.props;

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
                        // className={classes.drawerContent}
                        onCancel={handleClose}
                    />
                </Drawer>
                
                {/* <Route path="/items/create">
                    {({ match }) => (    
                        <Drawer
                            anchor="right"
                            open={showDrawer}
                            onClose={ handleClose }
                        >
                            <ItemCreate
                                { ...props }
                                // className={classes.drawerContent}
                                // onCancel={ this.handleClose }
                            />
                        </Drawer>
                    )}
                </Route> */}
            </Fragment>
        )
    // }
};

export default ItemList;

// export default compose(connect(undefined, { push }), withStyles(styles))(ItemList);
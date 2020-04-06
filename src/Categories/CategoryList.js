import React,{ Fragment, Component } from 'react';
import compose from 'recompose/compose';
import {
    List,
    Datagrid,
    TextField,
    EditButton,
    ShowButton,
    CreateButton,
    TopToolbar
} from 'react-admin';
import { connect } from "react-redux";
import { push } from "react-router-redux";
import { Route } from 'react-router';
import { Drawer } from '@material-ui/core';
import { withStyles } from '@material-ui/core';
import CategoryEdit from './CategoryEdit';
import CategoryCreate from './CategoryCreate';

const styles = {
    drawerContent: {
        width: 300
    }
};

const NumberOfItems = ({record}) => {
    return <span>{record.items.length}</span>
}
NumberOfItems.defaultProps = { label: "# of Items"}

const ListActions = ({ basePath }) => (
    <TopToolbar>
        <CreateButton basePath={basePath} />
    </TopToolbar>
);

class CategoryList extends Component {

    handleClose = () => {
        //return to the category list
        this.props.push('/categories')
    }    

    render() {
        const { classes, ...props} = this.props;
        return (
            <Fragment>
                <List {...props} actions={<ListActions/>}>
                    <Datagrid >
                        <TextField source="id" />
                        <TextField source="name" />
                        <NumberOfItems />                 
                        <EditButton />
                        <ShowButton />
                    </Datagrid>
                </List>
                <Route path="/categories/create">
                    {({ match }) => (                        
                        <Drawer
                            anchor="right"
                            open={ !!match }
                            onClose={ this.handleClose }
                        >
                            <CategoryCreate
                                { ...props }
                                className={ classes.drawerContent }
                                onCancel={this.handleClose}
                            />
                        </Drawer>
                    )}
                </Route>
                <Route path="/categories/:id">
                    {({ match }) => {
                        //check if params id is not create
                         const isMatch =
                            match &&
                            match.params &&
                            match.params.id !== 'create';
                            
                        return ( 
                            <Drawer 
                                anchor="right"
                                open={!!isMatch}
                                onClose={this.handleClose}
                            >
                                {isMatch ? (
                                    <CategoryEdit 
                                        {...props}
                                        className={classes.drawerContent}
                                        id={isMatch ? match.params.id : null}
                                        onCancel={this.handleClose}
                                    />
                                ) : (
                                    <div className={classes.drawerContent} />
                                )}
                            </Drawer>
                        );
                    }} 
                </Route>
            </Fragment>
        );
    }
};

export default compose(connect(undefined, { push }), withStyles(styles))(CategoryList);
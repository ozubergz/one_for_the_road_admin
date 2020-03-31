import React,{ Fragment, Component } from 'react';
import { connect } from "react-redux";
import { push } from "react-router-redux";
import compose from 'recompose/compose';
import {
    List,
    Datagrid,
    TextField,
    EditButton
} from 'react-admin';
import { Route } from 'react-router';
import CategoryEdit from './CategoryEdit';
import { Drawer } from '@material-ui/core';
import { withStyles } from '@material-ui/core';

const styles = {
    drawerContent: {
        width: 300
    }
};


class CategoryList extends Component {

    handleClose = () => {
        //return to the category list
        this.props.push('/categories')
    }

    render() {
        const { classes, ...props} = this.props;
        return (
            <Fragment>
                <List {...props}>
                    <Datagrid rowClick="show">
                        <TextField disabled source="id" />
                        <TextField source="name" />
                        <EditButton />
                    </Datagrid>
                </List>
                <Route path="/categories/:id">
                    { ({ match }) => {
                        const isMatch = match && match.params && match.params.id !== "create";
                        
                        // console.log(!!isMatch)

                        return ( 
                            <Drawer 
                                anchor="right"
                                // open
                                open={!!isMatch}
                                onClick={this.handleClose}
                            >
                                {isMatch ? (
                                    <CategoryEdit 
                                        {...props}
                                        className={classes.drawerContent}
                                        id={isMatch ? match.params.id : null}
                                        // onCancel={this.handleClose}
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
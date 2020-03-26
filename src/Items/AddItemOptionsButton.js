import React, { Component, Fragment } from 'react';
import { 
    Button,
    SaveButton,
    SimpleForm,
    TextInput,
    // NumberInput,
    // ReferenceInput,
    // SelectInput
 } from 'react-admin';

import AddCircleIcon from '@material-ui/icons/AddCircle';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';


class OptionCreateButton extends Component {
    state = {
        showDialog: false
    }

    handleClick = () => {
        this.setState({ showDialog: true });
    }

    handleClose = () => {
        this.setState({ showDialog: false });
    }
    
    render() {
        // console.log(console.log(this.props.record.id))
        const { showDialog } = this.state;
        
        return (
            <Fragment>
                <Button
                    onClick={this.handleClick}
                    label="Create a Table of Options"
                    // onClose={this.handleClose}
                >
                    <AddCircleIcon/>
                </Button>
                
                <Dialog fullWidth open={showDialog} >
                    <DialogTitle>Table of Options</DialogTitle>
                    <DialogContent>
                        
                        <SimpleForm
                            resource="item_options"
                            toolbar={null}
                        >
                            
                            <TextInput label="Title" source="name" />
                            
                            {/* <TextInput source="name" />
                            <NumberInput source="price" step={1} />
                            <SelectInput source="input_type" choices={[
                                { id: 1, name: "radio" },
                                { id: 2, name: "checkbox" }
                            ]}/> */}

                        </SimpleForm>

                    </DialogContent>
                    <DialogActions>

                        <SaveButton >
                        </SaveButton>

                        <Button onClick={this.handleClose} label="Cancel">
                        </Button>

                    </DialogActions>
                </Dialog>
                
            </Fragment>
            
        );
    }
}

export default OptionCreateButton;


// import React from 'react';
// import { Button } from 'react-admin';
// import AddCircleIcon from '@material-ui/icons/AddCircle';
// import { Link } from 'react-router-dom';

// const AddItemOptionsButton = ({ record}) => (
//     <Button
//         component={Link}
//         to={{
//             pathname: "/item_options/create",
//             search: `?item_id=${record.id}`
//         }}
//         label="Add Item Options"
//     >
//         <AddCircleIcon />
//     </Button>
// )

// export default AddItemOptionsButton;
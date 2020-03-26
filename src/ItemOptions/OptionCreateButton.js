import React, { Component, Fragment } from 'react';
import { 
    Button,
    SaveButton,
    SimpleForm,
    TextInput,
    NumberInput,
    // ReferenceInput,
    SelectInput
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
        
        const { showDialog } = this.state;
        
        return (
            <Fragment>
                <Button
                    onClick={this.handleClick}
                    label="Create Option"
                    // onClose={this.handleClose}
                >
                    <AddCircleIcon/>
                </Button>
                
                <Dialog fullWidth open={showDialog} >
                    <DialogTitle>Create Option</DialogTitle>
                    <DialogContent>
                        
                        <SimpleForm
                            resource="options"
                            toolbar={null}
                        >
                            <TextInput source="name" />
                            <NumberInput source="price" step={1} />
                            <SelectInput source="input_type" choices={[
                                { id: 1, name: "radio" },
                                { id: 2, name: "checkbox" }
                            ]}/>

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
import React, { Component, Fragment } from 'react';
import { 
    Button,
    SimpleForm,
    TextInput,
    ArrayInput,
    SimpleFormIterator,
    NumberInput,
    SelectInput,
    required,
    number,
    minValue
 } from 'react-admin';

import SaveOptionButton from './SaveOptionButton';

import AddCircleIcon from '@material-ui/icons/AddCircle';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';

class CreateOptionButton extends Component {

    state = {
        showDialog: false
    }

    handleShowClick = () => {
        this.setState({ showDialog: true });
    }

    handleCloseClick = () => {
        this.setState({ showDialog: false });
    }
    
    render() {

        const { showDialog } = this.state;
        const { record } = this.props;
        
        return (
            <Fragment>
                <Button 
                    onClick={this.handleShowClick} 
                    label="Create a Table of Options"
                >
                    <AddCircleIcon/>
                </Button>
                <Dialog 
                    fullWidth 
                    open={showDialog}
                    onClose={this.handleCloseClick}
                >
                    <DialogTitle>Table of Options</DialogTitle>
                    <DialogContent>
                        <SimpleForm
                            toolbar={<SaveOptionButton />}
                            initialValues={{item_id: record.id}}
                            variant="standard"
                        >
                            <TextInput label="Title" source="name" validate={required()} />
                            <ArrayInput source="options" validate={required()}>
                                <SimpleFormIterator>
                                    <TextInput label="Name" source="name" />
                                    <NumberInput 
                                        label="Price" 
                                        source="price" 
                                        validate={[number(), minValue(0)]}
                                    />
                                    <SelectInput label="Input Type" source="input_type" choices={[
                                         { id: "radio", name: "radio" },
                                         { id: "checkbox", name: "checkbox" }
                                    ]}/>
                                </SimpleFormIterator>
                            </ArrayInput>
                        </SimpleForm>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleCloseClick} label="Cancel" />
                    </DialogActions>
                </Dialog>
            </Fragment>
            
        );
    }
}

export default CreateOptionButton;
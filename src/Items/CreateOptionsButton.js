import React, { Component, Fragment } from 'react';
// import { change, submit, isSubmitting } from 'redux-form';
// import { useFormState } from 'react-final-form';
import { 
    Button,
    // SaveButton,
    SimpleForm,
    TextInput,
    ArrayInput,
    SimpleFormIterator,
    NumberInput,
    SelectInput,
    required,
    // fetchEnd,
    // fetchStart,
    // showNotification,
    // crudGetMatching
 } from 'react-admin';

import SaveOptionButton from './SaveOptionButton';

import AddCircleIcon from '@material-ui/icons/AddCircle';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';

class OptionCreateButton extends Component {

    state = {
        showDialog: false
    }

    handleShowClick = () => {
        this.setState({ showDialog: true });
    }

    handleCloseClick = () => {
        this.setState({ showDialog: false });
    }

    // handleSaveClick = () => {
    //     // const { submit } = this.props;

    //     // Trigger a submit of our custom quick create form
    //     // This is needed because our modal action buttons are oustide the form
    //     // submit("item_options-quick-create");
    // }

    // handleSubmit = values => {
    //     // const { change, fetchStart, fetchEnd, showNotification } = this.props;

    //     console.log(values)
    // }
    
    render() {

        const { showDialog } = this.state;
        
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
                    // defaultValue=
                    onClose={this.handleCloseClick}
                >
                    <DialogTitle>Table of Options</DialogTitle>
                    <DialogContent>
                        <SimpleForm
                            toolbar={<SaveOptionButton />}
                            variant="standard"
                        >
                            
                            <TextInput label="Title" source="name" validate={required()} />

                            <ArrayInput source="options" validate={required()}>
                                <SimpleFormIterator>
                                    <TextInput label="Name" source="name" />
                                    <NumberInput label="Price" source="price" />
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

// const mapStateToProps = state => ({
//     isSubmitting: isSubmitting('item_options-quick-create')(state)
// });

// const mapDispatchToProps = {
//     change,
//     fetchEnd,
//     fetchStart,
//     showNotification,
//     submit,
//     crudGetMatching
//   };

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
import React, { Fragment, useState } from 'react';
import { 
    Button,
    SimpleForm,
    TextInput,
    required,
    Toolbar
 } from 'react-admin';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import { CreateButton } from './SaveOptionButtons';

const CreateOptionButton = (props) => {
    const [showDialog, setShowDialog] = useState(false);

    const handleShowClick = () => {
        setShowDialog(true);
    }

    const handleCloseClick = () => {
        setShowDialog(false)
    }

    const CustomToolbar = () => (
        <Toolbar {...props}> 
            <CreateButton />
            <Button onClick={handleCloseClick} label="Cancel" />
        </Toolbar>
    );
    
    const { record } = props;  

    return (
        <Fragment>
            <Button 
                onClick={handleShowClick} 
                label="Create Table of Options"
            >
                <AddCircleIcon/>
            </Button>
            <Dialog 
                fullWidth 
                open={showDialog}
                onClose={handleCloseClick}
            >
                <DialogTitle>Create Table of Options</DialogTitle>
                <DialogContent>
                    <SimpleForm
                        toolbar={<CustomToolbar />}
                        initialValues={{item_id: record.id}}
                        variant="standard"
                    >
                        <TextInput label="Title" source="name" validate={required()} />
                    </SimpleForm>
                </DialogContent>
            </Dialog>
        </Fragment>
    );
}

export default CreateOptionButton;
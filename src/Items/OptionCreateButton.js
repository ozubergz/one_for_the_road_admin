import React, { Fragment, useState } from 'react';
import { 
    Button,
    SimpleForm,
    TextInput,
    required,
    useNotify,
    useMutation,
    useRefresh,
    SaveButton,
 } from 'react-admin';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import { DialogActions } from '@material-ui/core';

const CreateOptionButton = (props) => {
    const [showDialog, setShowDialog] = useState(false);
    const [userInput, setUserInput] = useState({name: ""});

    const handleShowClick = () => {
        setShowDialog(true);
    }

    const handleCloseClick = () => {
        setShowDialog(false)
    }

    const handleChange = evt => {
        setUserInput({name: evt.target.value});
    }

    const SaveOptionButton = () => {
        const [mutate, { loading }] = useMutation();
        const notify = useNotify();
        const refresh = useRefresh();
        
        const handleSave = () => mutate(
            {   
                type: "create",
                resource: "item_options",
                payload: { 
                    data: { 
                        name: userInput.name,
                        item_id: props.record.id
                        }
                }
            },
            {
                onSuccess: ({ data }) => {
                    notify('ra.notification.created', 'info', {smart_count: 1});
                    refresh();
                },
                onFailure: (error) => notify(`Error ${error.message}`, 'warning')
            }
        );
        
        return <SaveButton {...props} disabled={loading} handleSubmitWithRedirect={handleSave} />
     }
    

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
                        toolbar={null}
                        variant="standard"
                    >
                        <TextInput 
                            label="Title" 
                            source="name" 
                            validate={required()}
                            value={userInput.name}
                            onChange={handleChange}
                        />
                    </SimpleForm>
                </DialogContent>
                <DialogActions>
                    <SaveOptionButton />
                    <Button onClick={handleCloseClick} label="Cancel" />
                </DialogActions>
            </Dialog>
        </Fragment>
    );
}

export default CreateOptionButton;
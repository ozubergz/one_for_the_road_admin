import React, { 
    Fragment, 
    useState,
    useReducer
 } from 'react';
import { 
    Button,
    SimpleForm,
    TextInput,
    required,
    Toolbar
 } from 'react-admin';
import EditIcon from '@material-ui/icons/Edit';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import { UpdateButton } from './SaveOptionButtons'

const EditOptionButton = (props) => {
    const [showDialog, setShowDialog] = useState(false);
    const [userInput, setUserInput] = useReducer((state, newState) => (
        {...state, ...newState}
    ), { name: record.name });

    const handleShowClick = () => {
        setShowDialog(true);
    }

    const handleCloseClick = () => {
        setShowDialog(false);
    }

    const handleChange = (evt) => {
        setUserInput({
            [evt.target.name]: evt.target.value
        });
    }

    const CustomToolbar = () => (
        <Toolbar {...props}> 
            <UpdateButton />
            <Button onClick={handleCloseClick} label="Cancel" />
        </Toolbar>
    );

    const { record } = props;  
    
    return (
        <Fragment>
            <Button
                onClick={handleShowClick}
                startIcon={ <EditIcon />}
                label="ra.action.edit"
            />
            <Dialog 
                fullWidth 
                open={showDialog}
                onClose={handleCloseClick}
            >
                <DialogTitle>Edit Title</DialogTitle>
                <DialogContent>
                    <SimpleForm
                        toolbar={<CustomToolbar />}
                        initialValues={{id: record.id}}
                        variant="standard"
                    >
                        <TextInput 
                            onChange={handleChange}
                            value={userInput.name}
                            label="Title" 
                            source="name" 
                            validate={required()}
                        />
                    </SimpleForm>
                </DialogContent>
            </Dialog>
        </Fragment>
    )
}

export default EditOptionButton;
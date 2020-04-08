import React, { 
    Fragment, 
    useState,
 } from 'react';
import { 
    Button,
    SimpleForm,
    TextInput,
    required,
    useMutation,
    useNotify,
    useRefresh,
    SaveButton
} from 'react-admin';
import EditIcon from '@material-ui/icons/Edit';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import { DialogActions } from '@material-ui/core';

const EditOptionButton = (props) => {
    const { record } = props;
    const [showDialog, setShowDialog] = useState(false);
    const [userInput, setUserInput] = useState(0);

    const handleShowClick = () => {
        setShowDialog(true);
        setUserInput({name: record.name})
    }

    const handleCloseClick = () => {
        setShowDialog(false);
    }

    const handleChange = (evt) => {
        setUserInput({ name: evt.target.value });
    }

    const SaveOptionButton = () => {
        const [mutate, { loading }] = useMutation();
        const notify = useNotify();
        const refresh = useRefresh();
    
        const handleSave = () => {
            mutate(
                {   
                    type: "update",
                    resource: "item_options",
                    payload: { 
                        id: record.id, 
                        data: { name: userInput.name }
                    }
                },
                {
                    onSuccess: ({ data }) => {
                        notify('ra.notification.updated', 'info', {smart_count: 1});
                        refresh();
                    },
                    onFailure: (error) => notify(`Error ${error.message}`, 'warning')
                }
            );
        }
        return <SaveButton {...props} disabled={loading} handleSubmitWithRedirect={handleSave} />
     }

    
    return (
        <Fragment>
            <Button
                onClick={handleShowClick}
                label="ra.action.edit"
            ><EditIcon/>
            </Button>
            <Dialog 
                fullWidth 
                open={showDialog}
                onClose={handleCloseClick}
            >
                <DialogTitle>Edit Title</DialogTitle>
                <DialogContent>
                    <SimpleForm
                        toolbar={null}
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
                <DialogActions>
                    <SaveOptionButton />
                    <Button onClick={handleCloseClick} label="Cancel" />
                </DialogActions>
            </Dialog>
        </Fragment>
    )
}

export default EditOptionButton;
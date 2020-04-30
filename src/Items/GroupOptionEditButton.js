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
    useMutation,
    useNotify,
    useRefresh,
    SaveButton,
    SelectInput
} from 'react-admin';
import EditIcon from '@material-ui/icons/Edit';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import { DialogActions } from '@material-ui/core';

const EditOptionButton = (props) => {
    const { record } = props;
    const [showDialog, setShowDialog] = useState(false);
    const [userInput, setUserInput] = useReducer((state, newState) => (
        {...state, ...newState}
    ), { name: "", required: "" });

    const handleShowClick = () => {
        setShowDialog(true);
        setUserInput({ ...record})
    }

    const handleCloseClick = () => {
        setShowDialog(false);
    }

    const handleChange = (evt) => {
        setUserInput({ 
            [evt.target.name]: evt.target.value
         });
    }

    const SaveOptionButton = () => {
        const [mutate, { loading }] = useMutation();
        const notify = useNotify();
        const refresh = useRefresh();
    
        const handleSave = () => {
            mutate(
                {   
                    type: "update",
                    resource: "group_options",
                    payload: { 
                        id: record.id, 
                        data: { ...userInput }
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
                <DialogTitle>Edit title and required</DialogTitle>
                <DialogContent>
                    <SimpleForm
                        toolbar={null}
                        initialValues={{id: record.id}}
                        variant="standard"
                    >
                        <TextInput 
                            onChange={handleChange}
                            validate={required()}
                            value={userInput.name}
                            label="Title" 
                            source="name" 
                        />
                        <SelectInput 
                            onChange={handleChange}
                            validate={required()}
                            value={userInput.required}
                            source="required" choices={[
                                { id: "true", name: "true" },
                                { id: "false", name: "false" }
                            ]}
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
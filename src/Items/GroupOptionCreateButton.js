import React, { 
    Fragment, 
    useState,
    useReducer
} from 'react';
import { 
    Button,
    SimpleForm,
    TextInput,
    // required,
    useNotify,
    useMutation,
    useRefresh,
    SaveButton,
    SelectInput,
    ReferenceInput
 } from 'react-admin';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import { DialogActions } from '@material-ui/core';

const CreateOptionButton = (props) => {
    const [showDialog, setShowDialog] = useState(false);
    // const [enableSaveBtn, setEnableSaveBtn] = useState(true);
    const [userSelectInput, setUserSelectInput] = useState({group_option_id: ""})
    const [userInput, setUserInput] = useReducer((state, newState) => (
        {...state, ...newState}
    ), { name: "", required: "" });

    const handleShowClick = () => {
        setShowDialog(true);
    }

    const handleCloseClick = () => {
        setShowDialog(false)
    }

    const handleChange = evt => {
        setUserInput({
            [evt.target.name]: evt.target.value
        });

        

        setUserSelectInput({
            group_option_id: ""
        });
    }

    const handleSelectInput = evt => {
        setUserSelectInput({
            group_option_id: evt.target.value
        });


        setUserInput({
            name: "", 
            required: ""
        });
    }

    const SaveOptionButton = () => {
        const notify = useNotify();
        const refresh = useRefresh();
        const [mutate, { loading }] = useMutation();
        
        const { name, required } = userInput;
        const { group_option_id } = userSelectInput;

        const disableBtn = (name !== "" && required !== "") ? false : (!group_option_id);
        
        const handleSave = () => mutate(
            {   
                type: "create",
                resource: "group_options",
                payload: { 
                    data: { 
                            group_option: { ...userInput },
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

        return <SaveButton {...props} disabled={disableBtn} handleSubmitWithRedirect={handleSave} />
     }
    
    return (
        <Fragment>
            <Button 
                onClick={handleShowClick} 
                label="Create Group of Options"
            >
                <AddCircleIcon/>
            </Button>
            <Dialog 
                fullWidth 
                open={showDialog}
                onClose={handleCloseClick}
            >

                <DialogContent>
                    <SimpleForm
                        toolbar={null}
                        variant="standard"
                    >
                        <DialogTitle className="dialog-title">Select defined options</DialogTitle>

                        <ReferenceInput onChange={handleSelectInput} 
                            label="Choose Options" 
                            source="group_options" 
                            reference="group_options" 
                        >
                            <SelectInput
                                optionText="name"
                                value={userSelectInput.group_option_id}
                            />
                        </ReferenceInput>


                        <DialogTitle className="dialog-title">Create a new one</DialogTitle>

                        <TextInput 
                            label="Title" 
                            source="name" 
                            // validate={required()}
                            value={userInput.name}
                            onChange={handleChange}
                        />
                        <SelectInput 
                            // validate={required()}
                            value={userInput.required}
                            source="required" choices={[
                                { id: "true", name: "true" },
                                { id: "false", name: "false" }
                            ]}
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
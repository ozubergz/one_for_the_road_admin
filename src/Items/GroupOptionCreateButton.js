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
// import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import { DialogActions } from '@material-ui/core';

const CreateOptionButton = (props) => {
    const [showDialog, setShowDialog] = useState(false);
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

        // setUserSelectInput({
        //     item_option_id: ""
        // });
    }

    const handleSelectInput = evt => {
        // setUserSelectInput({
        //     group_option_id: evt.target.value
        // });

        // setUserInput({
        //     name: "", required: ""
        // });
    }

    const SaveOptionButton = () => {
        const [mutate, { loading }] = useMutation();
        const notify = useNotify();
        const refresh = useRefresh();
        const {name, required} = userInput;
        const isEnabled = !name || !required || loading;
        
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
        return <SaveButton {...props} disabled={isEnabled} handleSubmitWithRedirect={handleSave} />
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
                {/* <DialogTitle>Create Table of Options</DialogTitle> */}
                <DialogContent>
                    <SimpleForm
                        toolbar={null}
                        variant="standard"
                    >
                        {/* <ReferenceInput onChange={handleSelectInput} source="group_option" reference="group_options">
                            <SelectInput 
                                optionText="id"
                                // value={userSelectInput.group_option_id}
                                onChange={handleSelectInput}
                            />
                        </ReferenceInput> */}

                        <ReferenceInput source="group_options" reference="group_options" >
                            <SelectInput
                                optionText="name"
                                
                            />
                        </ReferenceInput>


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
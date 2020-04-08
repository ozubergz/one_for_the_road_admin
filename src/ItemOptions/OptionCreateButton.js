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
    useNotify,
    useMutation,
    useRefresh,
    SaveButton,
    number,
    minValue,
    NumberInput,
    SelectInput,
 } from 'react-admin';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';

const CreateOptionButton = (props) => {
    const { record } = props;
    const [showDialog, setShowDialog] = useState(false);
    const [userInput, setUserInput] = useReducer((state, newState) => (
        {...state, ...newState}
    ), {
        name: "",
        price: "",
        input_type: "",
        item_option_id: record.id
    })

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
    }

    const SaveOptionButton = () => {
        const [mutate, { loading }] = useMutation();
        const notify = useNotify();
        const refresh = useRefresh();
        
        const handleSave = () => mutate(
            {   
                type: "create",
                resource: "options",
                payload: { data: { ...userInput } }
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
                label="Create Options"
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
                            source="name" 
                            validate={required()}
                            value={userInput.name}
                            onChange={handleChange}
                        />
                        <NumberInput 
                            label="Price" 
                            source="price" 
                            validate={[number(), minValue(0)]}
                            value={userInput.price}
                            onChange={handleChange}
                        />
                        <SelectInput 
                            validate={required()} 
                            label="Input Type" 
                            value={userInput.input_type}
                            source="input_type" choices={[
                                { id: "radio", name: "radio" },
                                { id: "checkbox", name: "checkbox" }
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
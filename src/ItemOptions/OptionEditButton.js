import React, { 
    Fragment,
    useState,
    useReducer,
 } from 'react';
import { 
    Button,
    SimpleForm,
    SelectInput,
    TextInput,
    NumberInput,
    useMutation,
    useNotify,
    number,
    minValue,
    required,
    SaveButton,
    useRefresh
} from 'react-admin';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import EditIcon from '@material-ui/icons/Edit';

const OptionEditButton = (props) => {
    const { record } = props;
    const [showDialog, setShowDialog] = useState(false);    
    const [userInput, setUserInput] = useReducer((state, newState) => (
        {...state, ...newState}
    ), {
        ...record,
        price: record.price ? record.price : ""
     });

    const handleShowClick = () => {        
        setShowDialog(true);
    }

    const handleCloseClick = () => {
        setShowDialog(false);
    }

    const handleChange = evt => {
        setUserInput({
            [evt.target.name]: evt.target.value
        });
    }

    const SaveEditButton = () => {
        const { name, price, input_type } = userInput;
        const [mutate, { loading }] = useMutation();
        const refresh = useRefresh();
        const notify = useNotify();
        const isEnabled = !name || loading;

        const update = () => mutate(
            {
                type: 'update',
                resource: 'options',
                payload: {
                    id: record.id,
                    data: { name, price, input_type }
                },
           },
           {
                // undoable: true,
                onSuccess: ({ data }) => {
                    notify('ra.notification.updated', 'info', {smart_count: 1});
                    refresh();
                    // setShowDialog(false)
                },
                onFailure: (error) => notify(`Error: ${error.message}`, 'warning'),
            }
        );
        return <SaveButton {...props} disabled={isEnabled} handleSubmitWithRedirect={update} />
    }

    return (
        <Fragment>
            <Button
                label="edit"
                onClick={handleShowClick}
            ><EditIcon/></Button>
            <Dialog
                fullWidth
                open={showDialog}
                onClose={handleCloseClick}
            >
                <DialogTitle>Option #{record.id}</DialogTitle>
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
                    <SaveEditButton />
                    <Button label="cancel" onClick={handleCloseClick}/>
                </DialogActions>
            </Dialog>
        </Fragment>
    )
}

export default OptionEditButton;
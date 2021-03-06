import React, { 
    useState, 
    useReducer, 
    Fragment } from "react";
import { 
    Button,
    number,
    minValue,
    required,
    SimpleForm,
    TextInput,
    ReferenceInput,
    SelectInput,
    NumberInput,
    useMutation,
    useNotify,
    useRefresh,
    SaveButton,
 } from "react-admin";

import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import AddIcon from '@material-ui/icons/Add';

const ItemCreateButton = (props) => {
    const { record } = props;
    const [showDialog, setShowDialog] = useState(false);
    const [userInput, setUserInput] = useReducer((state, newState) => (
        {...state, ...newState}
    ), {
        name: "",
        price: "",
        description: "",
        category_id: record.id
    })
    
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

    const SaveCreateButton = () => {
        const { name, price } = userInput;
        const notify = useNotify();
        const refresh = useRefresh();
        const [mutate, { loading }] = useMutation();
        const isEnabled = !name || !price || loading;
    
        const handleSave = () => mutate(
            {
                type: 'create',
                resource: 'items',
                payload: { data: { ...userInput } },
            },
            {
                onSuccess: ({ data }) => {
                    notify('ra.notification.created', 'info', {smart_count: 1});
                    refresh();
                },
                onFailure: (error) => notify(`Error: ${error.message}`, 'warning')
            }
        );
        
        return <SaveButton {...props} disabled={isEnabled} handleSubmitWithRedirect={handleSave} />
    }

    return (
        <Fragment>
            <Button
                onClick={handleShowClick}
                label="create"
                startIcon={<AddIcon />}
            />
            <Dialog
                fullWidth
                open={showDialog}
                onClose={handleCloseClick}
            >
                <DialogTitle>Create New Item</DialogTitle>
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
                        <ReferenceInput 
                            source="category_id" 
                            reference="categories"
                            sort={{ field: 'name', order: 'ASC' }}
                            value={userInput.category_id} 
                            onChange={handleChange} 
                        >
                            <SelectInput 
                                optionText="name"
                            />
                        </ReferenceInput>
                        <NumberInput 
                            validate={[required(), number(), minValue(0)]}
                            source="price"
                            value={userInput.price}
                            onChange={handleChange}
                        />
                        <TextInput
                            multiline
                            fullWidth
                            source="description"
                            value={userInput.description}
                            onChange={handleChange}
                        />
                    </SimpleForm>
                </DialogContent>
                <DialogActions>
                    <SaveCreateButton />
                    <Button label="cancel" onClick={handleCloseClick}/>
                </DialogActions>
            </Dialog>
        </Fragment>          
    )
}

export default ItemCreateButton;
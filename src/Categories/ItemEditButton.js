import React, { 
    Fragment,
    useState,
    useReducer,
 } from 'react';
import { 
    Button,
    SimpleForm,
    ReferenceInput,
    SelectInput,
    TextInput,
    NumberInput,
    useMutation,
    useNotify,
    number,
    minValue,
    required,
    SaveButton,
} from 'react-admin';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import EditIcon from '@material-ui/icons/Edit';

const ItemEditButton = (props) => {
    const record = props.record;
    const [showDialog, setShowDialog] = useState(false);    
    const [userInput, setUserInput] = useReducer((state, newState) => (
        {...state, ...newState}
    ), {
        ...record,
        description: record.description ? record.description : ""
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
        const {id, name, price, description, category_id} = userInput;
        const [mutate, { loading }] = useMutation();
        const notify = useNotify();
        const isEnabled = !name || !price || loading;

        const update = () => mutate(
            {
                type: 'update',
                resource: 'items',
                payload: {
                    id,
                    data: { name, price, description, category_id }
                },
           },
           {
                undoable: true,
                onSuccess: ({ data }) => {
                    notify('ra.notification.updated', 'info', {smart_count: 1}, true);
                    setShowDialog(false)
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
                startIcon={<EditIcon />}
            />
            <Dialog
                fullWidth
                open={showDialog}
                onClose={handleCloseClick}
            >
                <DialogTitle>Item #{record.id}</DialogTitle>
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
                            value={userInput.category_id} 
                            source="category_id" 
                            reference="categories"
                            sort={{ field: 'name', order: 'ASC' }}
                            onChange={handleChange} 
                        >
                            <SelectInput 
                                optionText="name"
                            />
                        </ReferenceInput>
                        <NumberInput 
                            validate={[number(), minValue(0)]}
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
                    <SaveEditButton />
                    <Button label="cancel" onClick={handleCloseClick}/>
                </DialogActions>
            </Dialog>
        </Fragment>
    )
}

export default ItemEditButton;
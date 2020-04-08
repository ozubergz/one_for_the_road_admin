import React, { Fragment, useState } from 'react';
import { 
    Button,
    SimpleForm,
    TextInput,
    ArrayInput,
    SimpleFormIterator,
    NumberInput,
    SelectInput,
    required,
    number,
    minValue,
    useNotify,
    useRefresh,
    SaveButton,
    useMutation,
    Toolbar
 } from 'react-admin';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';

const CreateOptionButton = (props) => {
    const [showDialog, setShowDialog] = useState(false);

    const handleShowClick = () => {
        setShowDialog(true);
    }

    const handleCloseClick = () => {
        setShowDialog(false)
    }

    const SaveOptionButton = props => {
        const [mutate, { loading }] = useMutation();
        const notify = useNotify();
        const refresh = useRefresh();

        const handleSave = (values) => {
            mutate(
                {   
                    type: "create",
                    resource: "item_options",
                    payload: { data: {...values} }
                },
                {
                    undoable: true,
                    onSuccess: ({ data }) => {
                        notify('ra.notification.created', 'info', {smart_count: 1}, true);
                        refresh();
                    },
                    onFailure: (error) => notify(`Error ${error.message}`, 'warning')
                }
            );
        }
        return <SaveButton {...props} disabled={loading} onSave={handleSave} />
     }

     const CustomToolbar = (props) => (
         <Toolbar {...props}> 
            <SaveOptionButton />
            <Button onClick={handleCloseClick} label="Cancel" />
         </Toolbar>
     );
    
    const { record } = props;  

    return (
        <Fragment>
            <Button 
                onClick={handleShowClick} 
                label="Create a Table of Options"
            >
                <AddCircleIcon/>
            </Button>
            <Dialog 
                fullWidth 
                open={showDialog}
                onClose={handleCloseClick}
            >
                <DialogTitle>Table of Options</DialogTitle>
                <DialogContent>
                    <SimpleForm
                        toolbar={<CustomToolbar />}
                        initialValues={{item_id: record.id}}
                        variant="standard"
                    >
                        <TextInput label="Title" source="name" validate={required()} />
                        <ArrayInput source="options" validate={required()}>
                            <SimpleFormIterator>
                                <TextInput label="Name" source="name" />
                                <NumberInput 
                                    label="Price" 
                                    source="price" 
                                    validate={[number(), minValue(0)]}
                                />
                                <SelectInput label="Input Type" source="input_type" choices={[
                                        { id: "radio", name: "radio" },
                                        { id: "checkbox", name: "checkbox" }
                                ]}/>
                            </SimpleFormIterator>
                        </ArrayInput>
                    </SimpleForm>
                </DialogContent>
            </Dialog>
        </Fragment>
    );
}

export default CreateOptionButton;
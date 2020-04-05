import React, { 
    Component, 
    Fragment,
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
    useRefresh,
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

const SaveEditButton = ({record}) => {
    const {id, name, price, description, category_id } = record;
    const [mutate, { loading }] = useMutation();
    const refresh = useRefresh();
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
                refresh();
                notify('ra.notification.updated', 'info', {smart_count: 1}, true);
            },
            onFailure: (error) => notify(`Error: ${error.message}`, 'warning'),
        }
    );
    return <SaveButton disabled={isEnabled} handleSubmitWithRedirect={update} />
}


class ItemEditButton extends Component {
    state = {
        id: "",
        name: "",
        price: "",
        description: "",
        category_id: "",
        showDialog: false
    }

    handleShowClick = () => {
        const { record } = this.props;

        this.setState({ 
            ...record,
            description: record.description ? record.description : "",
            showDialog: true
         });
    }

    handleCloseClick = () => {
        this.setState({showDialog: false});
    }

    handleChange = (e) => { 
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    render() {
        
        const props = this.props;
        const { 
            showDialog, 
            name, 
            price, 
            description, 
            category_id 
        } = this.state;
        
        return (
            <Fragment>
                <Button
                    label="ra.action.edit"
                    onClick={this.handleShowClick}
                    startIcon={ <EditIcon />}
                />
                <Dialog
                    fullWidth
                    open={showDialog}
                    onClose={this.handleCloseClick}
                >
                    <DialogTitle>Item #{props.record.id}</DialogTitle>
                    <DialogContent>
                        
                        <SimpleForm
                            toolbar={null}
                            variant="standard"
                        >
                            <TextInput 
                                source="name" 
                                validate={required()}
                                value={name}
                                onChange={this.handleChange}
                            />
                            <ReferenceInput 
                                value={category_id} 
                                onChange={this.handleChange} 
                                source="category_id" 
                                reference="categories"
                                sort={{ field: 'name', order: 'ASC' }}
                            >
                                <SelectInput 
                                    optionText="name"
                                />
                            </ReferenceInput>
                            <NumberInput 
                                validate={[number(), minValue(0)]}
                                onChange={this.handleChange}
                                source="price"
                                value={price ? price.toFixed(2) : ""}
                            />
                            <TextInput
                                multiline
                                fullWidth
                                source="description"
                                value={description}
                                onChange={this.handleChange}
                            />
                        </SimpleForm>
                    </DialogContent>
                    <DialogActions>
                        <SaveEditButton record={this.state} />
                        <Button label="cancel" onClick={this.handleCloseClick}/>
                    </DialogActions>
                </Dialog>
            </Fragment>
        );
    }
}

export default ItemEditButton;
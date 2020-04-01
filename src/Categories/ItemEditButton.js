import React, { Component, Fragment } from 'react';
import { 
    Button,
    SimpleForm,
    ReferenceInput,
    SelectInput,
    TextInput,
    NumberInput,
    // Toolbar,
    useMutation,
    useNotify,
    useRefresh,
    number,
    minValue,
    required,
    SaveButton
} from 'react-admin';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import EditIcon from '@material-ui/icons/Edit';
// import { connect } from "react-redux";
// import { change, submit, isSubmitting } from "redux-form";

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
            // undoable: true,
            onSuccess: ({ data }) => {
                notify('ra.notification.updated', 'info', {
                    smart_count:1
                });
                refresh();
            },
            onFailure: (error) => notify(`Error: ${error.message}`, 'warning'),
        }
    );

    return <SaveButton disabled={isEnabled} handleSubmitWithRedirect={update} />
}


class ItemEditButton extends Component {
    state = {
        id: null,
        name: null,
        price: null,
        description: "",
        category_id: null,
        showDialog: false
    }

    handleShowClick = () => {
        const { record } = this.props;
        const { id, name, description, price, category_id } = record;
        this.setState({
            showDialog: true,
            id,
            name,
            price,
            description,
            category_id
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

    handleSaveClick = () => {
        const {id, name, price, description, category_id } = this.state;
        if(name && price) {
            
        }
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
                            >
                                <SelectInput 
                                    optionText="name"
                                />
                            </ReferenceInput>
                            <NumberInput 
                                validate={[number(), minValue(0)]}
                                onChange={this.handleChange}
                                source="price"
                                value={price}
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

// const mapStateToProps = state => ({
//     isSubmitting: isSubmitting("item-quick-update")(state),
// });

export default ItemEditButton;
import React, { Component, Fragment } from 'react';
import { 
    Button,
    SimpleForm,
    ReferenceInput,
    SelectInput,
    TextInput,
    NumberInput,
    number,
    minValue,
    required
} from 'react-admin';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import EditIcon from '@material-ui/icons/Edit';
// import RichTextInput from 'ra-input-rich-text';
// import { TextField } from '@material-ui/core';

class ItemEditButton extends Component {
    state = {
        name: "",
        price: 0,
        description: "",
        category_id: null,
        showDialog: false
    }

    handleShowClick = () => {
        const { record } = this.props;
        const { name, description, price, category_id } = record;
        this.setState({
            showDialog: true,
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
                            // toolbar={<SaveOptionButton />}
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
                                validate={required()}
                                value={description}
                                onChange={this.handleChange}
                            />
                        </SimpleForm>
                    </DialogContent>
                </Dialog>
            </Fragment>
        );
    }
}

export default ItemEditButton;
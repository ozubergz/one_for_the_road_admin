import React from 'react';
import {
    Edit,
    SimpleForm,
    TextInput,
    NumberInput,
    ReferenceInput,
    SelectInput,
} from 'react-admin';
import { Button } from '@material-ui/core';
import AddCircleIcon from '@material-ui/icons/AddCircle';

class ItemEdit extends React.Component {
    
    state = {
        toggleForm: false
    }

    handleToggle = e => {
        this.setState({ toggleForm: !this.state.toggleForm})
    }

    render() {
        console.log(this.state.toggleForm)
        return (
            <Edit {...this.props}>
                <SimpleForm>
                    <TextInput disabled source="id" />
                    <TextInput source="name" />
                    <TextInput source="description" />
                    <NumberInput source="price" step={1} format={price => price.toFixed(2)} />
                    <ReferenceInput source="category_id" reference="categories">
                        <SelectInput optionText="name" />
                    </ReferenceInput>
                    <Button
                        variant="contained"
                        color="secondary"
                        onClick={this.handleToggle}
                        startIcon={<AddCircleIcon />}
                    >
                        Add Options
                    </Button>
                </SimpleForm>
            </Edit>
        )
    }
}

export default ItemEdit;

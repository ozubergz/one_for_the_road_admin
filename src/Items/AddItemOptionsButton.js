import React from 'react';
import { Button } from 'react-admin';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import { Link } from 'react-router-dom';

const AddItemOptionsButton = ({classes, record}) => (
    <Button
        component={Link}
        to={{
            pathname: "/item_options/create",
            search: `?item_id=${record.id}`
        }}
        label="Add Item Options"
    >
        <AddCircleIcon />
    </Button>
)

export default AddItemOptionsButton;
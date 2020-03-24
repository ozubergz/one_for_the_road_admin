import React from 'react';
import { Button } from 'react-admin';
import AddCircleIcon from '@material-ui/icons/AddCircle';

const AddItemOptionsButton = ({classes, record}) => (
    <Button
        
        label="Add Item Options"
    >
        <AddCircleIcon />
    </Button>
)

export default AddItemOptionsButton;
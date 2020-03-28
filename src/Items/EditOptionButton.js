import React from 'react';
import { 
    Button
 } from 'react-admin';
 import EditIcon from '@material-ui/icons/Edit';
 import { Link } from 'react-router-dom';
 

const EditOptionButton = ({record}) => (
    <Button
        component={Link}
        to={`/item_options/${record.id}`}
        startIcon={ <EditIcon />}
        label="ra.action.edit"
    >
    </Button>
)

export default EditOptionButton;
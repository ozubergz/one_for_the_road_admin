import React from 'react';
import { 
    Button,
 } from 'react-admin';
 import ShowIcon from '@material-ui/icons/Visibility';
 import { Link } from 'react-router-dom';
 
const ItemShowButton = ({record}) => (
    <Button
        component={Link}
        to={`/items/${record.id}/show`}
        startIcon={ <ShowIcon />}
        label="ra.action.show"
    >
    </Button>
)

export default ItemShowButton;





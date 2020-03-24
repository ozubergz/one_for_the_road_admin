import React from 'react';
import { Button } from 'react-admin';
import VisibilityIcon from '@material-ui/icons/Visibility';
import { Link } from 'react-router-dom';

const ShowButton = ({record}) => {
    return (
        <Button 
            component={Link}
            to={`/item_options/${record.id}/show`}
        >
            <VisibilityIcon/>
        </Button>
    )
}

export default ShowButton;
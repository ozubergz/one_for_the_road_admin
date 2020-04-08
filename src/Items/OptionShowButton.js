import React from 'react';
import { Button } from 'react-admin';
import VisibilityIcon from '@material-ui/icons/Visibility';
import { Link } from 'react-router-dom';

const OptionShowButton = ({record}) => {
    return (
        <Button 
            component={Link}
            to={`/item_options/${record.id}/show`}
            startIcon={<VisibilityIcon/>}
            label="ra.action.show"
        >
        </Button>
    )
}

export default OptionShowButton;
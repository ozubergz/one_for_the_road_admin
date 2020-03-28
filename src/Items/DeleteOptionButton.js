import React from 'react';
import { 
    Button,
    useNotify,
    useRefresh,
    useMutation
 } from 'react-admin';
import DeleteIcon from '@material-ui/icons/Delete';
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles({
    button: {
        color: 'red',
        // This is JSS syntax to target a deeper element using css selector, here the svg icon for this button
        '& svg': { color: 'red' }
    },
});


const DeleteOptionButton = ({record}) => {
    const classes = useStyles();
    const notify = useNotify();
    const refresh = useRefresh();
    
    const [deleteOne, { loading }] = useMutation(
        {
            type: 'delete',
            resource: "item_options",
            payload: { id: record.id }
        },
        {
            onSuccess: ({ data }) => {
                notify('ra.notification.deleted', 'info', {
                    smart_count:1
                });
                refresh();
            },

            onFailure: (error) => notify(error.message, 'warning')
        }
        
    );
    
    return (
        <Button
            startIcon={<DeleteIcon/>}
            label="ra.action.delete"
            className={classes.button}
            onClick={deleteOne}
            disabled={loading}
        >
        </Button>
    );
}

export default DeleteOptionButton;
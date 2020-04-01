import React from 'react';
import { 
    Button,
    useNotify,
    useRefresh,
    useMutation
 } from 'react-admin';
 import ShowIcon from '@material-ui/icons/Visibility';
 import EditIcon from '@material-ui/icons/Edit';
 import DeleteIcon from '@material-ui/icons/Delete';
 import { makeStyles } from '@material-ui/core/styles';
 import { Link } from 'react-router-dom';
 
export const ItemShowButton = ({record}) => (
    <Button
        component={Link}
        to={`/items/${record.id}/show`}
        startIcon={ <ShowIcon />}
        label="ra.action.show"
    >
    </Button>
)

export const ItemEditButton = ({record}) => (
    <Button
        component={Link}
        to={`/items/${record.id}`}
        startIcon={ <EditIcon />}
        label="ra.action.edit"
    >
    </Button>
)

const useStyles = makeStyles({
    button: {
        color: 'red',
        // This is JSS syntax to target a deeper element using css selector, here the svg icon for this button
        '& svg': { color: 'red' }
    },
});

export const ItemDeleteButton = ({record}) => {
    const classes = useStyles();
    const notify = useNotify();
    const refresh = useRefresh();
    const [deleteOne, { loading }] = useMutation(
        {
            type: 'delete',
            resource: "items",
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




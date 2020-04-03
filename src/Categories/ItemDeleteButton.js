import React, { Fragment, useState } from 'react';
import { 
    Button,
    useNotify,
    useRefresh,
    useMutation
 } from 'react-admin';
import DeleteIcon from '@material-ui/icons/Delete';
// import { red } from '@material-ui/core/colors';
 import { makeStyles } from '@material-ui/core/styles';
 import Dialog from '@material-ui/core/Dialog';
//  import DialogContent from '@material-ui/core/DialogContent';
 import DialogActions from '@material-ui/core/DialogActions';
 import DialogTitle from '@material-ui/core/DialogTitle';


const useStyles = makeStyles({
    button: {
        color: 'red',
        // This is JSS syntax to target a deeper element using css selector, here the svg icon for this button
        '& svg': { color: 'red' }
    },
});

const DeleteButton = ({record}) => {
    // const classes = useStyles();
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
                notify('ra.notification.deleted', 'info', {smart_count: 1});
                refresh();
            },
            onFailure: (error) => notify(`Error: ${error.message}`, 'warning')
        }
    );

    return (
        <Button
            label="yes"
            color="secondary"
            onClick={deleteOne}
            disabled={loading}
            style={{color: 'red'}}
        />
    );
}

const ItemDeleteButton = (props) => {
    const [showDialog, setShowDialog] = useState(false);
        const classes = useStyles();

    
    const handleShowClick = () => {
        setShowDialog(true);
    }

    const handleCloseClick = () => {
        setShowDialog(false);
    }
    
    return (
        <Fragment>
            <Button 
                startIcon={<DeleteIcon />}
                label="delete"
                onClick={handleShowClick}
                className={classes.button}
            />
            <Dialog open={showDialog} onClose={handleCloseClick}>
                <DialogTitle>Do you want to delete item?</DialogTitle>
                <DialogActions>
                    <DeleteButton {...props} />
                    <Button label="no" onClick={handleCloseClick} />
                </DialogActions>
            </Dialog>
        </Fragment>
    )
}



export default ItemDeleteButton;
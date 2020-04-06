import React from 'react';
import { 
    Button,
    useNotify,
    useMutation
 } from 'react-admin';
import DeleteIcon from '@material-ui/icons/Delete';

const DeleteButton = ({record}) => {
    const notify = useNotify();
    const [deleteOne, { loading }] = useMutation(
        {
            type: 'delete',
            resource: "items",
            payload: { id: record.id }
        },
        {
            undoable: true,
            onSuccess: ({ data }) => {
                notify('ra.notification.deleted', 'info', {smart_count: 1}, true);
            },
            onFailure: (error) => notify(`Error: ${error.message}`, 'warning')
        }
    );
    return (
        <Button
            startIcon={<DeleteIcon />}
            label="delete"
            color="secondary"
            onClick={deleteOne}
            disabled={loading}
            style={{color: 'red'}}
        />
    );
}

export default DeleteButton;
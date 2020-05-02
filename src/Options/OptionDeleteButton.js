import React from 'react';
import { 
    Button,
    useNotify,
    useMutation,
    useRefresh
 } from 'react-admin';
import DeleteIcon from '@material-ui/icons/Delete';

const OptionDeleteButton = ({optionId}) => {
    const notify = useNotify();
    const refresh = useRefresh();

    const [deleteOne, { loading }] = useMutation(
        {
            type: 'delete',
            resource: "options",
            payload: { id: optionId }
        },
        {
            // undoable: true,
            onSuccess: ({ data }) => {
                notify('ra.notification.deleted', 'info', {smart_count: 1});
                refresh();
            },
            onFailure: (error) => notify(`Error: ${error.message}`, 'warning')
        }
    );

    return (
        <Button
            label="delete"
            color="secondary"
            onClick={deleteOne}
            disabled={loading}
            style={{color: 'red'}}
        ><DeleteIcon /></Button>
    );
}

export default OptionDeleteButton;
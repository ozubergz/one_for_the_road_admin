import React from 'react';
import {
    useMutation,
    useNotify,
    useRefresh,
    SaveButton
} from 'react-admin'

export const UpdateButton = props => {
    const [mutate, { loading }] = useMutation();
    const notify = useNotify();
    const refresh = useRefresh();

    const handleSave = (values) => {
        const { id, name } = values;
        mutate(
            {   
                type: "update",
                resource: "item_options",
                payload: { id,  data: { name } }
            },
            {
                onSuccess: ({ data }) => {
                    notify('ra.notification.updated', 'info', {smart_count: 1});
                    refresh();
                },
                onFailure: (error) => notify(`Error ${error.message}`, 'warning')
            }
        );
    }
    return <SaveButton {...props} disabled={loading} onSave={handleSave} />
 }


export const CreateButton = props => {
    const [mutate, { loading }] = useMutation();
    const notify = useNotify();
    const refresh = useRefresh();

    const handleSave = (values) => {
        mutate(
            {   
                type: "create",
                resource: "item_options",
                payload: { data: {...values} }
            },
            {
                onSuccess: ({ data }) => {
                    notify('ra.notification.created', 'info', {smart_count: 1});
                    refresh();
                },
                onFailure: (error) => notify(`Error ${error.message}`, 'warning')
            }
        );
    }
    return <SaveButton {...props} disabled={loading} onSave={handleSave} />
 }


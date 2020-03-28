import React, { useCallback } from 'react';
import { 
    SaveButton,
    useRedirect,
    useCreate,
    useNotify,
 } from 'react-admin';
 import { v4 as uuidv4 } from 'uuid';

 const SaveOptionButton = props => {

    const [create] = useCreate('item_options');
    const redirectTo = useRedirect();
    const notify = useNotify();
    const { basePath } = props;

    const handleSave = useCallback(
        (values, redirect) => {
            values.options.map(option => option.id = uuidv4());
            create(
                {
                    payload: { data: { ...values } },
                },
                {
                    onSuccess: ({ data: newRecord }) => {
                        notify('ra.notification.created', 'info', {
                            smart_count: 1,
                        });
                        redirectTo(redirect, basePath, newRecord.id, newRecord);
                    },
                    onFailure: (error) => notify(error.message, 'warning'),
                }
            );
        },
        [create, notify, redirectTo, basePath]
    );
    return <SaveButton {...props} onSave={handleSave} />
 }

 export default SaveOptionButton;
 
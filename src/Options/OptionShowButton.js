import React, { Fragment, useState } from 'react';
import { 
    // Show,
    // NumberField,
    // Datagrid,
    // TextField,
    // ArrayField,
    // ReferenceField,
    // TabbedShowLayout,
    // Tab,
    Button,
    ArrayField,
    Datagrid,
    TextField,
    NumberField,
    Show
} from 'react-admin';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import { DialogContent } from '@material-ui/core';
// import DialogContent from '@material-ui/core/DialogContent';
// import DialogActions from '@material-ui/core/DialogActions';

// import CreateButton from './OptionCreateButton';
// import DeleteButton from './OptionDeleteButton';
// import EditButton from './OptionEditButton';

const OptionShow = props => {
    const  { record } = props;
    const [showDialog, setShowDialog] = useState(false);
    
    const handleShowClick = () => {
        setShowDialog(true);
    }

    const handleHideClick = () => {
        setShowDialog(false);
    }

    return (
        <Fragment>
            <Button
                onClick={handleShowClick}
                label="show options"
            >
            </Button>
            <Dialog
                fullWidth
                open={showDialog}
                onClose={handleHideClick}
            >
                <DialogTitle>{record.name}</DialogTitle>
                <DialogContent>
                    
                    {console.log(record)}

                    <ArrayField source={record.options} sortable={false}>
                        <Datagrid>
                            <TextField source="id" sortable={false} />
                            <TextField source="name" sortable={false} />
                            <TextField source="input_type" sortable={false} />
                            <NumberField 
                                source="price" 
                                sortable={false} 
                                options={{ style: "currency", currency: "USD" }}
                                />

                            {/* <OptionEditButton /> */}
                            {/* <OptionDeleteButton /> */}
                        </Datagrid>
                    </ArrayField>

                </DialogContent>
            </Dialog>
        </Fragment>
    )
    
    // <Show {...props}>
    //     <TabbedShowLayout>
    //         <Tab label="info">
    //             <TextField source="id" />
    //             <TextField source="name" />
    //             <TextField source="required" />
    //             <ReferenceField source="item_id" reference="items" link="show">
    //                 <TextField source="name" />
    //             </ReferenceField>
    //         </Tab>
    //         <Tab label="options">
    //             <ArrayField source="options">
    //                 <Datagrid>
    //                     <TextField source="id" sortable={false} />
    //                     <TextField source="name" sortable={false} />
    //                     <NumberField 
    //                         source="price" 
    //                         sortable={false}
    //                         options={{ style: 'currency', currency: 'USD' }}
    //                     />
    //                     <TextField source="input_type" sortable={false} />
    //                     <EditButton />
    //                     <DeleteButton />
    //                 </Datagrid>
    //             </ArrayField>
    //             <CreateButton />
    //         </Tab>
    //     </TabbedShowLayout>
    // </Show>
};

  export default OptionShow;
import React from 'react';
import {
    Show,
    Datagrid,
    NumberField,
    TextField,
    ArrayField,
    ReferenceField,
    // ReferenceManyField,
    TabbedShowLayout,
    Tab,
} from 'react-admin';

import CreateButton from './GroupOptionCreateButton';
import DeleteButton from './GroupOptionDeleteButton';
import EditButton from './GroupOptionEditButton';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

// import OptionCreateButton from '../Options/OptionCreateButton';
// import OptionDeleteButton from '../Options/OptionDeleteButton';
// import OptionEditButton from '../Options/OptionEditButton';
// import OptionShowButton from '../Options/OptionShowButton';

const Description = props => {
    const description = props.record.description;
    return <span>{description ? description : null}</span>
}
Description.defaultProps = {
    label: "Description",
    addLabel: true
}

const ShowOption = ({ record }) => (
    <TableContainer component={Paper}>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="right">Id</TableCell>
            <TableCell align="right">Name</TableCell>
            <TableCell align="right">Input Type</TableCell>
            <TableCell align="right">Price</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {record.options.map((option) => (
            <TableRow key={option.id}>
                <TableCell align="right">{option.id}</TableCell>
                <TableCell align="right">{option.name}</TableCell>
                <TableCell align="right">{option.input_type}</TableCell>
                <TableCell align="right">{option.price ? `$${option.price.toFixed(2)}` : "$0.00"}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
)

const ItemShow = props => (
    <Show {...props} >
        <TabbedShowLayout>
            <Tab label="Info">
                <TextField source="name" />
                <NumberField 
                    source="price"
                    options={{style: "currency", currency: "USD"}}
                />
                <Description source="description" />
            </Tab>
            <Tab label="Menu Category">
                <ReferenceField
                    link="show"
                    source="category_id"
                    reference="categories"
                >
                    <TextField source="name" />
                </ReferenceField>
            </Tab>
            <Tab label="Group Options">
                <ArrayField source="group_options" label="Group of Options">
                    <Datagrid expand={ShowOption}>
                        <TextField source="id" sortable={false} />
                        <TextField label="Title" source="name" sortable={false} />
                        <TextField source="required" sortable={false} />
                        
                        {/* <ArrayField source="options" sortable={false}>
                            <Datagrid>
                                <TextField source="id" sortable={false} />
                                <TextField source="name" sortable={false} />
                                <TextField source="input_type" sortable={false} />
                                <NumberField 
                                    source="price" 
                                    sortable={false} 
                                    options={{ style: "currency", currency: "USD" }}
                                />

                                <OptionEditButton />
                                <OptionDeleteButton />
                            </Datagrid>
                        </ArrayField> */}
                        
                        {/* <OptionCreateButton /> */}
                        
                        <EditButton />
                        <DeleteButton />

                    </Datagrid>
                </ArrayField>

                <CreateButton/>
            </Tab>
        </TabbedShowLayout>
    </Show>
);

export default ItemShow
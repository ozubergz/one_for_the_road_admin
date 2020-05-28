import React from 'react';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

import OptionCreateButton from './OptionCreateButton';
import OptionDeleteButton from './OptionDeleteButton';
import OptionEditButton from './OptionEditButton';

const OptionShowButton = (props) => (
    <TableContainer  component={Paper}>
        <Table className="expand-table" aria-label="simple table">
            <TableHead>
                <TableRow>
                    <TableCell>Id</TableCell>
                    <TableCell>Name</TableCell>
                    <TableCell>Input Type</TableCell>
                    <TableCell>Price</TableCell>
                    <TableCell></TableCell>
                    <TableCell></TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {props.record.options.map((option) => (
                    <TableRow key={option.id}>
                        <TableCell>{option.id}</TableCell>
                        <TableCell>{option.name}</TableCell>
                        <TableCell>{option.input_type}</TableCell>
                        <TableCell>{option.price ? `$${option.price.toFixed(2)}` : "$0.00"}</TableCell>

                        <TableCell>
                            <OptionEditButton option={option} />
                        </TableCell>
                        <TableCell>
                            <OptionDeleteButton optionId={option.id} />
                        </TableCell>

                    </TableRow>
                ))}
            </TableBody>
        <OptionCreateButton {...props} />
        </Table>
    </TableContainer>
);

export default OptionShowButton;
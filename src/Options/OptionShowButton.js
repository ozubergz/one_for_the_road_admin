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
    <TableContainer component={Paper}>
        <Table aria-label="simple table">
            <TableHead>
                <TableRow>
                    <TableCell align="right">Id</TableCell>
                    <TableCell align="right">Name</TableCell>
                    <TableCell align="right">Input Type</TableCell>
                    <TableCell align="right">Price</TableCell>
                    <TableCell align="right"></TableCell>
                    <TableCell align="right"></TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {props.record.options.map((option) => (
                    <TableRow key={option.id}>
                        <TableCell align="right">{option.id}</TableCell>
                        <TableCell align="right">{option.name}</TableCell>
                        <TableCell align="right">{option.input_type}</TableCell>
                        <TableCell align="right">{option.price ? `$${option.price.toFixed(2)}` : "$0.00"}</TableCell>

                        <TableCell align="right">
                            <OptionEditButton option={option} />
                        </TableCell>
                        <TableCell align="right">
                            <OptionDeleteButton optionId={option.id} />
                        </TableCell>

                    </TableRow>
                ))}
            </TableBody>
        </Table>
        <OptionCreateButton {...props} />
    </TableContainer>
);

export default OptionShowButton;
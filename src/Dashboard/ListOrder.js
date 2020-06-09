import React, { useState } from 'react';
import OrderContainer from "./OrderContainer";
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListSubheader from '@material-ui/core/ListSubheader';
import NativeSelect from '@material-ui/core/NativeSelect';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import FormControlLabel from '@material-ui/core/FormControlLabel';


import Checkbox from '@material-ui/core/Checkbox';


const ListOrder = (props) => {
    const [checked, setChecked] = useState([])
    // const [selectAll, setSelectAll] = useState(false)
    const { 
        heading, 
        orders, 
        listType, 
        handleSort, 
        handleChange,
    } = props;

    const renderSelectInput = () => (
        <ListSubheader className="list-subheader">
            <div className="list-header">
                {heading}
            </div>
            <FormControl className="list-sort">
                <InputLabel className="native-simple-label" htmlFor="sort-native-simple">Sort by</InputLabel>
                <NativeSelect
                    onChange={(e) => handleSort(e, listType)}
                    disableUnderline={true}
                    id="sort-native-simple"
                >
                    <option aria-label="None" value="" />
                    <option value={"customer"}>Name</option>
                    <option value={"email"}>Email</option>
                    <option value={"created_at"}>Date</option>
                </NativeSelect>
            </FormControl>
        </ListSubheader>
    )

    const handleCheckBox = (value) => {
        const currentIndex = checked.indexOf(value)
        const newChecked = [...checked];

        if(currentIndex === -1) {
            newChecked.push(value)
        } else {
            newChecked.splice(currentIndex, 1)
        }
        
        setChecked(newChecked);
    }

    const handleSelectAll = (e) => {
        const selected = e.target.checked;
        const allOrders = orders.map(order => order.id)
        const allChecked = selected ? allOrders : []

        setChecked(allChecked)
    }

    return(
        <List 
            className="list"
            subheader={renderSelectInput()}
        >
            {/* {console.log(checked)} */}

            <ListItem className="list-actions" >
                <FormControlLabel
                    control={
                        <Checkbox
                            // checked={selectAll}
                            onChange={handleSelectAll}
                            size="small"
                        />
                    }
                    label={<span style={{ fontSize: '0.9rem' }}>Select All</span>}
                />
                <IconButton aria-label="Delete">
                    <DeleteIcon fontSize="small" />
                </IconButton>
            </ListItem>

            <OrderContainer 
                orders={orders} 
                handleChange={handleChange} 
                handleCheckBox={handleCheckBox}
                checked={checked}
            />
        </List>
    )
}

export default ListOrder;
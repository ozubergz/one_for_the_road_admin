import React from 'react';
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
    const { 
        heading, 
        orders, 
        listType, 
        handleSort, 
        handleChange,
        handleCheckBox
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

    return(
        <List 
            className="list"
            subheader={renderSelectInput()}
        >
            <ListItem className="list-actions" >
                <FormControlLabel
                    control={
                        <Checkbox
                            // checked={state.checkedB}
                            // onChange={handleChange}
                            // color="secondary"
                            size="small"
                        />
                    }
                    className="select-all"
                    label="Select All"
                    fontSize="6"
                />
                
                <IconButton aria-label="Delete">
                    <DeleteIcon fontSize="small" />
                </IconButton>

            </ListItem>

            <OrderContainer 
                orders={orders} 
                handleChange={handleChange} 
                handleCheckBox={handleCheckBox}
            />
        </List>
    )
}

export default ListOrder;
import React from 'react';
import OrderContainer from "./OrderContainer";
import List from '@material-ui/core/List';
import ListSubheader from '@material-ui/core/ListSubheader';
import NativeSelect from '@material-ui/core/NativeSelect';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';



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
            <FormControl className="list-actions">
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
            <OrderContainer 
                orders={orders} 
                handleChange={handleChange} 
                handleCheckBox={handleCheckBox}
            />
        </List>
    )
}

export default ListOrder;
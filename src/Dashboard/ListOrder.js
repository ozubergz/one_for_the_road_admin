import React from 'react';
import OrderContainer from "./OrderContainer";

//Material UI
import List from '@material-ui/core/List';
import ListSubheader from '@material-ui/core/ListSubheader';

const ListOrder = (props) => {
    const { heading, orders, handleChange } = props;

    return(
        <List 
            className="list"
            subheader={<ListSubheader className="list-subheader">
                <div className="list-header">
                    {heading}
                </div>
                {/* {selectInput("pending")} */}
                </ListSubheader>}
        >
            <OrderContainer orders={orders} handleChange={handleChange} />
        </List>
    )
}

export default ListOrder;
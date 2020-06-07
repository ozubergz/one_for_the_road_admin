import React from 'react';
import OrderContainer from "./OrderContainer";

//Material UI
import List from '@material-ui/core/List';
import ListSubheader from '@material-ui/core/ListSubheader';

const ListOrder = (props) => {
    const { heading, orders } = props;

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
            <OrderContainer orders={orders} />
            {/* {renderListItems(pendingList)} */}
        </List>
    )
}

export default ListOrder;

// const renderListItems = (orders) => {
//     return ( 
//         orders.map(order => {
//             const date = moment(order.created_at)
//             const formatDate = date.format('MMMM Do YYYY');
//             const time = date.format('h:mm:ss a');

//             return (
                
//             )
//         })
//     )
// }
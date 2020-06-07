import React from "react";
import Order from "./Order";
import moment from 'moment';

const OrderContainer = (props) => {
    const { orders } = props;

    return orders.map(order => {
        const { id, customer, email, items} = order;
        const date = moment(order.created_at)
        const formatDate = date.format('MMMM Do YYYY');
        const time = date.format('h:mm:ss a');
        
        return (
            <Order 
                key={id}
                id={id}
                customer={customer}
                email={email}
                items={items} 
                date={formatDate} 
                time={time} 
            />
        )
        
    });
}

export default OrderContainer;
import React from "react";
import Order from "./Order";
import moment from 'moment';

const OrderContainer = (props) => {
    const { orders, handleChange, handleCheckBox, checked } = props;

    return orders.map(order => {

        const { 
            id, 
            customer, 
            items, 
            pending, 
            created_at 
        } = order;

        const date = moment(created_at)
        const formatDate = date.format('MMMM Do YYYY');
        const time = date.format('h:mm:ss a');
        
        return (
            <Order 
                key={id}
                id={id}
                customer={customer}
                items={items} 
                date={formatDate} 
                time={time}
                pending={pending}
                handleChange={handleChange}
                handleCheckBox={handleCheckBox}
                checked={checked}
            />
        )
        
    });
}

export default OrderContainer;
import React, { useState, useEffect } from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListSubheader from '@material-ui/core/ListSubheader';
import Button from '@material-ui/core/Button';
import moment from 'moment';

const ROOT_URL = "http://localhost:3000/api/"

const Dashboard = () => {

    const [pending, setPending] = useState([]);
    const [complete, setComplete] = useState([]);
    const refs = {};

    useEffect(() => {
        fetch(`${ROOT_URL}orders`)
        .then(res => res.json())
        .then(data => {
            //this check if there's an error server
            if(data.error) {
                console.error('Error:', data.error)
            } else {
                //this filters orders that are pending
                const pendingOrders = data.filter(order => order.pending);
                //this filters orders that are not pending
                const completeOrders = data.filter(order => !order.pending);
                //this seperate lists between complete and pending orders
                setPending(pendingOrders);
                setComplete(completeOrders);
            }
        });
    }, []);

    //toggle handler to toggle display order items 
    const handleToggle = ({id}) => {
        const element = refs[id];
        const { display } = element.style;

        //target parent of parent
        const topParent = element.parentNode.parentNode;

        //target second button in button group
        const button = topParent.querySelector('#second-btn');

        button.innerHTML = (display === 'none') ? `Orders <i class="fa fa-angle-up"></i>` : `Orders <i class="fa fa-angle-down"></i>`

        element.style.display = (display === 'none') ? 'block' : 'none';        
    }

    //callback fucnttion setting refs(object) as element ids with element
    const setRefs = (element) => {
        if(element) refs[element.id] = element;
    }

    //update pending orders to false
    const addToCompleteList = (order) => {
        // fetch(`${ROOT_URL}orders/${order.id}`, {
        //     method: 'PATCH',
        //     headers: {
        //         'Content-Type': 'application/json'
        //     },
        //     body: JSON.stringify({pending: false})
        // })
        // .then(res => res.json())
        // .then(newData => {
        //     const newPendingOrders = pending.filter(order => order.id !== newData.id);
            
        //     setPending(newPendingOrders);
        //     setComplete([newData, ...complete])
        // });
    }

    const renderListItems = (orders) => {
        return ( 
            orders.map(order => {
                const date = moment(order.created_at)
                const formatDate = date.format('MMMM Do YYYY');
                const time = date.format('h:mm:ss a');

                return (
                    <ListItem key={order.id} className="list-item">
                        <div className="list-item-body">
                            <ul>
                                <li>{order.customer}</li>
                                <li>email: {order.email}</li>
                                <li>date: {formatDate}</li>
                                <li>time: {time}</li>
                                
                            </ul>
                            <div className="collapse" id={order.id} style={{display: 'none'}} ref={setRefs} >
                                <Divider className="divider" />
                                <ol>
                                    {order.items.map(({id, name, select_options}, i) => { 
                                       return <li key={i}>
                                            {name}                                                    
                                            {select_options ?
                                                select_options.map(option => {
                                                    return <span 
                                                        className="select-option-li"
                                                        style={{display: 'block'}} 
                                                        key={option.id}>- {option.name}</span>
                                                }) 
                                                    : 
                                                null
                                            }
                                        </li> 
                                    })}
                                </ol>
                            </div>                            
                        </div>

                        <div className="btn-group">
                            <Button
                                onClick={() => addToCompleteList(order)}
                                size="small"
                                variant="contained"
                                color="secondary"
                            >
                                Pending..
                            </Button>
                            <Button
                                id="second-btn"
                                size="small"
                                varaiant="contained"
                                onClick={() => handleToggle(order)}
                            >
                                Orders <i class="fa fa-angle-down"></i>
                            </Button>
                        </div>                        
                    </ListItem>
                )
            })
        )
    }

    
    return (
        <div>
            <h1>One for the Road Admin</h1>
            <div className="list-group">
                <List 
                    className="list" 
                    subheader={<ListSubheader>Pending Orders</ListSubheader>}
                >
                    {renderListItems(pending)}
                </List>
                <List
                    className="list"
                    subheader={<ListSubheader>Complete Orders</ListSubheader>}
                >
                    {renderListItems(complete)}
                </List>
            </div>
        </div>
    );
}

export default Dashboard;
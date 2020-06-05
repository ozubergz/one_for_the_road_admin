import React, { useState, useEffect } from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListSubheader from '@material-ui/core/ListSubheader';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';
import Select from '@material-ui/core/Select';
import moment from 'moment';
import NativeSelect from '@material-ui/core/NativeSelect';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';


const ROOT_URL = "http://localhost:3000/api/"

const Dashboard = () => {

    const [pendingList, setPendingList] = useState([]);
    const [completeList, setCompleteList] = useState([]);
    // const [value, setValue] = useState(true);
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
                setPendingList(pendingOrders);
                setCompleteList(completeOrders);
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

    //this toggles if orders is completed or pending
    const handleChange = (e, id) => {
        //update pending and complete orders
        fetch(`${ROOT_URL}orders/${id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({pending: e.target.value})
        })
        .then(res => res.json())
        .then(newData => {
            const { pending } = newData;
            
            if(!pending) {
                //remove non pending orders and add them to complete list
                const newPendingOrders = pendingList.filter(order => order.id !== newData.id);
                setPendingList(newPendingOrders)
                setCompleteList([newData, ...completeList])
            } else if(pending) {
                const newCompleteOrders = completeList.filter(order => order.id !== newData.id);
                setCompleteList(newCompleteOrders)
                setPendingList([newData, ...pendingList])
            }
        });
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
                            <Select
                                native
                                value={order.pending}
                                onChange={(e) => handleChange(e, order.id)}
                                className="select-input"
                                disableUnderline={true}
                                style={{backgroundColor: order.pending ? "#d9455f" : "#a8df65"}}
                            >
                                <option value={true}>Waiting...</option>
                                <option value={false}>Complete</option>
                            </Select>
                            <Button
                                id="second-btn"
                                size="small"
                                varaiant="contained"
                                onClick={() => handleToggle(order)}
                            >
                                Orders <i className="fa fa-angle-down"></i>
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
                    subheader={<ListSubheader className="list-subheader">
                        <div className="list-header">
                            Pending Orders
                        </div>
                         <FormControl className="list-actions">
                            <InputLabel className="native-simple-label" htmlFor="sort-native-simple">Sort by</InputLabel>
                            <NativeSelect
                                disableUnderline={true}
                                id="sort-native-simple"
                            >
                                <option aria-label="None" value="" />
                                <option value={10}>Ten</option>
                                <option value={20}>Twenty</option>
                                <option value={30}>Thirty</option>
                            </NativeSelect>
                        </FormControl>
                        
                        </ListSubheader>}
                >
                   

                    {renderListItems(pendingList)}
                </List>
                <List
                    className="list"
                    subheader={<ListSubheader>Complete Orders</ListSubheader>}
                >
                    {renderListItems(completeList)}
                </List>
            </div>
        </div>
    );
}

export default Dashboard;
import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import Collapse from '@material-ui/core/Collapse';
import Divider from '@material-ui/core/Divider';

import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';

import Button from '@material-ui/core/Button';
import moment from 'moment';

// import Typography from '@material-ui/core/Typography';

// import Divider from '@material-ui/core/Divider';
// import ListItemAvatar from '@material-ui/core/ListItemAvatar';
// import Avatar from '@material-ui/core/Avatar';

// import Dialog from '@material-ui/core/Dialog';
// import DialogTitle from '@material-ui/core/DialogTitle';
// import DialogContent from '@material-ui/core/DialogContent';
// import DialogActions from '@material-ui/core/DialogActions';

// import Modal from '@material-ui/core/Modal';
// import EditIcon from '@material-ui/icons/Edit';


const ROOT_URL = "http://localhost:3000/api/"

const useStyles = makeStyles((theme) => ({
    root: {
      width: '100%',
      maxWidth: '36ch',
      backgroundColor: theme.palette.background.paper,
    //   backgroundColor: '#3f3f44',
    //   borderRadius: '10px'
    }
    // inline: {
    //     display: 'inline'
    // }
}));


const Dashboard = () => {

    const classes = useStyles();
    const [pending, setPending] = useState([]);
    const [complete, setComplete] = useState([]);
    const refs = {};
    // const [open, setOpen] = useState(false);
    // const [id, setId] = useState(null);
    // const [items, setItems] =useState([])

    useEffect(() => {
        fetch(`${ROOT_URL}orders`)
        .then(res => res.json())
        .then(data => {

            //check if there's an error server
            if(data.error) {
                console.error('Error:', data.error)
            } else {
                
                const pendingOrders = data.filter(order => order.pending);
                const completeOrders = data.filter(order => !order.pending);
                
                setPending(pendingOrders);
                setComplete(completeOrders);
            }
        });
    }, []);

    //toggle handler to toggle display order items 
    const handleToggle = ({id}) => {
        const element = refs[id];
        const { display } = element.style;
        element.style.display = display === 'none' ? 'block' : 'none';        
    }

    //callback fucnttion setting refs(object) as element ids with element
    const setRefs = (element) => {
        if(element) refs[element.id] = element;
    }

    //update orders to complete
    const addToCompleteList = (order) => {
        fetch(`${ROOT_URL}orders/${order.id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({pending: false})
        })
        .then(res => res.json())
        .then(newData => {
            const newPendingOrders = pending.filter(order => order.id !== newData.id);
            
            setPending(newPendingOrders);
            setComplete([newData, ...complete])
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
                            {/* <div style={{display: open && id === order.id ? 'block' : "none"}}> */}
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
                                            }) : null}
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
                                onClick={() => handleToggle(order)}
                                // style={{backgroundColor: 'none'}}
                            >
                                {/* <ListItemText primary="Orders" /> */}
                                Orders
                                {/* {open && id === order.id ? <ExpandLess /> : <ExpandMore />} */}
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
                    className={classes.root} 
                    subheader={<ListSubheader>Pending Orders</ListSubheader>}
                >
                    {renderListItems(pending)}
                </List>
                <List
                    className={classes.root}
                    subheader={<ListSubheader>Complete Orders</ListSubheader>}
                >
                    {renderListItems(complete)}
                </List>
            </div>

            {/* <Dialog
                fullWidth
                open={open}
                onClose={handleClose}
            >
                <DialogTitle>Items</DialogTitle>
                <DialogContent>
                    <ol>
                        {currItems.map(item => {
                            return (
                                <li key={item.id}>
                                    <span>{item.name}</span>
                                    <ul>
                                        {item.select_options.map(option => {
                                            return <li key={option.id}>{option.name}</li>
                                        })}
                                    </ul>
                                </li>
                            )
                        })}
                    </ol>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} >
                        Close
                    </Button>
                </DialogActions>
            </Dialog> */}
        </div>
    );
}

export default Dashboard;
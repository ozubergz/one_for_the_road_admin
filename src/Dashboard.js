import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
// import Typography from '@material-ui/core/Typography';
// import ListItemText from '@material-ui/core/ListItemText';

// import Divider from '@material-ui/core/Divider';
// import ListItemAvatar from '@material-ui/core/ListItemAvatar';
// import Avatar from '@material-ui/core/Avatar';

import ListSubheader from '@material-ui/core/ListSubheader';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import moment from 'moment';

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
    const [orders, setOrders] = useState([]);
    // const [open, setOpen] = useState(false);
    // const [currItems, setCurrItems] = useState([]);
    
    useEffect(() => {
        fetch(`${ROOT_URL}orders`)
        .then(res => res.json())
        .then(data => {
            setOrders(data)
        })
    }, []);

    // const handleOpen = (items) => {
    //     setOpen(true);
    //     setCurrItems(items)
    // }

    // const handleClose = () => {
    //     setOpen(false);
    // }

    const renderListItems = () => {
        return ( 
            orders.map(order => {
                const date = moment(order.created_at)
                const formatDate = date.format('MMMM Do YYYY');
                const time = date.format('h:mm:ss a');

                return (
                    <ListItem key={order.id} className="list-item">
                        <ul>
                            <li>{order.customer}</li>
                            <li>email: {order.email}</li>
                            <li>date: {formatDate}</li>
                            <li>time: {time}</li>
                        </ul>

                        <div className="btn-group">
                            <Button 
                                // onClick={() => handleOpen(order.items)}
                                size="small"
                                variant="contained" 
                                color="primary"
                                >
                                Orders
                            </Button>
                            <Button
                                size="small"
                                variant="contained"
                                color="secondary"
                            >
                                Pending
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
                    {renderListItems()}
                </List>
                <List
                    className={classes.root}
                    subheader={<ListSubheader>Complete Orders</ListSubheader>}
                >
                    
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
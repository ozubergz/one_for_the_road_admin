import React, { useState, useEffect, Fragment } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
// import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
// import ListItemAvatar from '@material-ui/core/ListItemAvatar';
// import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import ListSubheader from '@material-ui/core/ListSubheader';
import Button from '@material-ui/core/Button';
// import Modal from '@material-ui/core/Modal';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
// import EditIcon from '@material-ui/icons/Edit';
import moment from 'moment'

const ROOT_URL = "http://localhost:3000/api/"

const useStyles = makeStyles((theme) => ({
    root: {
      width: '100%',
      maxWidth: '36ch',
    //   backgroundColor: '#3f3f44',
    //   borderRadius: '10px'
      backgroundColor: theme.palette.background.paper,
    },
    inline: {
        display: 'inline'
    }
}));


const Dashboard = () => {
    const classes = useStyles();
    const [orders, setOrders] = useState([]);
    const [open, setOpen] = useState(false);
    const [currOrder, setCurrOrder] = useState({});
    
    useEffect(() => {
        fetch(`${ROOT_URL}orders`)
        .then(res => res.json())
        .then(data => {
            setOrders(data)
        })
    }, []);

    const handleOpen = (order) => {
        setOpen(true);
        setCurrOrder(order)
    }

    const handleClose = () => {
        setOpen(false);
    }

    const renderListItems = () => {
        return ( 
            orders.map(order => {
                const date = moment(order.created_at)
                const formatDate = date.format('MMMM Do YYYY');
                const time = date.format('h:mm:ss a');
                
                // console.log(date)
                // const date = new Date(order.created_at);
                // const month = date.getMonth();
                // const day = date.getDate();
                // const year = date.getFullYear();
                // console.log(date)

                return (
                    <ListItem key={order.id}>
                        <ul>
                            <li>{order.customer}</li>
                            <li>email: {order.email}</li>
                            <li>date: {formatDate}</li>
                            <li>time: {time}</li>
                        </ul>
                        
                        <Button 
                            onClick={() => handleOpen(order)}
                            size="small"
                            variant="contained" 
                            color="primary"
                        >
                            Orders
                        </Button>
                    </ListItem>
                )
            })
        )
    }

    
    return (
        <div>
            <h1>One for the Road Admin</h1>            
            <List className={classes.root} subheader={<ListSubheader>Pending Orders</ListSubheader>}>
                {renderListItems()}
            </List>
            <Dialog
                fullWidth
                open={open}
                onClose={handleClose}
            >
                <DialogTitle>Order Items</DialogTitle>
                <DialogContent>
                    {currOrder.customer}
                    
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} >
                        Close
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default Dashboard;
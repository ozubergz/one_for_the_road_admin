import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
// import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
// import ListItemAvatar from '@material-ui/core/ListItemAvatar';
// import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';

const ROOT_URL = "http://localhost:3000/api/"

const useStyles = makeStyles((theme) => ({
    root: {
      width: '100%',
      maxWidth: 360,
      backgroundColor: theme.palette.background.paper,
    },
}));


const Dashboard = () => {
    const classes = useStyles();
    const [orders, setOrders] = useState([]);
    
    useEffect(() => {
        fetch(`${ROOT_URL}orders`)
        .then(res => res.json())
        .then(data => {
            setOrders(data)
        })
    }, []);

    const renderListItems = () => {
        return ( 
            orders.map(order => {
                return (
                    <ListItem key={order.id}>
                        <ListItemText 
                            primary={order.customer}
                            
                        />
                    </ListItem>
                )
            })
        )
    }
    
    return (
        <div>
            <h1>One for the Road Admin</h1>
            
            <List className={classes.root}>
                {renderListItems()}
            </List>

        </div>
    );
}

export default Dashboard;
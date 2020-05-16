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


const ROOT_URL = "http://localhost:3000/api/"

const useStyles = makeStyles((theme) => ({
    root: {
      width: '100%',
      maxWidth: '36ch',
      backgroundColor: theme.palette.background.paper,
    },
    inline: {
        display: 'inline'
    }
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
                            secondary={
                                <Fragment>
                                    <Typography
                                        component="span"
                                        variant="body2"
                                    >
                                        email: {order.email}
                                    </Typography>
                                </Fragment>
                            }
                        />
                        <Button 
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

    // const showOrder = () => {
    //     return (
            
    //     )
    // }
    
    return (
        <div>
            <h1>One for the Road Admin</h1>
            
            <List className={classes.root} subheader={<ListSubheader>Pending Orders</ListSubheader>}>
                {renderListItems()}
            </List>

        </div>
    );
}

export default Dashboard;
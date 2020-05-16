import React, { Component } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
// import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
// import ListItemAvatar from '@material-ui/core/ListItemAvatar';
// import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';

const ROOT_URL = "http://localhost:3000/api/"

class Dashboard extends Component {
    
    state = {
        orders: []
    }
    
    componentDidMount() {
        fetch(`${ROOT_URL}orders`)
        .then(res => res.json())
        .then(orders => {
            this.setState({ orders })
        })
    }

    renderListItems() {
        return ( 
            this.state.orders.map(order => {
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
    
    render() {
        return (
            <div>
                <h1>One for the Road Admin</h1>
                
                <List>
                    {this.renderListItems()}
                </List>

            </div>
        );
    }
}

export default Dashboard;
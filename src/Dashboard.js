import React, { Component } from 'react';

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
    
    render() {
        return (
            <div>
                <h1>One for the Road Admin</h1>
                
            </div>
        );
    }
}

export default Dashboard;
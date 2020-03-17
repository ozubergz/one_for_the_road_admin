import React, { Component } from 'react';

//React Notification Components
import 'react-notifications-component/dist/theme.css';
import { store } from 'react-notifications-component';

//Action Cable
import actionCable from 'actioncable';

const CableApp = {};
CableApp.cable = actionCable.createConsumer("ws://localhost:3000/cable");

class Dashboard extends Component {
    componentDidMount() {
        CableApp.cable.subscriptions.create({
            channel: 'NotificationChannel'
        }, {
            received: (message) => {
                //receive notification when client makes an order
                this.handleNotification(message);
            }
        })
    }

    handleNotification(message) {
        store.addNotification({
            title: "Pending Order!",
            message,
            type: "success",
            insert: "top",
            container: "top-right",
            animationIn: ["animated", "fadeIn"],
            animationOut: ["animated", "fadeOut"],
            dismiss: {
                duration: 2000,
                onScreen: true
            },
            slidingEnter: {
                duration: 300,
                timingFunction: 'ease-in',
                delay: 0
            }
        });
    }

    render() {
        return (
            <div>
                <h1>Welcome to the administration page</h1>
            </div>
        );
    }
}

export default Dashboard;
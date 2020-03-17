import React, { Component } from 'react';

//React Notification Components
import 'react-notifications-component/dist/theme.css';
import { store } from 'react-notifications-component';

//Action Cable
import actionCable from 'actioncable';

//audio
import bellAudio from './sounds/bell.mp3'
import UIfx from 'uifx'

const bell = new UIfx(bellAudio, {
    volume: 0.4,
    throttleMs: 100
});

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
                bell.play();
            }
        })
    }

    handleNotification(message) {
        store.addNotification({
            title: "Success!",
            message: message,
            type: "success",
            insert: "top",
            container: "top-right",
            animationIn: ["animated", "fadeIn"],
            animationOut: ["animated", "fadeOut"],
            dismiss: {
                duration: 5000,
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
import React, { Component } from 'react';
import './App.css';
import simpleRestProvider from 'ra-data-simple-rest';
import authProvider from './AuthProvider';

//React Admin Components
import { Admin, Resource } from 'react-admin';
import { Users } from './Users/index';
import { Orders } from './Orders/index';
import { Items } from './Items/index';
import { Categories } from './Categories/index';
import Dashboard from './Dashboard/Dashboard';

//Material UI Icons
import PersonIcon from '@material-ui/icons/Person';
import KitchenIcon from '@material-ui/icons/Kitchen';
import FastfoodIcon from '@material-ui/icons/Fastfood';

//React Notification Components
import ReactNotification from 'react-notifications-component';
import 'react-notifications-component/dist/theme.css';
import { store } from 'react-notifications-component';

//Action Cable
import actionCable from 'actioncable';

//audio
import bellAudio from './sounds/bell.mp3';
import UIfx from 'uifx';

const bell = new UIfx(bellAudio, {
    volume: 0.4,
    throttleMs: 100
});

//connection to Action Cable
const CableApp = {};
CableApp.cable = actionCable.createConsumer("ws://localhost:3000/cable");

const dataProvider = simpleRestProvider('http://localhost:3000/api');

class App extends Component {  

  componentDidMount() {
    CableApp.cable.subscriptions.create({
        channel: 'NotificationChannel'
    }, {
        received: (message) => {
            //receive notification when client makes an order
            this.handleNotification(message);
            bell.play();
        }
    });
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
        <div className="App">
          <ReactNotification />
          <Admin dashboard={Dashboard} dataProvider={dataProvider} authProvider={authProvider} >
            <Resource name="categories" {...Categories} icon={KitchenIcon} />
            <Resource name="items" {...Items} icon={FastfoodIcon} />
            <Resource name="users" {...Users} icon={PersonIcon} />
            <Resource name="orders" {...Orders} />
            <Resource name="group_options" />            
          </Admin>
        </div>
    );
  }
}

export default App;

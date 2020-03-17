import React, { Component } from 'react';
import './styles/App.css';
import simpleRestProvider from 'ra-data-simple-rest';

//React Admin Components
import { Admin, Resource } from 'react-admin';
import { UserList, UserShow } from './Users/index';
import { OrderList, OrderShow } from './Orders/index';
import { ItemList, ItemEdit, ItemCreate } from './Items/index';
import { CategoryList, CategoryEdit, CategoryCreate } from './Categories/index';
import Dashboard from './Dashboard';

//Action Cable
import actionCable from 'actioncable';

//React Notification Components
import ReactNotification from 'react-notifications-component';
import 'react-notifications-component/dist/theme.css';
import { store } from 'react-notifications-component';


// const CableApp = {};
// CableApp.cable = actionCable.createConsumer("ws://localhost:3000/cable");

const dataProvider = simpleRestProvider('http://localhost:3000/api');

class App extends Component {
  
  // componentDidMount() {
  //   CableApp.cable.subscriptions.create({
  //       channel: 'NotificationChannel'
  //     }, {
  //       received: (data) => {
  //         //receive notification when client makes an order
  //         console.log(data)
  //       }
  //     }
  //   )
  // }
  
  render() {
    return (
      <div className="App">
        <Admin dashboard={Dashboard} dataProvider={dataProvider}>
          <Resource name="categories" list={CategoryList} edit={CategoryEdit} create={CategoryCreate} />
          <Resource name="items" list={ItemList} edit={ItemEdit} create={ItemCreate} />
          <Resource name="users" list={UserList}  show={UserShow} />
          <Resource name="orders" list={OrderList} show={OrderShow} />
        </Admin>
      </div>
    );
  }
}

export default App;

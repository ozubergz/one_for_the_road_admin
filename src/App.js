import React, { Component } from 'react';
import './styles/App.css';
import simpleRestProvider from 'ra-data-simple-rest';
import { 
  Admin, 
  Resource
} from 'react-admin';
import { UserList, UserShow } from './Users/index';
import { OrderList, OrderShow } from './Orders/index';
import { ItemList, ItemEdit, ItemCreate } from './Items/index';
import { CategoryList, CategoryEdit, CategoryCreate } from './Categories/index';
import actionCable from 'actioncable';

const dataProvider = simpleRestProvider('http://localhost:3000/api');

const CableApp = {};
CableApp.cable = actionCable.createConsumer("ws://localhost:3000/cable");

class App extends Component {
  

  componentDidMount() {
    CableApp.cable.subscriptions.create({
        channel: 'NotificationChannel'
      }, {
        received: (data) => {
          console.log(data)
        }
      }
    )
  }
  
  render() {
    return (
        <div className="App">
        <Admin dataProvider={dataProvider}>
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

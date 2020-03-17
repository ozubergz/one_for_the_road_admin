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

//React Notification Components
import ReactNotification from 'react-notifications-component';

const dataProvider = simpleRestProvider('http://localhost:3000/api');

const App = () => {  
  return (
    <div className="App">
      <ReactNotification />
      <Admin dashboard={Dashboard} dataProvider={dataProvider}>
        <Resource name="categories" list={CategoryList} edit={CategoryEdit} create={CategoryCreate} />
        <Resource name="items" list={ItemList} edit={ItemEdit} create={ItemCreate} />
        <Resource name="users" list={UserList}  show={UserShow} />
        <Resource name="orders" list={OrderList} show={OrderShow} />
      </Admin>
    </div>
  );
}

export default App;

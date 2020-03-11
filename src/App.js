import React from 'react';
import './styles/App.css';

import simpleRestProvider from 'ra-data-simple-rest';
import { 
  Admin, 
  Resource,
  ListGuesser
} from 'react-admin';
import { ItemList, ItemEdit, ItemCreate } from './Items/index';
import { CategoryList, CategoryEdit, CategoryCreate } from './Categories/index';

const dataProvider = simpleRestProvider('http://localhost:3000/api');

function App() {
  return (
    <div className="App">
      <Admin dataProvider={dataProvider}>
        <Resource name="users" list={ListGuesser} />
        <Resource name="categories" list={CategoryList} edit={CategoryEdit} create={CategoryCreate} />
        <Resource name="items" list={ItemList} edit={ItemEdit} create={ItemCreate} />
      </Admin>
    </div>
  );
}

export default App;

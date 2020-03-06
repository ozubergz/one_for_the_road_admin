import React from 'react';
import './styles/App.css';
import simpleRestProvider from 'ra-data-simple-rest';
import { 
  Admin, 
  Resource,
  // ListGuesser,
  // EditGuesser
} from 'react-admin';
import { ItemList, ItemEdit } from './Items/index';

const dataProvider = simpleRestProvider('http://localhost:3000/api/');

function App() {
  return (
    <div className="App">
      <Admin dataProvider={dataProvider}>
        <Resource name="categories" />
        <Resource name="items" list={ItemList} edit={ItemEdit} />
      </Admin>
    </div>
  );
}

export default App;

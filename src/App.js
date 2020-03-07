import React from 'react';
import './styles/App.css';
import { Route, Router } from 'react-router';

import simpleRestProvider from 'ra-data-simple-rest';
import { 
  Admin, 
  Resource,
  ShowGuesser,
  ListGuesser,
  EditGuesser
} from 'react-admin';
import { ItemList, ItemEdit } from './Items/index';
import { CategoryList, CategoryEdit } from './Categories/index';

const dataProvider = simpleRestProvider('http://localhost:3000/api');

function App() {
  return (
    <div className="App">
      <Admin dataProvider={dataProvider}>
        <Resource name="categories" list={CategoryList} edit={CategoryEdit} />
        <Resource name="items" list={ItemList} edit={ItemEdit} />
      </Admin>
      {/* <Router>
        <Route exact path="/items/:itemId" />
      </Router> */}
    </div>
  );
}

export default App;

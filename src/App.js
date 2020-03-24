import React, { Component } from 'react';
import './styles/App.css';
import simpleRestProvider from 'ra-data-simple-rest';

//React Admin Components
import { 
  Admin, 
  Resource, 
  Show,
  SimpleShowLayout,
  NumberField,
  ShowGuesser, 
  ListGuesser, 
  ShowButton,
  List,
  Datagrid,
  TextField,
  ArrayField,
  SingleFieldList,
  ChipField,
  ReferenceField
 } from 'react-admin';
import { Users } from './Users/index';
import { Orders } from './Orders/index';
import { Items } from './Items/index';
import { Categories } from './Categories/index';
import Dashboard from './Dashboard';

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

  // Item_optionList = props => (
  //     <List {...props}>
  //         <Datagrid rowClick="edit">
  //             <TextField source="id" />
  //             <TextField source="name" />
  //             <ReferenceField source="item_id" reference="items"><TextField source="id" /></ReferenceField>
  //             <ArrayField source="options"><SingleFieldList><ChipField source="id" /></SingleFieldList></ArrayField>
  //             <ShowButton/>
  //         </Datagrid>
  //     </List>
  // );

  Item_optionShow = props => (
    <Show {...props}>
        <SimpleShowLayout>
            <TextField source="id" />
            <TextField source="name" />
            <ReferenceField source="item_id" reference="items"><TextField source="id" /></ReferenceField>
            <ArrayField source="options"><Datagrid><TextField source="id" />
            <TextField source="name" />
            <TextField source="price" />
            <NumberField source="input_type.id" /></Datagrid></ArrayField>
        </SimpleShowLayout>
    </Show>
  );
  
  render() {
    return (
        <div className="App">
          <ReactNotification />
          <Admin dashboard={Dashboard} dataProvider={dataProvider}>
            <Resource name="categories" {...Categories} />
            <Resource name="items" {...Items} />
            <Resource name="users" {...Users} />
            <Resource name="orders" {...Orders} />
            <Resource name="item_options" show={this.Item_optionShow} />
          </Admin>
        </div>
    );
  }
}

export default App;

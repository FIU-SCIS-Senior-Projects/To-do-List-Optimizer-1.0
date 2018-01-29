import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View
} from 'react-native';

import {
  Router,
  Scene,
} from 'react-native-router-flux';

import configureStore from './store/store'
import { Provider } from 'react-redux';
const store = configureStore({});

import LoginScene from './scenes/LoginScene';
import MainScene from './scenes/MainScene';
import MapScene from './scenes/MapScene';
import NewEntryScene from './scenes/NewEntryScene';
import ItineraryScene from './scenes/ItineraryScene';

export default class App extends Component<{}> {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <Scene key='root'>
            <Scene key='login' component={LoginScene} title='Login'/>
            <Scene key='main' component={MainScene} title='Main'/>
            <Scene key="tabbar" tabs={true} tabBarStyle={{ backgroundColor: '#eee' }}>
              <Scene key="map" title="Map" initial={true}>
                <Scene key="_map" component={MapScene} title="Map" />
              </Scene>
              <Scene key="itin" title="Itinerary">
                <Scene key="itinerary" component={ItineraryScene} title="Itinerary" />
              </Scene>
            </Scene>
            <Scene key='entry' component={NewEntryScene} title='Entry'/>
          </Scene>
        </Router>
      </Provider>
    );
  }
}

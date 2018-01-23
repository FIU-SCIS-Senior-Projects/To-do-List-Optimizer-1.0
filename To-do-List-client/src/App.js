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

import LoginScene from './scenes/LoginScene';
import MainScene from './scenes/MainScene';
import MapScene from './scenes/MapScene';
import NewEntryScene from './scenes/NewEntryScene';
import ItineraryScene from './scenes/ItineraryScene';

export default class App extends Component<{}> {
  render() {
    return (
      <Router>
        <Scene key='root'>
          <Scene key='login' component={LoginScene} title='Login'/>
          <Scene key='main' component={MainScene} title='Main'/>
          <Scene key='itinerary' component={ItineraryScene} title='Itinerary'/>
          <Scene key='map' component={MapScene} title='Map'/>
          <Scene key='entry' component={NewEntryScene} title='Entry'/>
        </Scene>
      </Router>
    );
  }
}

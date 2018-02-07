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
  Stack,
  Tabs,
} from 'react-native-router-flux';

import configureStore from './store/store'
import { Provider } from 'react-redux';
const store = configureStore({});

// Loading main Scenes
import LoginScene from './scenes/LoginScene';
import MainScene from './scenes/MainScene';
import MapScene from './scenes/MapScene';
import NewEntryScene from './scenes/NewEntryScene';
import ItineraryScene from './scenes/ItineraryScene';

import TabIcon from './components/Tab';

export default class App extends Component{
  render() {
    return (
      <Provider store={store}>
        <Router>
          <Stack key='root'>
            <Scene key='login' initial={true} component={LoginScene} title='Login' direction="vertical"/>
            <Scene key='main' component={MainScene} title='Main'/>
            <Tabs key="tabbar" swipeEnabled>
                <Scene key="map" component={MapScene} title='Map'/>
                <Scene key="itinerary" component={ItineraryScene} title="Itinerary" />
            </Tabs>
            <Scene key='entry' component={NewEntryScene} title='Entry'/>
          </Stack>
      </Router>
    </Provider>
    );
  }
}

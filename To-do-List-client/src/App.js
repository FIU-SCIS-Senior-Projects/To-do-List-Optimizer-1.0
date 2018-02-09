import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View
} from 'react-native';
import {
  Scene,
  Router,
  Actions,
  Reducer,
  ActionConst,
  Overlay,
  Tabs,
  Modal,
  Drawer,
  Stack,
  Lightbox,
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
import NavigationBar from './components/map/NavigationBar'
import NavigationBarMain from './components/NavigationBarMain'

export default class App extends Component{
  render() {
    return (
      <Provider store={store}>
        <Router>
          <Stack key='root'>
            <Scene key='login' initial={true} component={LoginScene} title='Login' direction="vertical"/>
            <Scene key='main' navBar={NavigationBarMain} component={MainScene} title='Main'/>
            <Tabs key="tabbar"  swipeEnabled>
                <Scene key="map"  navBar={NavigationBar} component={MapScene} title='Map'/>
                <Scene key="itinerary" component={ItineraryScene} title="Itinerary" />
            </Tabs>
            <Scene key='entry' component={NewEntryScene} title='Entry'/>
          </Stack>
      </Router>
    </Provider>
    );
  }
}

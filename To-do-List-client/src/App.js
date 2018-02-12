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
            {/* <Drawer
              hideNavBar
              key="drawer"
              drawerImage={require('./assets/icons/navigation/Armagedon-CompassIcon.png')}
              drawerWidth={300}> */}
              {/* <Tabs key="tabbar"  hideTabBar> */}
                  <Scene key='main' navBar={NavigationBarMain} component={MainScene}  title='Main'/>
                  <Scene key="map"  navBar={NavigationBar} component={MapScene} title='Map'/>
                  {/* <Scene key="itinerary" component={ItineraryScene} title="Itinerary" /> */}
              {/* </Tabs> */}
              <Scene key='entry'
                // onExit={() => Actions.pop}
                leftTitle="Cancel"
                // onLeft={Actions.pop}
                component={NewEntryScene} title='Entry'/>
            {/* </Drawer> */}
          </Stack>
      </Router>
    </Provider>
    );
  }
}

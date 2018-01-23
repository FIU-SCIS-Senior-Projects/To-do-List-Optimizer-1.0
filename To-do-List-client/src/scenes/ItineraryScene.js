import React, {Component} from 'react';
import {View, Text, Image, StyleSheet, TouchableOpacity} from 'react-native';
//Actions is provided by the router for dynamic routing
import {Actions} from 'react-native-router-flux';
// import WelcomeContainer from '../containers/WelcomeContainer';

import ItineraryContainer from '../containers/ItineraryContainer';

/** Defines the general layout of the Itinerary scene*/
class ItineraryScene extends Component {
  constructor(props){
    super(props)
  }
  render() {
    return (
      <ItineraryContainer />
    )
  }
}

export default ItineraryScene;

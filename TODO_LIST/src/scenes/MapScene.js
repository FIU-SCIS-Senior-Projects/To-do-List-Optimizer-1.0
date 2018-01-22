import React, {Component} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity
} from 'react-native';

import { Actions} from 'react-native-router-flux';
import MapContainer from '../containers/MapContainer';

 class MapScene extends Component{

  render(){
    return(
        <MapContainer />
    )
  }
}

export default MapScene;

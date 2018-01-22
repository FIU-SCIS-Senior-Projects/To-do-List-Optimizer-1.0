import React, {Component} from 'react';
import {
  View,
  StyleSheet,
  Text,
  TextInput,
} from 'react-native';

import MapForm from '../components/MapForm';

class MapContainer extends Component{
  constructor(props){
    super(props);
  }

  render(){
    return(
      <MapForm />
    );
  }
}

export default MapContainer

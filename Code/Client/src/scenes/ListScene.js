import React, {Component} from 'react';
import {View, Text, Image, StyleSheet, TouchableOpacity} from 'react-native';
//Actions is provided by the router for dynamic routing
import {Actions} from 'react-native-router-flux';
import ListContainer from '../containers/ListContainer';

export default class extends Component {
  constructor(props){
    super(props);
  }

  render() {

    return (
      <ListContainer
        placeId = {this.props.placeId}
      />
    );
  }
}

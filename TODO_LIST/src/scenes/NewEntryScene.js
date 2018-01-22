import React, {Component} from 'react';
import {View, Text, Image, StyleSheet, TouchableOpacity} from 'react-native';

import {FormLabel, FormInput} from 'react-native-elements';

//Actions is provided by the router for dynamic routing
import {Actions} from 'react-native-router-flux';
// import WelcomeContainer from '../containers/WelcomeContainer';

class NewEntryScene extends Component {

  render() {
    return (<View>

      <FormLabel>Name</FormLabel>
      <FormInput onChangeText={() => {}}/>

    </View>)
  }
}

export default NewEntryScene;

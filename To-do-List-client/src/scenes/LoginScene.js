import React, {Component} from 'react';
import {View, Text, Image, StyleSheet, TouchableOpacity} from 'react-native';
//Actions is provided by the router for dynamic routing
import {Actions} from 'react-native-router-flux';
// import WelcomeContainer from '../containers/WelcomeContainer';
import LoginContainer from '../containers/LoginContainer'
class LoginScene extends Component {

  render() {
    return (
      <LoginContainer />
      )
  }
}

export default LoginScene;

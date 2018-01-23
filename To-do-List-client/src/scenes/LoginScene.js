import React, {Component} from 'react';
import {View, Text, Image, StyleSheet, TouchableOpacity} from 'react-native';
//Actions is provided by the router for dynamic routing
import {Actions} from 'react-native-router-flux';
// import WelcomeContainer from '../containers/WelcomeContainer';

class LoginScene extends Component {

  render() {
    return (<View>
      
      {/* <WelcomeContainer /> */}
      <TouchableOpacity
          onPress={() => {
            Actions.main({

            });
          }}
        >
        <Text>
          Login
        </Text>
      </TouchableOpacity>
    </View>)
  }
}

export default LoginScene;

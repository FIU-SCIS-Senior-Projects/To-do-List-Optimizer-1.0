import React, {Component} from 'react';
import {View, Text, Image, StyleSheet, TouchableOpacity} from 'react-native';
//Actions is provided by the router for dynamic routing
import { Actions} from 'react-native-router-flux';
// import WelcomeContainer from '../containers/WelcomeContainer';

 class MainScene extends Component{

  render(){
    return(
        <View>
          <Text>
              Main Scene here
          </Text>
          <TouchableOpacity
              onPress={() => {
                Actions.itinerary({

                });
              }}
            >
            <Text>
              Itinerary
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
              onPress={() => {
                Actions.entry({

                });
              }}
            >
            <Text>
              Entry
            </Text>
          </TouchableOpacity>
        </View>
    )
  }
}

export default MainScene;

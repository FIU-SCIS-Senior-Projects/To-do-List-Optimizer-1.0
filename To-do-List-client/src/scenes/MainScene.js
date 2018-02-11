import React, {Component} from 'react';
import {View, Text, Image, StyleSheet, TouchableOpacity} from 'react-native';

import { Actions} from 'react-native-router-flux';
import MainContainer from '../containers/MainContainer';


 class MainScene extends Component{
   constructor(props){
     super(props);

   }
   static navigatorStyle = {
        tabBarHidden: true
    };

  render(){
    return(
      <MainContainer />
    )
  }
}

export default MainScene;

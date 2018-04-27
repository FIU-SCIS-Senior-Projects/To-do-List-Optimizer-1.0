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

 static navigatorStyle = {
         tabBarHidden: true
     };
  render(){
    return(
      <View style={styles.container}>
        <MapContainer />
      </View>

    )
  }

}

const styles = StyleSheet.create({
  container:{
    flex: 1,
    justifyContent: 'center',
  }
})
export default MapScene;

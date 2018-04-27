import { Image, AsyncStorage, Alert, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, {Component} from 'react'
import { Actions } from 'react-native-router-flux'

const styles = StyleSheet.create({
  container: {
    height: (Platform.OS === 'ios') ? 64 : 54,
    flexDirection: 'row',
    paddingTop: 20,
    backgroundColor: '#54C4C8',
  },
  navBarItem: {
    flex: 1,
    justifyContent: 'center',
  },
  placeText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white'
  }
})

export default class Navigationbar extends Component {

  // constructor(props) {
  //   super(props)
  // }


  async userLogout() {
    try {

      AsyncStorage.getItem('id_token').then((token) =>{
        console.log("Active token: " + token);
      }).done();

      await AsyncStorage.removeItem('id_token');
      Alert.alert('Logout Success!');
      Actions.login();
      AsyncStorage.getItem('id_token').then((token) =>{
        console.log("Active token: " + token);
      }).done();

    } catch (error) {
      console.log('AsyncStorage error: ' + error.message);
    }
  }

  _renderLeft() {
    return (
      <TouchableOpacity
        onPress={this.userLogout.bind(this)}
        style={[styles.navBarItem, { paddingLeft: 10}]}>
        <Text>sign out</Text>

        {/* <Image
          style={{width: 25, height: 45}}
          resizeMode="contain"
          source={ require('../assets/icons/navigation/Armagedon-CompassIcon.png')}></Image> */}
        </TouchableOpacity>
      )
    }

    // _renderMiddle() {
    //   return (
    //     <View style={[styles.navBarItem, {alignItems: 'center'}]}>
    //       <Text style={styles.placeText}>WALGREENS</Text>
    //     </View>
    //   )
    // }

    render() {

      return (
        <View style={styles.container}>
          { this._renderLeft() }
          {/* { this._renderMiddle() } */}
        </View>
      )
    }
  }

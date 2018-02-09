import { Image, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
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

  _renderLeft() {
      return (
        <TouchableOpacity
          onPress={() => console.log('Hamburger button pressed')}
          style={[styles.navBarItem, { paddingLeft: 10}]}>
          <Image
            style={{width: 25, height: 45}}
            resizeMode="contain"
            source={ require('../assets/icons/navigation/Armagedon-CompassIcon.png')}></Image>
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

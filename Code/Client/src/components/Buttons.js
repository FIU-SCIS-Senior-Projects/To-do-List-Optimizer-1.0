import React, {Component} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
} from 'react-native';

import FontAwesome, { Icons } from 'react-native-fontawesome';

/******************************************************************************
* CONSTANTS
******************************************************************************/

BIG_BUTTON_DIAMETER = 60;
SMALL_BUTTON_DIAMETER = 40;
IMAGE_DIMENSIONS = 50;
/******************************************************************************
* NAVIGATION BUTTON
******************************************************************************/

export class NavigationButton extends Component {
  constructor(props){
    super(props);
  }

  render(){
    return(
      <TouchableOpacity
        style={[styles.roundButton,
                styles.navigationButton]}
        onPress={() => this.props.onPress()}>
        <Image
          style       = { styles.image}
          resizeMode  = "contain"
          source      = { require('../assets/icons/map_icon.png')}>
        </Image>
      </TouchableOpacity>
    );
  }
}

/******************************************************************************
* ADD BUTTON
******************************************************************************/

export class AddButton extends Component {
  constructor(props){
    super(props);
  }

  render(){
    return(
      <TouchableOpacity
        style={[styles.roundButton,
                styles.addButton]}
        onPress={() => this.props.onPress()}>
        <Text style={styles.text}>
          <FontAwesome>{Icons.plus}</FontAwesome>
        </Text>
      </TouchableOpacity>
    );
  }
}

/******************************************************************************
* STYLES
******************************************************************************/

const styles = StyleSheet.create({
  container:{
    flex: 1,
  },
  roundButton:{
    alignItems: 'center',
    justifyContent: 'center',

    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 1,
  },
  addButton:{
    width: SMALL_BUTTON_DIAMETER,
    height: SMALL_BUTTON_DIAMETER,
    borderRadius: SMALL_BUTTON_DIAMETER/2,
    backgroundColor: '#3EFF8E',
  },
  navigationButton:{
    width: BIG_BUTTON_DIAMETER,
    height: BIG_BUTTON_DIAMETER,
    borderRadius: BIG_BUTTON_DIAMETER/2,
    backgroundColor: '#3EFF8E',
  },
  text:{
    fontSize: 18,
    color: 'black',
    fontWeight: '100',
  },
  image: {
    width:              IMAGE_DIMENSIONS,
    height:             IMAGE_DIMENSIONS,
  }
})

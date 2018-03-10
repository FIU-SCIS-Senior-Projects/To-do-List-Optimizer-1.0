import React, {Component} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

import FontAwesome, { Icons } from 'react-native-fontawesome';

/******************************************************************************
* CONSTANTS
******************************************************************************/

BIG_BUTTON_DIAMETER = 70;
SMALL_BUTTON_DIAMETER = 50;

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
                styles.navigationButton,
                this.props.navigating? styles.navigationStarted: styles.navigationNotStarted]}
        onPress={() => this.props.onPress()}>
        <Text style={styles.text}>{this.props.navigating? "MAP" : "START"}</Text>
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
  },
  navigationNotStarted:{
    backgroundColor: '#3EFF8E',
  },
  navigationStarted:{
    backgroundColor: '#57B0D8',
  },
  text:{
    fontSize: 18,
    color: 'black',
    fontWeight: '100',
  },
})

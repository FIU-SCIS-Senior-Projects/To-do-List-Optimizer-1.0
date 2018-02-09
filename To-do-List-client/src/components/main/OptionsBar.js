import React, {Component} from 'react';
import {
  View,
  Text,
  TextInput,
  Dimensions,
  TouchableOpacity,
  StyleSheet,
  Image
} from 'react-native';

const {width, height} = Dimensions.get('window');

import RoundButton from './RoundButton';

const ADD_BUTTON_DIAMETER = 50;
const ROUTE_BUTTON_DIAMTER = 70;

const ADD_BUTTON_LEFT_MARGIN_PERCENT = 0.15;

const ADD_BUTTON_LEFT_MARGIN = width * ADD_BUTTON_LEFT_MARGIN_PERCENT;

const DESIRED_RIGHT_MARGIN = 5;

class OptionsBar extends Component{
  constructor(props){
    super(props);
  }

  render(){
    return(
      <View style={styles.container}>
          <View style={styles.addButtonContainer}>
            <RoundButton onPress={()=>{this.props.addErrand()}} diameter={ADD_BUTTON_DIAMETER} type='add'/>
          </View>
          <View style={styles.routeButtonContainer}>
              <RoundButton onPress={()=>{this.props.route()}} diameter={ROUTE_BUTTON_DIAMTER} type='route'/>
          </View>
      </View>
    );
  }
}

function calculateLeftMargin(desiredRightMargin){
  return width - ADD_BUTTON_LEFT_MARGIN - ADD_BUTTON_DIAMETER - ROUTE_BUTTON_DIAMTER - desiredRightMargin;
}

const styles = StyleSheet.create({
  container:{
    // flex: 1,
    position: 'absolute',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#39416B',
    height: 80,
    width: Dimensions.get('window').width,
    bottom: 0,
    // justifyContent: 'center',
  },
  addButtonContainer:{
    // flex: 1,
    paddingLeft: ADD_BUTTON_LEFT_MARGIN,
  },
  routeButtonContainer:{
    paddingLeft: calculateLeftMargin(DESIRED_RIGHT_MARGIN)
      // alignSelf: 'right'
  }
})
export default OptionsBar;

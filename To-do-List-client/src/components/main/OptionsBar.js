import React, {Component} from 'react';
import {
  View,
  Text,
  Dimensions,
  StyleSheet,
} from 'react-native';

const {width, height} = Dimensions.get('window');

import RoundButton from './RoundButton';
import {NavigationButton, AddButton} from '../Buttons';

const ADD_BUTTON_DIAMETER = 50;
const ROUTE_BUTTON_DIAMTER = 70;

const ADD_BUTTON_LEFT_MARGIN = 90;
const TEXT_LEFT_MARGIN = 20;

const DESIRED_RIGHT_MARGIN = 20;

class OptionsBar extends Component{
  constructor(props){
    super(props);
  }

  render(){
    return(
      <View style={styles.container}>
          <View style={styles.textContainer}>
            <Text style={styles.etaText}>ETA  </Text>
            <Text style={styles.distanceText}>
              {`${this.props.eta}`}
            </Text>
          </View>
          <View style={styles.addButtonContainer}>
            <AddButton onPress={()=>{this.props.addErrand()}}/>
          </View>
          <View style={styles.routeButtonContainer}>
              <NavigationButton onPress={()=>{this.props.route()}} />
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
  textContainer: {
    flexDirection: 'row',
    paddingLeft: TEXT_LEFT_MARGIN,
  },
  etaText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white'
  },
  distanceText: {
    fontSize: 16,
    color: 'white'
  },
  addButtonContainer:{
    // flex: 1,
    paddingLeft: ADD_BUTTON_LEFT_MARGIN,
  },
  routeButtonContainer:{
    paddingLeft: 30
      // alignSelf: 'right'
  },
})
export default OptionsBar;

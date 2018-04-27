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
              <NavigationButton onPress={()=>{this.props.map()}} navigating={this.props.navigating} />
          </View>
      </View>
    );
  }
}


const styles = StyleSheet.create({
  container:{
    position:             'absolute',
    bottom:               0,
    flexDirection:        'row',
    alignItems:           'center',
    backgroundColor:      '#39416B',
    height:               80,
    width:                Dimensions.get('window').width,
    borderTopLeftRadius:  5,
    borderTopRightRadius: 5,
  },
  textContainer: {
    flexDirection:        'row',
    alignItems:           'center',
    justifyContent:       'center',
    width:                '60%',
    height:               '100%'
  },
  etaText: {
    fontSize:             16,
    fontWeight:           'bold',
    color:                'white'
  },
  distanceText: {
    fontSize:             16,
    color:                'white'
  },
  addButtonContainer:{
    flexDirection:        'column',
    width:                '20%',
    height:               '100%',
    alignItems:           'center',
    justifyContent:       'center',
  },
  routeButtonContainer:{
    flexDirection:        'column',
    width:                '20%',
    height:               '100%',
    alignItems:           'center',
    justifyContent:       'center',
  },
})
export default OptionsBar;

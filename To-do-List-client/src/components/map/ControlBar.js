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

import PropTypes from 'prop-types';
import {convertTime, convertDistance} from '../../tools/conversionTools';

const {width, height} = Dimensions.get('window');

class ControlBar extends Component {
  constructor(props){
    super(props);

    // converting time and distance values to readable formatTime
    this.state = {
      totalTime:     convertTime(this.props.totalTime),
      totalDistance: convertDistance(this.props.totalDistance),
    }
    // Binding functions
    this._navigationView  = this._navigationView.bind(this);
    this._setupView       = this._setupView.bind(this);
  }

  /**
   * It renders the menu when the user already started the navigation
   * @return {JSX}
   */
  _navigationView(){
    return(
      <View style={navStyles.container}>
        <View style={navStyles.LeftContainer}>
          <Text style={[styles.boldText,{margin: 5}]}>{this.props.timeToPlace}</Text>
          <Text style={[styles.boldText, {margin: 5}]}>{this.props.distanceToPlace}</Text>
        </View>
        <View style={navStyles.RightContainer}>
          <TouchableOpacity
            style={navStyles.endButton}
            onPress={()=>{this.props.navigate()}}>
              <Text style={[styles.boldText,{color: 'white'}]}>End</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }

/**
 * It renders the menu when the user hasnt started the navigation.
 *
 * Doing this the user can decide when to start the navigation. It will show
 * a start button in it and the total amount of time of the trip.
 * @return {JSX}
 */
  _setupView(){
    return(
      <View style={setupStyles.container}>
        {/* Top Part of the Control Bar: Contains start and destination */}
        <View style={setupStyles.topSectionContainer}>
          <Text style={styles.boldText}>To {this.props.destination.name}</Text>
          <Text style={styles.normalText}>From {this.props.currentLocation}</Text>
        </View>

        {/* Just a Separator*/}
        <View style={setupStyles.separatorSection}></View>

        {/* Bottom part of the Control Bar that contains time info and GO button */}
        <View style={setupStyles.bottomSectionContainer}>

          {/* Time info */}
          <View style={setupStyles.bottomSectionLeft}>
            <Text style={styles.boldText}>
              {this.state.totalTime.hours ? `${this.state.totalTime.hours} h `:''}
              {`${this.state.totalTime.minutes} mins`}
            </Text>
            <Text style={styles.normalText}>
              {this.state.totalDistance.miles ?
                `${this.state.totalDistance.miles} miles `:
                `${this.state.totalDistance.foot.toFixed(0)} feet`}

              - {this.props.summary}
            </Text>
          </View>

          {/* Go Button */}
          <View style={setupStyles.bottomSectionRight}>
            <TouchableOpacity
              style={setupStyles.goButton}
              onPress={()=>{this.props.navigate()}}>
                <Text style={[styles.boldText,{color: 'white'}]}>GO</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    )
  }

  render(){
    if (this.props.isNavigating) {
      return this._navigationView();
    }
    else
    {
      return this._setupView();
    }
  }
}

/******************************************************************************
* Props Setup
******************************************************************************/

ControlBar.propTypes = {
  isNavigating:       PropTypes.bool,
  destination:        PropTypes.object,
  nextPlace:          PropTypes.string,
  currentLocation:    PropTypes.string,

  totalTime:          PropTypes.number,
  timeToPlace:        PropTypes.number,

  totalDistance:      PropTypes.number,
  distanceToPlace:    PropTypes.number,

  summary:            PropTypes.string,   // General route to follow

  navigate:           PropTypes.func.isRequired,
};
ControlBar.defaultProps = {
  isNavigating:       false,
  destination:        {name: 'default'},
  nextPlace:          'default',
  currentLocation:    'My Location',

  totalTime:          0,
  timeToPlace:        0,

  totalDistance:      0,
  distanceToPlace:    0,

  summary:            'N/A',
};

/******************************************************************************
* Styles
******************************************************************************/

const styles = StyleSheet.create({
  boldText: {
    fontSize:           18,
    fontWeight:         'bold',
    fontFamily:         'Lato',
  },
  normalText: {
    marginTop:          5,
    fontSize:           12,
    fontFamily:         'Lato',
  },
})         // Styles for general purposes
const setupStyles = StyleSheet.create({
    container: {
      position:         'absolute',
      bottom:           5,
      height:           '40%',
      width:            '98%',
      justifyContent:   'center',
      alignItems:       'center',
      backgroundColor:  'rgba(255,255,255,0.99)',
      padding:          10,
      borderRadius:     15,
    },
    topSectionContainer: {
      height:           '25%',
      width:            '100%',
      // alignItems: 'center',
    },
    separatorSection: {
      height:           '1%',
      width:            '95%',
      backgroundColor:  'rgba(211, 211, 211,0.9)'
    },
    bottomSectionContainer: {
      flexDirection:    'row',
      height:           '64%',
      width:            '100%',
      alignItems:       'center',
    },
    bottomSectionLeft: {    // Time information Section
      flexDirection:    'column',
      height:           '80%',
      width:            '80%',
      justifyContent:   'center',
    },
    bottomSectionRight: {     //Start Button Section
      flexDirection:    'row',
      justifyContent:   'center',
      alignItems:       'center',
      height:           '80%',
      width:            '20%',
    },
    goButton: {
      justifyContent:   'center',
      alignItems:       'center',
      height:           '80%',
      width:            '90%',
      backgroundColor:  '#4BD965',
      borderRadius:     10,
    }

})    // Styles before navigation
const navStyles = StyleSheet.create({
    container: {
      flexDirection:    'row',
      position:         'absolute',
      bottom:           5,
      height:           '10%',
      width:            '98%',
      justifyContent:   'center',
      backgroundColor:  'rgba(255,255,255,0.99)',
      padding:          10,
      borderRadius:     15,
    },
    LeftContainer: {                // Time information Section
      flexDirection:    'row',
      height:           '100%',
      width:            '80%',
      alignItems:   'center',
    },
    RightContainer: {               //End Button Section
      flexDirection:    'row',
      justifyContent:   'center',
      alignItems:       'center',
      height:           '100%',
      width:            '20%',
    },
    endButton: {
      justifyContent:   'center',
      alignItems:       'center',
      height:           '100%',
      width:            '90%',
      backgroundColor:  '#FE4648',
      borderRadius:     10,
    }
  })      // Styles for navigation

export default ControlBar;

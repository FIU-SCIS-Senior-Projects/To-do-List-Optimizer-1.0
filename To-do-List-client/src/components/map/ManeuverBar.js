import React, {Component} from 'react';
import {
  View,
  Text,
  TextInput,
  Dimensions,
  TouchableOpacity,
  StyleSheet,
  Image,
} from 'react-native';

import PropTypes from 'prop-types';

const {width, height} = Dimensions.get('window');
import Maneuvers from '../../tools/Maneuvers'
import {convertTime, convertDistance} from '../../tools/conversionTools';
import Images from '../../tools/Images'

/******************************************************************************
* Constants
******************************************************************************/
const ICONS_FOLDER_PATH           = '../../assets/icons/maneuvers/'
const MANEUVER_CONTAINER_HEIGHT   = 70;
const DIRECTIONS_CONTAINER_HEIGHT = 50;

const TIME_TO_HIDE_DIRECTIONS     = 5000;  // Time in ms

class ManeuverBar extends Component{
  constructor(props){
    super(props);

    // TODO: check that the Image that is being passed exists, if it doesnt,
    //       handle it.
    this.state = {
      showDirections:     true,
      distanceToManeuver: convertDistance(this.props.distanceToManeuver),
    }
  }

  componentDidMount(){
    setTimeout(() => {
        this.setState({
          showDirections: false,
        })
    }, TIME_TO_HIDE_DIRECTIONS)
  }

  render(){

      return(
        <View style={styles.container}>
          {/* This holds the Icon of the manouver and the maneuver itself */}
          <View style={styles.maneuverContainer}>
            <Image
              style={styles.image}
              resizeMode="contain"
              source={ Images[this.props.maneuver]}>
            </Image>
            <View>
              <Text style={styles.boldText}>
                {Maneuvers[this.props.maneuver]}
              </Text>
              <Text style={styles.normalText}>
                {this.state.distanceToManeuver.miles > 0 ?
                  this.state.distanceToManeuver.miles :
                  this.state.distanceToManeuver.foot.toFixed(1)
                }
                {this.state.distanceToManeuver.miles > 0 ?
                 ` mi` :
                 ` feet`
                }
              </Text>
            </View>
          </View>

          {/* This banner will appear with a more human readable instruction */}
          {this.state.showDirections?
            <View style={styles.directionsContainer}>
              <Text style={styles.normalText}>
                {this.props.directions.replace(/(<([^>]+)>)/g, "")}
              </Text>
            </View>
          : null}

        </View>
      );
  } // End of render
} // End of ManeuverBar class

/******************************************************************************
* Props Setup
******************************************************************************/

ManeuverBar.propTypes = {
  isNavigating:       PropTypes.bool,
  maneuver:           PropTypes.string,
  distanceToManeuver: PropTypes.number,
  destination:        PropTypes.string,
  directions:         PropTypes.string,
};
ManeuverBar.defaultProps = {
  isNavigating:       false,
  maneuver:           'none',
  distanceToManeuver: 'N/A',
  destination:        'N/A',
  directions:         '',
};

/******************************************************************************
* Styles
******************************************************************************/

const styles = StyleSheet.create({
  container: {
    flexDirection:    'column',
    justifyContent:   'center',
    alignItems:       'center',
    position:         'absolute',
    top:              5,
    width:            '98%',
  },
  maneuverContainer: {
    flexDirection:    'row',
    height:           MANEUVER_CONTAINER_HEIGHT,
    width:            '100%',
    // justifyContent:   'center',
    alignItems:       'center',
    backgroundColor:  'rgba(255,255,255,0.99)',
    padding:          10,
    borderRadius:     15,
  },
  directionsContainer: {
    flexDirection:    'column',
    top:              5,
    height:           DIRECTIONS_CONTAINER_HEIGHT,
    width:            '100%',
    justifyContent:   'center',
    alignItems:       'center',
    backgroundColor:  'rgba(255,255,255,0.99)',
    padding:          10,
    borderRadius:     15,
  },
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
  image: {
    width:              60,
    height:             60,
  }
})
export default ManeuverBar;

import React, {Component} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Image,
} from 'react-native';

import {Actions} from 'react-native-router-flux';

import MapView from 'react-native-maps';
import { Header } from 'react-navigation';

import PlaceMarker from './PlaceMarker';

import { PROVIDER_GOOGLE, PROVIDER_DEFAULT } from 'react-native-maps';

import StartButton from './StartButton';
import ManeuverBar from './ManeuverBar';
import ControlBar from './ControlBar';

const CENTER_BUTTON_SIDE = 50;


class MapForm extends Component {
  constructor(props) {
    super(props);

    var {legs} = this.props.map.route
    var currentLeg = legs ? legs[0] : {};
    // Getting the current portion of the trip (leg)
    this.state = {
      centered:       false,
      currentLeg:     currentLeg,
      currentStep:    currentLeg.steps[0],
      timeToPlace:    currentLeg.duration.value,
      arrivedToPlace: false,
    }

    // Binding functions
    this.onMapDrag        = this.onMapDrag.bind(this);
  }

  render() {
    let {map} = this.props;

    return (
      <View style={styles.container}>
        <View style={styles.mapContainer}>
          <MapView
            // provider={PROVIDER_GOOGLE}
            style             = {styles.map}
            initialRegion     = {this.props.map.currentRegion}
            scrollEnabled     = {true}
            showsUserLocation = {true}
            region            = {this.props.map.currentRegion}
            onTouchStart      = {(e) => this.onMapDrag()}
          >

            <MapView.Polyline
              key         = {0}
              coordinates = {this.props.map.route.overview_polyline}
              strokeColor = "#077"
              fillColor   = "rgba(255,0,200,0.5)"
              strokeWidth = {4}
            />

            {Object.keys(this.props.places).map((id,i ) => (
            // <MapView.Marker
            //   style={{width: 50, height:50}}
            //   title={id}
            //   image={require('../../assets/icons/map-marker-small.png')}
            //   key={id}
            //   coordinate={this.props.places[id].location}
            // />
            //
            <MapView.Marker coordinate={this.props.places[id].location} key={i}>
              <PlaceMarker amount={i + 1} />
            </MapView.Marker>
          ))
        }
          </MapView>


          {/* Top bar that contains the maneuver that the user has to make */}
          {this.props.map.navigating ?
            <ManeuverBar
              isNavigating        = {map.navigating}
              maneuver            = {this.state.currentLeg.steps[0].maneuver ?
                                    this.state.currentLeg.steps[0].maneuver : 'none' }
              directions          = {this.state.currentLeg.steps[0].html_instructions}
              distanceToManeuver  = {this.state.currentLeg.steps[0].distance.value}
              nextPlace           = {this.props.map.route.nonDestinationPlaces[
                                      this.props.map.route.waypoint_order[0]].name}
            />
          : null }
          {/* Center Button */}
          {/* <TouchableOpacity
            style={styles.centerButton}>

          </TouchableOpacity> */}

          {/* Bottom bar that has the times and distances to places. Allows stop
            * and start navigation.
            */}
          <ControlBar
            isNavigating    = {this.props.map.navigating}
            navigate        = {this.props.navigate}
            summary         = {map.route.summary}
            totalDistance   = {map.route.total_distance}
            totalTime       = {map.route.total_time}
            destination     = {map.route.destination}
            distanceToPlace = {this.state.currentLeg.distance.value}
            timeToPlace     = {this.state.currentLeg.duration.value}
          />

          <TouchableOpacity
            style           = {{position: 'absolute', bottom: 100, right: 10}}
            onPress         = {() => {this.props.arrived()}}>
            <Image
              style         = {{width: 25, height: 25}}
              resizeMode    = "contain"
              source        = {require('../../assets/icons/navigation/overview.png')}>
            </Image>
          </TouchableOpacity>
          {/* {!this.state.centered?  //if the screen is centered in the user hide the button
          <TouchableOpacity
            style={[styles.round, styles.button, {bottom: 80, right: 10}]}
            onPress={() => {this.setState(prev => {return {...prev, centered: true}});this.props.center()}}>
            <Image
              style={{width: 25, height: 25}}
              resizeMode="contain"
              source={ require('../../assets/icons/navigation/navigation_arrow.png')}></Image>
          </TouchableOpacity> : null}
          <TouchableOpacity
            style={[styles.round, styles.button, {bottom: 10, right: 10}]}
            onPress={() => {this.setState(prev => {return {...prev, centered: false}});this.props.overview()}}>
            <Image
              style={{width: 25, height: 25}}
              resizeMode="contain"
              source={ require('../../assets/icons/navigation/overview.png')}></Image>
          </TouchableOpacity> */}

        </View>
      </View>);
  }

  /**
   * Whenever is a change in the map visuals triggers the center button to be shown
   * by updating the state of the component/=.
   * @return {avoid}
   */
  onMapDrag(){
    console.log('outside')
    if (this.state.centered) {
      console.log('here')
      this.setState(previousState => {
          return {
            ...previousState,
            centered: false
          };
        });
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection:    'column',
    justifyContent:   'center',
    alignItems:       'center'
  },
  mapContainer:{
    flexDirection:    'column',
    justifyContent:   'center',
    alignItems:       'center',
    height:           Dimensions.get('window').height - Header.HEIGHT//70 from the navigation bar
  },
  map: {
    flexDirection:    'column',
    width:            Dimensions.get('window').width,
    height:           Dimensions.get('window').height - Header.HEIGHT,
  },
  centerButton: {
    position:         'relative',
    bottom:           5,
    height:           CENTER_BUTTON_SIDE,
    width:            CENTER_BUTTON_SIDE,
    borderRadius:     10,
    backgroundColor:  'rgba(255,255,255,0.99)',
  },
});

export default MapForm;

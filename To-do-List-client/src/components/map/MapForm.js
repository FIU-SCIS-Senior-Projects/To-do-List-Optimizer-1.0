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
import ManouverBar from './ManouverBar';
import {formatTime} from '../../tools/timeTools';

class MapForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      centered: false,
    }

    this.onMapDrag = this.onMapDrag.bind(this);

  }

  render() {
    console.log(this.props.places)
    return (
      <View style={styles.container}>
        <ManouverBar maneuver={this.getNextManeuver().toUpperCase()} eta={formatTime(this.props.currentLeg.duration.value)}/>
        <View style={styles.mapContainer}>
          <MapView
            // provider={PROVIDER_GOOGLE}
            style={styles.map}
            initialRegion={this.props.currentRegion}
            scrollEnabled={true}
            showsUserLocation={true}
            region={this.props.currentRegion}
            onTouchStart={(e) => this.onMapDrag()}
          >

            <MapView.Polyline
              key={0}
              coordinates={this.props.polyline}
              strokeColor="#077"
              fillColor="rgba(255,0,200,0.5)"
              strokeWidth={4}
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
          {!this.state.centered?  //if the screen is centered in the user hide the button
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
          </TouchableOpacity>

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


  /**
   * Gets the next maneuver to be perform while navigating
   * @return {String} - The next maneuver text that is going to be displayed
   */
  getNextManeuver(){
      if(this.props.currentLeg.steps ){
        for (var i = 0; i < this.props.currentLeg.steps.length; i++) {
          if (this.props.currentLeg.steps[i].maneuver) {
            return this.props.currentLeg.steps[i].maneuver;
          }
        }
      }
      return ''

  }
}

const styles = StyleSheet.create({
  mapContainer:{
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: Dimensions.get('window').height - Header.HEIGHT - 70, //70 from the navigation bar
  },
  container_1:{
    flex: 1,

    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    height: 70,
    width: Dimensions.get('window').width,
    top: 0,

    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 1,
  },
  container: {

    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  map: {
    flexDirection: 'column',
     width: Dimensions.get('window').width,
     height: Dimensions.get('window').height - Header.HEIGHT - 70,
    // ...StyleSheet.absoluteFillObject
  },
  round: {
    width: 60,
    height: 60,
    backgroundColor: 'rgba(255,255,255,0.7)',
    borderRadius: 30

  },
  button: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',

  },
});

export default MapForm;

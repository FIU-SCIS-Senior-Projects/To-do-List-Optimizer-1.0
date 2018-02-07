import React, {Component} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet
} from 'react-native';

import {Actions} from 'react-native-router-flux';

import MapView from 'react-native-maps';

import NavigationBar from './NavigationBar';
import StartButton from './StartButton';

class MapForm extends Component {
  constructor(props) {
    super(props);


  }

  render() {
    console.log(this.props);
    return (
      <View style={styles.container}>

        <MapView
          // provider={this.props.provider}
          style={styles.map}
          initialRegion={this.props.currentRegion}
          scrollEnabled={true}
          showsUserLocation={true}
          region={this.props.currentRegion}
        >

          <MapView.Polyline
            key={0}
            coordinates={this.props.polyline}
            strokeColor="#077"
            fillColor="rgba(255,0,200,0.5)"
            strokeWidth={4}/>
            <View style={styles.buttonContainer}>
              {/* <TouchableOpacity
                onPress={() => this.route()} style={[styles.bubble, styles.button]}>
                <Text>Route</Text>
              </TouchableOpacity> */}
              {/* <TouchableOpacity
                onPress={this.props.center()} style={[styles.bubble, styles.button]}>
                <Text>Center</Text>
              </TouchableOpacity> */}
              {/* <TouchableOpacity
                onPress={this.props.overview()} style={[styles.bubble, styles.button]}>
                // disabled={!this.state.route.routed}>
                <Text>Overview</Text>
              </TouchableOpacity> */}
            </View>
            {/* <NavigationBar manouver='right turn' text='turn right' place='Walgreens' eta={34}/> */}
        </MapView>
          {/* <StartButton /> */}
      </View>);
  }
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  map: {
    ...StyleSheet.absoluteFillObject
  },
  bubble: {
    backgroundColor: 'rgba(255,255,255,0.7)',
    paddingHorizontal: 18,
    paddingVertical: 12,
    borderRadius: 20
  },
  latlng: {
    width: 200,
    alignItems: 'stretch'
  },
  button: {
    width: 80,
    paddingHorizontal: 12,
    alignItems: 'center',
    marginHorizontal: 10
  },
  buttonContainer: {
    flexDirection: 'row',
    marginVertical: 120,
    backgroundColor: 'transparent'
  }
});

export default MapForm;

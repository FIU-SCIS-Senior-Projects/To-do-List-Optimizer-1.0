import React, {Component} from 'react';
import {
  View,
  Text,
  TextInput,
  Dimensions,
  TouchableOpacity,
  StyleSheet
} from 'react-native';

import {Actions} from 'react-native-router-flux';

import MapView from 'react-native-maps';

const {width, height} = Dimensions.get('window');

const ASPECT_RATIO = width / height;
const LATITUDE = 26.14777;
const LONGITUDE = -81.79091;
const LATITUDE_DELTA = 0.0922;
const LATITUDE_DELTA_ZOOMED = 0.015;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
const LONGITUDE_DELTA_ZOOMED = LATITUDE_DELTA_ZOOMED * ASPECT_RATIO;

class MapForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      center: false,
      user: {
        latitude: LATITUDE,
        longitude: LONGITUDE
      },
      region: {
        latitude: LATITUDE,
        longitude: LONGITUDE,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA
      },
      route: {
        overview: {
          latitude: LATITUDE,
          longitude: LONGITUDE,
          latitudeDelta: LATITUDE_DELTA,
          longitudeDelta: LONGITUDE_DELTA
        },
        routed: false
      },
      polylines: []
    };
  }

  componentDidMount() {
    this.watchID = navigator.geolocation.watchPosition(position => {
      console.log("Manny: Watch position Triggered");
      this.setState({
        user: {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude
        }
      });
    });
  }

  componentWillUnmount() {
    navigator.geolocation.clearWatch(this.watchID);
  }

  decode(t) {
    for (var n, o, u = 0, l = 0, r = 0, d = [], h = 0, i = 0, a = null, c = Math.pow(10, 5); u < t.length;) {
      a = null,
      h = 0,
      i = 0;
      do
        a = t.charCodeAt(u++) - 63,
        i |= (31 & a) << h,
        h += 5;
      while (a >= 32);

      n = 1 & i ? ~ (i >> 1) : i >> 1,
      h = i = 0;

      do
        a = t.charCodeAt(u++) - 63,
        i |= (31 & a) << h,
        h += 5;
      while (a >= 32);

      o = 1 & i ? ~ (i >> 1) : i >> 1,
      l += n,
      r += o,
      d.push([
        l / c,
        r / c
      ])
    }
    return d = d.map(function(t) {
      return {latitude: t[0], longitude: t[1]}
    })
  }

  route() {
    const url = `https://maps.googleapis.com/maps/api/directions/json?origin=${this.state.user.latitude},${this.state.user.longitude}&destination=Hialeah,FL&waypoints=optimize:true|Broward,FL|Hollywood,FL`;

    fetch(url).then(response => response.json()).then(responseJson => {
      if (responseJson.routes.length) {
        var latitude = (responseJson.routes[0].bounds.northeast.lat + responseJson.routes[0].bounds.southwest.lat) / 2;
        var longitude = (responseJson.routes[0].bounds.northeast.lng + responseJson.routes[0].bounds.southwest.lng) / 2;
        this.setState({
          polylines: this.decode(responseJson.routes[0].overview_polyline.points), // definition below
          route: {
            overview: {
              latitude: latitude,
              longitude: longitude,
              latitudeDelta: (responseJson.routes[0].bounds.northeast.lat - latitude) * 2,
              longitudeDelta: (responseJson.routes[0].bounds.northeast.lng - longitude) * 2
            },
            routed: true
          }
        });
      }
    }).catch(e => {
      console.warn(e)
    });

    console.log(this.state.route.overview);

  }

  onPanDrag(e) {
    this.setState({
      region: {
        latitude: e.nativeEvent.coordinate.latitude,
        longitude: e.nativeEvent.coordinate.longitude,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA
      }
    });
  }

  center() {
    this.setState(previousState => {
      return {
        center: true,
        region: {
          latitude: previousState.user.latitude,
          longitude: previousState.user.longitude,
          longitudeDelta: LATITUDE_DELTA_ZOOMED,
          latitudeDelta: LONGITUDE_DELTA_ZOOMED
        }
      };
    });

  }

  overView() {
    this.setState(previousState => {
      return {
        center: true,
        region: {
          latitude: previousState.route.overview.latitude,
          longitude: previousState.route.overview.longitude,
          longitudeDelta: previousState.route.overview.longitudeDelta,
          latitudeDelta: previousState.route.overview.latitudeDelta
        }
      };
    });
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.center) {
      this.setState(previousState => {
        return ({
          center: false,
          user: {
            ...previousState.user
          },
          region: prevState.region
        });
      });
    }
  }
  componentWillMount() {
    console.log("Manny: Will mount launched!")
    navigator.geolocation.getCurrentPosition(position => {
      this.state = {
        user: {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude
        },
        region: {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          latitudeDelta: LATITUDE_DELTA,
          longitudeDelta: LONGITUDE_DELTA
        }
      };
    }, (error) => console.log(error.message), {
      enableHighAccuracy: true,
      timeout: 20000,
      maximumAge: 1000
    },);
  }

  render() {
    return (<View style={styles.container}>
      <MapView
        provider={this.props.provider}
        style={styles.map}
        initialRegion={this.state.region}
        scrollEnabled={true}
        showsUserLocation={true}
        region={this.state.center ? this.state.region : null}
        // onPanDrag={e => this.onPanDrag(e)}

        // onRegionChange={ region => this.setState({region}) }

        // onRegionChangeComplete={ region => this.setState({region}) }
      >

        <MapView.Polyline
          key={0}
          coordinates={this.state.polylines}
          strokeColor="#077"
          fillColor="rgba(255,0,200,0.5)"
          strokeWidth={4}/>
      </MapView>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          onPress={() => this.route()} style={[styles.bubble, styles.button]}>
          <Text>Route</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => this.center()} style={[styles.bubble, styles.button]}>
          <Text>Center</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => this.overView()} style={[styles.bubble, styles.button]}
          disabled={!this.state.route.routed}>
          <Text>Overview</Text>
        </TouchableOpacity>
      </View>
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
    marginVertical: 20,
    backgroundColor: 'transparent'
  }
});

export default MapForm;

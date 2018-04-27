import React, {Component} from 'react';
import {
  View,
  StyleSheet,
  Text,
  TextInput,
} from 'react-native';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as ActionCreators from '../actions/actions';
import {Actions} from 'react-native-router-flux';
import MapForm from '../components/map/MapForm';

MINIMUM_ARRIVAL_DISTANCE = 20;
class MapContainer extends Component{
  constructor(props){
    super(props);

    this.state = {
      arrived: false,
    }

    // Binding functions
    this.handleOverview = this.handleOverview.bind(this);
    this.handleCenter = this.handleCenter.bind(this);
    this.handleNavigation = this.handleNavigation.bind(this);
    this.handleDistance = this.handleDistance.bind(this);
    this.handleArrivedToPlace = this.handleArrivedToPlace.bind(this);
  }


  componentDidMount(){
    // We want to update the user location everytime it changes so we can update
    // the route
    this.watchId = navigator.geolocation.getCurrentPosition(
      (position) => {
        this.props.Actions.updateLocation(position);
        this.props.Actions.getRouteRequested();
        this.props.Actions.getRoute(this.props.user.location.coords,
                                    this.props.errands.places,
                                    true);
        this.setState({
          arrived: this.props.map.route.legs[0].distance.value < MINIMUM_ARRIVAL_DISTANCE,
         })

      }
      //,
      // (error) => this.setState({ error: error.message }),
      // { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 },
    );
  }

  componentDidUpdate(){
    if (this.state.arrived) {
      this.handleArrivedToPlace();
    }
  }

  componentWillUnmount() {
    // When component gets unmounted clear the watch on the user.
    navigator.geolocation.clearWatch(this.watchId);
  }

  render(){
    let legs = this.props.map.route.legs;

    return(
      <MapForm
        overview    = {this.handleOverview}
        center      = {this.handleCenter}
        navigate    = {this.handleNavigation}
        map         = {this.props.map}
        user        = {this.props.user}
        places      = {this.props.errands.places}
        arrived     = {this.handleArrivedToPlace}
        currentLeg  = {legs? legs[0] : {}}
        />
    );
  }

  handleOverview() {
    this.props.Actions.overview();
  }

  handleCenter() {
    this.props.Actions.center(this.props.user.location.coords);
  }

  handleDistance(){
    var origin = {location: this.props.user.location.coords};
    var destination = this.props.map.route.nonDestinationPlaces[0]

    this.props.Actions.getDistanceRequested();
    this.props.Actions.getDistanceToPlace(origin, destination);
  }

  handleNavigation(){
    if (this.props.map.navigating) {
      this.props.Actions.stopNavigation();
      this.props.Actions.overview();
    } else {
      this.props.Actions.startNavigation();
      this.props.Actions.center(this.props.user.location.coords);
    }
  }

  handleArrivedToPlace(){
    Actions.list({
      placeId: this.props.map.route.nonDestinationPlaces[
                              this.props.map.route.waypoint_order[0]].id,
    });
  }
}

function mapStateToProps(state) {
  return {
    map: state.map,
    user: state.user,
    errands: state.errands,
   };
}

function mapDispatchToProps(dispatch) {
  return {
    Actions: bindActionCreators(ActionCreators, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(MapContainer);

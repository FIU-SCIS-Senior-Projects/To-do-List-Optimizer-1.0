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

import MapForm from '../components/map/MapForm';

class MapContainer extends Component{
  constructor(props){
    super(props);

    this.handleOverview = this.handleOverview.bind(this);
    this.handleCenter = this.handleCenter.bind(this);
    this.handleNavigation = this.handleNavigation.bind(this);
    this.handleDistance = this.handleDistance.bind(this);
  }
/**
 * TODO: Getting the route before the component is mounted.
 */
  componentWillMount() {
    // this.props.Actions.getRoute(current, places, destination, true)
  }

  componentDidMount() {
    this.watchID = navigator.geolocation.watchPosition(position => {
      this.props.Actions.updateLocation(position);
    });
  }

  componentWillUnmount() {
    navigator.geolocation.clearWatch(this.watchID);
  }

  render(){
    let legs = this.props.map.route.legs;

    return(
      <MapForm
        overview={this.handleOverview}
        center={this.handleCenter}
        navigate={this.handleNavigation}
        map = {this.props.map}
        user = {this.props.user}
        places={this.props.errands.places}
        currentLeg={legs? legs[0] : {}}
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

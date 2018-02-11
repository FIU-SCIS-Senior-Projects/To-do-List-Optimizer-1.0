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

    let {currentRegion} =  this.props.map;
    let {overview_polyline} = this.props.map.route;
    let legs = this.props.map.route.legs;

    return(
      <MapForm
        overview={this.handleOverview}
        center={this.handleCenter}
        currentRegion={currentRegion}
        polyline={overview_polyline}
        currentLeg={legs? legs[0] : {}}/>
    );
  }

  handleOverview() {
    this.props.Actions.overview();
  }

  handleCenter() {
    this.props.Actions.center(this.props.user.location.coords);
  }
}

function mapStateToProps(state) {
  return {
    map: state.map,
    user: state.user
   };
}

function mapDispatchToProps(dispatch) {
  return {
    Actions: bindActionCreators(ActionCreators, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(MapContainer);

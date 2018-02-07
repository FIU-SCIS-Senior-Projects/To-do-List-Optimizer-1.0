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
  }
/**
 * TODO: Getting the route before the component is mounted.
 */
  componentWillMount() {
    // this.props.Actions.getRoute(current, places, destination, true)
  }

  componentDidMount() {
    this.watchID = navigator.geolocation.watchPosition(position => {
      console.log(position);
      this.props.Actions.updateLocation(position);
    });
  }

  componentWillUnmount() {
    navigator.geolocation.clearWatch(this.watchID);
  }

  render(){

    let {currentRegion} =  this.props.map;
    let {overview_polyline} = this.props.map.route;


    return(
      <MapForm
        overview={this.handleOverview}
        currentRegion={currentRegion}
        polyline={overview_polyline}/>
    );
  }

  handleOverview() {
    this.props.Actions.overview();
  }
}

function mapStateToProps(state) {
  return { map: state.map };
}

function mapDispatchToProps(dispatch) {
  return {
    Actions: bindActionCreators(ActionCreators, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(MapContainer);

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

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  render(){
    return(
      <MapForm />
    );
  }

  // handleSubmit(teamName) {
  //
  //   this.props.Actions.setTeamName(teamName)
  //   //Navigate to tabbar key
  //   RouteActions.tabbar();
  //
  // }
}

function mapDispatchToProps(dispatch) {
  return {
    Actions: bindActionCreators(ActionCreators, dispatch),
  };
}

export default connect(null, mapDispatchToProps)(WelcomeContainer);

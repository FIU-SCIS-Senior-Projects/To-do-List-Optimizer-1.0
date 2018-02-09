import React, {Component} from 'react';
import {
  View,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
} from 'react-native';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as ActionCreators from '../actions/actions';

import {Actions} from 'react-native-router-flux';

import MainForm from '../components/main/MainForm';


class MainContainer extends Component{
  constructor(props){
    super(props);

    this.state = {
      places:[
        {
          id: 10,
          name: 'Yerba Buena Center',
          location:{
            latitude: 37.7850153,
            longitude: -122.4023464,
          }
        },
        {
          id: 20,
          name: 'Tenderloin Museum',
          location: {
            latitude: 37.7838734,
            longitude: -122.41418340000001
          }
        },
        {
          id: 30,
          name: 'Transamerica Pyramid',
          location: {
            latitude:37.79518628639041,
            longitude: -122.40278005599976
          }
        },
      ],
      tasks:[
        {
          id: 100,
          description: 'Buy Vitamins',
          placeId: 10,
        },
        {
          id: 101,
          description: 'Buy Soap',
          placeId: 10,
        }
      ],
      destination:{
        id: 30,
        name: 'Blue Bottle Coffee',
        location:{
          latitude: 37.7862376,
          longitude: -122.4047807,
        }
      }
    }

    this.handleRoute = this.handleRoute.bind(this);
    this.handleAddErrand = this.handleAddErrand.bind(this);
  }

  componentWillMount(){
    navigator.geolocation.getCurrentPosition(
      (position) => {
        this.props.Actions.updateLocation(position);
      },
      (error) => this.setState({ error: error.message }),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 },
    );

  }

  render(){
    return(
      <MainForm addErrand={this.handleAddErrand} route={this.handleRoute}/>
    );
  }

  handleAddErrand(){

    this.state.places.forEach((place) => {
      this.props.Actions.addPlace(place);
    })

    this.state.tasks.forEach((place) => {
      this.props.Actions.addTask(place);
    })

    Actions.entry();
  }

  handleRoute() {
    this.props.Actions.getRouteRequested();
    this.props.Actions.getRoute(this.props.user.location.coords, this.props.errands.places, this.state.destination, true);
    Actions.tabbar();
  }
}


function mapStateToProps(state) {
  return {
    errands: state.errands,
    user: state.user
  };
}

function mapDispatchToProps(dispatch) {
  return {
    Actions: bindActionCreators(ActionCreators, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(MainContainer);

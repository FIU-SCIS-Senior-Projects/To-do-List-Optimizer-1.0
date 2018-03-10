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
import ErrandsList from '../components/main/ErrandsList';
import {formatTime} from '../tools/conversionTools';
import {isEmpty} from '../tools/ApiTools'

class MainContainer extends Component{
  constructor(props){
    super(props);

    this.state = {
      places:[
        {
          id: 1,
          name: 'Yerba Buena Center',
          address: '701 Mission St, San Francisco, CA 94103',
          location:{
            latitude: 37.7850153,
            longitude: -122.4023464,
          }
        },
        {
          id: 2,
          name: 'Tenderloin Museum',
          address: '398 Eddy St, San Francisco, CA 94102',
          location: {
            latitude: 37.7838734,
            longitude: -122.41418340000001
          }
        },
        {
          id: 3,
          name: 'Transamerica Pyramid',
          address: '600 Montgomery St, San Francisco, CA 94111',
          location: {
            latitude:37.79518628639041,
            longitude: -122.40278005599976
          }
        },
        {
          id: 4,
          name: 'Blue Bottle Coffee',
          address: '628 California St, San Francisco, CA 94109',
          location:{
            latitude: 37.7862376,
            longitude: -122.4047807,
          }
        },
      ],
      tasks:[
        {
          id: 100,
          description: 'Buy Vitamins',
          placeId: 1,
        },
        {
          id: 101,
          description: 'Buy Soap',
          placeId: 1,
        },
        {
          id: 102,
          description: 'Buy Shampoo',
          placeId: 1,
        },
        {
          id: 103,
          description: 'Buy Condoms',
          placeId: 1,
        },
        {
          id: 104,
          description: 'Buy Honey',
          placeId: 1,
        },
        {
          id: 105,
          description: 'Buy Batteries',
          placeId: 1,
        },
        {
          id: 106,
          description: 'Buy Water',
          placeId: 1,
        }
      ],
      updated: false
    }

    this.handleRoute = this.handleRoute.bind(this);
    this.handleAddErrand = this.handleAddErrand.bind(this);
    this.handleMap =  this.handleMap.bind(this);
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

  componentDidUpdate(){

    if (!isEmpty(this.props.errands.places) && this.props.user.location.coords && !this.state.updated) {

      this.setState((prev) =>{
        return {...prev, updated: true}
      });
      this.handleRoute();
    }
  }
  render(){
    return(
      <MainForm
        populated={Object.keys(this.props.errands.places).length > 0? true : false}
        eta={formatTime(this.props.map.route.total_time)}
        addErrand={this.handleAddErrand}
        map={this.handleMap}
        errands={this.props.errands}
        order={this.props.map.route.waypoint_order}
        navigating={this.props.map.navigating}/>

    );
  }


  handleAddErrand(){
    this.state.places.forEach((place) => {
      this.props.Actions.addPlace(place);
    })

    this.state.tasks.forEach((place) => {
      this.props.Actions.addTask(place);
    })

    this.setState((prev) =>{
      return {...prev, updated: false}
    })
    Actions.entry();
  }

  handleRoute() {
    this.props.Actions.getRouteRequested();
    this.props.Actions.getRoute(this.props.user.location.coords, this.props.errands.places, true);
  }

  handleMap(){
    this.props.Actions.overview();
    Actions.map();
  }
}


function mapStateToProps(state) {
  return {
    errands: state.errands,
    user: state.user,
    map: state.map
  };
}

function mapDispatchToProps(dispatch) {
  return {
    Actions: bindActionCreators(ActionCreators, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(MainContainer);

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
        // {
        //   id: 1,
        //   name: 'Yerba Buena Center',
        //   address: '701 Mission St, San Francisco, CA 94103',
        //   location:{
        //     latitude: 37.7850153,
        //     longitude: -122.4023464,
        //   }
        // },
        // {
        //   id: 2,
        //   name: 'Tenderloin Museum',
        //   address: '398 Eddy St, San Francisco, CA 94102',
        //   location: {
        //     latitude: 37.7838734,
        //     longitude: -122.41418340000001
        //   }
        // },
        // {
        //   id: 3,
        //   name: 'Transamerica Pyramid',
        //   address: '600 Montgomery St, San Francisco, CA 94111',
        //   location: {
        //     latitude:37.79518628639041,
        //     longitude: -122.40278005599976
        //   }
        // },
        // {
        //   id: 4,
        //   name: 'Blue Bottle Coffee',
        //   address: '628 California St, San Francisco, CA 94109',
        //   location:{
        //     latitude: 37.7862376,
        //     longitude: -122.4047807,
        //   }
        // },
        {
          id: 1,
          name: 'Home Depot',
          address: '11305 SW 40th St, Miami, FL 33165',
          location:{
            latitude: 25.7346975,
            longitude: -80.37806330000001,
          }
        },
        {
          id: 2,
          name: 'Pollo Tropical',
          address: '13998 SW 56th St, Miami, FL 33175',
          location: {
            latitude: 25.7138318,
            longitude: -80.41999929999997
          }
        },
        {
          id: 3,
          name: 'Navarro Pharmacy Discount',
          address: '14491 SW 42nd St, Miami, FL 33175',
          location: {
            latitude:25.7293617,
            longitude: -80.4292618
          }
        },
        {
          id: 4,
          name: 'MetroPCS',
          address: '14055 SW 88th St, Miami, FL 33186',
          location:{
            latitude: 25.687298,
            longitude: -80.42092819999999,
          }
        },
        // {
        //   id: 5,
        //   name: 'FIU PG6',
        //   address: 'Miami, Fl, 33174',
        //   location:{
        //     latitude: 25.759654,
        //     longitude: -80.374031,
        //   }
        // },
      ],
      tasks:[
        {
          id: 100,
          description: 'Buy Vitamins',
          completed: false,
          placeId: 3,
        },
        {
          id: 101,
          description: 'Buy Soap',
          completed: false,
          placeId: 3,
        },
        {
          id: 102,
          description: 'Buy Shampoo',
          completed: false,
          placeId: 3,
        },
        {
          id: 103,
          description: 'Buy Condoms',
          completed: false,
          placeId: 3,
        },
        {
          id: 104,
          description: 'Buy Honey',
          completed: false,
          placeId: 3,
        },
        {
          id: 105,
          description: 'Buy Batteries',
          completed: false,
          placeId: 1,
        },
        {
          id: 106,
          description: 'Buy Water',
          completed: false,
          placeId: 1,
        },
        {
          id: 107,
          description: 'Buy Wires',
          completed: false,
          placeId: 1,
        },
        {
          id: 108,
          description: 'Buy Cement',
          completed: false,
          placeId: 1,
        },
        {
          id: 109,
          description: 'Buy Bucket',
          completed: false,
          placeId: 1,
        },
        {
          id: 110,
          description: 'Buy Light',
          completed: false,
          placeId: 1,
        },
        {
          id: 111,
          description: 'Buy Glue',
          completed: false,
          placeId: 1,
        },
        {
          id: 112,
          description: 'Buy Plants',
          completed: false,
          placeId: 1,
        },
        {
          id: 113,
          description: 'Buy Fridge',
          completed: false,
          placeId: 1,
        },
        {
          id: 114,
          description: 'Buy Pot ground',
          completed: true,
          placeId: 1,
        },
        {
          id: 115,
          description: 'Buy Paint',
          completed: false,
          placeId: 1,
        },
        {
          id: 116,
          description: 'Buy paintBrush',
          completed: false,
          placeId: 1,
        },
      ],
      updated: false
    }

    this.handleRoute = this.handleRoute.bind(this);
    this.handleAddErrand = this.handleAddErrand.bind(this);
    this.handleMap =  this.handleMap.bind(this);
  }

  componentWillMount(){
    this.watchId = navigator.geolocation.getCurrentPosition(
      (position) => {
        console.log('updating location')
        if (!isEmpty(this.props.errands.places) && this.props.user.location.coords && !this.state.updated) {
          console.log('updating Ropute within location')
          this.handleRoute();
        }
        this.props.Actions.updateLocation(position);
      },
      (error) => this.setState({ error: error.message }),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 },
    );

  }

  componentWillUnmount() {
     navigator.geolocation.clearWatch(this.watchId);
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
    this.props.Actions.getRoute(this.props.user.location.coords , this.props.errands.places, true);
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

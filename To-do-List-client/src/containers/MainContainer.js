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


class MainContainer extends Component{
  constructor(props){
    super(props);

    this.state = {
      places:[
        {
          id: 10,
          name: 'Third Street South',
          location:{
            latitude: 26.1359886,
            longitude: -81.8024236,
          }
        },
        {
          id: 20,
          name: 'Tin City Shops',
          location:{
            latitude: 26.141244,
            longitude: -81.79052660000002,
          }
        },
        {
          id: 30,
          name: 'The Shelter Options Shoppe',
          location:{
            latitude: 26.1495793,
            longitude: -81.79478670000003,
          }
        }
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
      ]
    }

    this.handleRoute = this.handleRoute.bind(this);
  }

  componentWillMount(){
    navigator.geolocation.getCurrentPosition(
      (position) => {
        this.props.Actions.updateLocation(position);
      },
      (error) => this.setState({ error: error.message }),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 },
    );
    this.state.places.forEach((place) => {
      this.props.Actions.addPlace(place);
    })

    this.state.tasks.forEach((place) => {
      this.props.Actions.addTask(place);
    })
  }

  render(){
    return(
      <View>
        <TouchableOpacity
            onPress={() => {
              this.handleRoute();
            }}
          >
          <Text>
            Map
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
            onPress={() => {
              Actions.entry({

              });
            }}
          >
          <Text>
            Entry
          </Text>
        </TouchableOpacity>
      </View>
    );
  }

  handleRoute() {
    this.props.Actions.getRoute(this.props.user.location.coords, this.props.errands.places, this.props.user.location.coords, true);
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

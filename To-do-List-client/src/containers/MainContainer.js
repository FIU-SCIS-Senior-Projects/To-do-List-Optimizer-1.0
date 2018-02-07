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
        }
      ]
    }
  }

  componentDidMount(){
    this.props.Actions.addPlace(this.state.places[0]);
    this.props.Actions.addTask(this.state.tasks[0]);
  }

  render(){
    return(
      <View>
        <TouchableOpacity
            onPress={() => {
              Actions.tabbar();
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
}

function mapStateToProps(state) {
  return { errands: state.errands };
}

function mapDispatchToProps(dispatch) {
  return {
    Actions: bindActionCreators(ActionCreators, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(MainContainer);

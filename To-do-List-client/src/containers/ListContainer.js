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

import ListForm from '../components/List/ListForm'
class ListContainer extends Component{
  constructor(props){
    super(props);
  }

  render(){
    let id = this.props.placeId;

    // Getting list of all tasks
    let arrTasks = Object.keys(this.props.errands.tasks).map((key) => this.props.errands.tasks[key]);

    return(
      <ListForm
        place = {this.props.errands.places[id]}
        tasks = {arrTasks.filter((task) => task.placeId === id)}
      />
    );}
}


function mapStateToProps(state) {
  return {
    errands: state.errands,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    Actions: bindActionCreators(ActionCreators, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ListContainer);

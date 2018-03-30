import React, {Component} from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  Dimensions
} from 'react-native';

import { Header } from 'react-navigation';
import CheckBox from './CheckBox';

const {width, height} = Dimensions.get('window');

import PropTypes from 'prop-types';

export default class TaskList extends Component{
  constructor(props){
    super(props);
  }

  _keyExtractor = (task) => task.id;

  _renderItem = ({item}) => {
    console.log(item.completed)
    return (
      <View style={styles.container}>
        <CheckBox
          style     = {{width: '80%'}}
          checked   = {item.completed}
          label     = {item.description}
          onChange  = {(checked, entity) => console.log(entity)}
          entity    = {item}
        />
      </View>
  )};

  render(){
    console.log(this.props.tasks)
    return(
      <FlatList
        enableEmptySections = {true}
        data                = {this.props.tasks}
        keyExtractor        = {this._keyExtractor}
        renderItem          = {this._renderItem}
      />
    );
  }
}


/******************************************************************************
* Styles
******************************************************************************/

const styles = StyleSheet.create({
  container: {
    flexDirection:    'row',
    justifyContent:   "center",
    alignItems:       "center",
    width:            width,
  },
});

/******************************************************************************
* Props Setup
******************************************************************************/

CheckBox.propTypes = {
  tasks:              PropTypes.array.isRequired,
};

CheckBox.defaultProps = {
  tasks:              [],
};

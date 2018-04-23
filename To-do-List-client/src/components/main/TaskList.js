import React, {Component} from 'react';
import {
  View,
  Text,
  TextInput,
  Dimensions,
  TouchableOpacity,
  StyleSheet,
  Image,
  FlatList,
  Platform,
  TouchableWithoutFeedback
} from 'react-native';

import { Header } from 'react-navigation';
import CheckBox from '../List/CheckBox'

const {width, height} = Dimensions.get('window');

class TaskList extends React.PureComponent {
  constructor(props){
    super(props);
  }

  _keyExtractor = (item, index) => item.id;

  // _onPressItem = (id) => {
  //   // updater functions are preferred for transactional updates
  //   this.setState((state) => {
  //     return {...state, selected: state.selected === id? -1 : id};
  //   });
  // };

  _renderItem = ({item}) => (
    <View style={styles.container}>
      <CheckBox
        style     = {{width: '80%'}}
        checked   = {false}
        label     = {item.description}
        onChange  = {(checked, entity) => console.log(entity)}
        entity    = {item}
      />
    </View>

  );

  render(){
    return(
      <FlatList
        enableEmptySections
        data={Object.values(this.props.tasks)}
        keyExtractor={this._keyExtractor}

        renderItem={
          this._renderItem
        }
      />
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection:    'row',
    justifyContent:   "center",
    alignItems:       "center",
    width:            width,
  },
  text: {
    fontSize: 16,
    fontFamily: 'Lato',
    color: 'white'
  },
});

export default TaskList;

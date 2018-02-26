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
      <Text style={styles.text}>
        {item.description}
      </Text>
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
    height: 20,
  },
  text: {
    fontSize: 16,
    fontFamily: 'Lato',
    color: 'white'
  },
});

export default TaskList;

import React, {Component} from 'react';
import {
  View,
  Dimensions,
  StyleSheet,
  FlatList,
  Platform,
  TouchableWithoutFeedback
} from 'react-native';

import { Header } from 'react-navigation';

import CardItem from './CardItem'

const {width, height} = Dimensions.get('window');

class ErrandsList extends Component{
  constructor(props){
    super(props);

    this.state = {
      selected: -1,
      places: props.errands.places,
      tasks: props.errands.tasks,
    }
  }

  _keyExtractor = (item, index) => item.id;

  _onPressItem = (id) => {
    this.setState((state) => {
      return {...state, selected: state.selected === id? -1 : id};
    });
  };

  _renderItem = ({item}) => (
    <CardItem
      id={item.id}
      count={Object.values(this.state.places).length}
      onPressItem={this._onPressItem}
      selected={this.state.selected}
      tasks={item.tasks.map(id => {return (this.state.tasks[id])})}
      name={item.name}
      address={item.address}
    />
  );

  render(){
    return(
      <FlatList
        enableEmptySections={true}
        data={Object.values(this.state.places)}
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
    flex: 1,
    padding: 12,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    width: width,
    backgroundColor: "#000000",
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 10,
    elevation: 1,
  },
  text: {
    fontSize: 16,
    fontFamily: 'Lato',
    color: 'white'
  },
  text_address: {
    fontSize: 10,
    fontFamily: 'Lato',
    color: 'white'
  },
});



export default ErrandsList;

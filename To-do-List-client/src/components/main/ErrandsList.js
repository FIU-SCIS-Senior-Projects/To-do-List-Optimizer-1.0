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

import colors from '../../tools/colorTools';

const {width, height} = Dimensions.get('window');

// const SELECTED_HEIGHT = height - 80 - Header.HEIGHT; //the 80 is the HEIGHT of the option bar
const NORMAL_HEIGHT = 80;
const UNSELECTED_HEIGHT = 20;

class MyListItem extends React.PureComponent {
  _onPress = () => {
    this.props.onPressItem(this.props.id);
  };

  _calculateSize(){
    return height - 80 - Header.HEIGHT - (this.props.count-1)*(UNSELECTED_HEIGHT + 1)
  }

  render() {
    let view_height = 0
    if (this.props.selected === -1) {
      view_height = NORMAL_HEIGHT;
    } else if (this.props.selected === this.props.id) {
      view_height = this._calculateSize();
    }
    else {
      view_height = UNSELECTED_HEIGHT = 20;
    }

    console.log(this.props.count)
    return (
      <TouchableWithoutFeedback onPress={this._onPress}>
        <View style={[styles.container, {top: -5, height:view_height, backgroundColor: colors[this.props.id%5]}]} >
          <Text style={styles.text}>
            {this.props.name}
          </Text>
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

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

  renderSeparator = () => {
    return (
      <View
        style={{
          height: 1,
          backgroundColor: "#000000",
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.8,
          shadowRadius: 5,
          elevation: 1,
        }}
      />
    );
  };
  _onPressItem = (id) => {
    // updater functions are preferred for transactional updates
    this.setState((state) => {
      return {...state, selected: state.selected === id? -1 : id};
    });
  };

  _renderItem = ({item}) => (
    <MyListItem
      id={item.id}
      count={Object.values(this.state.places).length}
      onPressItem={this._onPressItem}
      selected={this.state.selected}
      name={item.name}
    />
  );

  render(){
    return(

      <FlatList
        enableEmptySections
        data={Object.values(this.state.places)}
        keyExtractor={this._keyExtractor}
        // ItemSeparatorComponent={this.renderSeparator}
        renderItem={
          // ({item}) => (
          //   <View style={[styles.container, {height: UNSELECTED_HEIGHT,backgroundColor: colors[item.id%5],}]}>
          //     <Text style={styles.text}>{item.name}</Text>
          //   </View>
          // )
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
});



export default ErrandsList;

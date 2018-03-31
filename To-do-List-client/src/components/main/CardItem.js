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
import TaskList from './TaskList'

const {width, height} = Dimensions.get('window');


const NORMAL_HEIGHT = 80;
const UNSELECTED_HEIGHT = 20;

class CardItem extends React.PureComponent {
  _onPress = () => {
    this.props.onPressItem(this.props.id);
  };

  _calculateSize(){
    return height - 80 - Header.HEIGHT - (this.props.count-1)*(UNSELECTED_HEIGHT + 1)
  }

  _renderStackedCard(){
    return(
      <TouchableWithoutFeedback onPress={this._onPress}>
        <View style={[styles.container, {top: -5, height:NORMAL_HEIGHT, backgroundColor: colors[this.props.id%5]}]} >
          <View style={{flex: 1}}>
            <Text style={styles.text}>
              {this.props.name}
            </Text>
            <Text style={styles.text_address}>
              {this.props.address}
            </Text>
          </View>
        </View>
      </TouchableWithoutFeedback>
    )
  }

  _renderCompressedCard(){
    return(
      <TouchableWithoutFeedback onPress={this._onPress}>
        <View style={[styles.container, {top: -5, height:UNSELECTED_HEIGHT, backgroundColor: colors[this.props.id%5]}]} >

        </View>
      </TouchableWithoutFeedback>
    )
  }

  _renderExtendedCard(){
    return(

        <View style={[styles.container, {top: -5, height:this._calculateSize(), backgroundColor: colors[this.props.id%5]}]} >
          <TouchableWithoutFeedback onPress={this._onPress}>
            <View style={{flex: 1}}>
              <Text style={styles.text}>
                {this.props.name}
              </Text>
              <Text style={styles.text_address}>
                {this.props.address}
              </Text>
            </View>
          </TouchableWithoutFeedback>
          <View style={{flex: 2, flexDirection: 'column', alignItems: 'center'}}>
              <TaskList tasks={this.props.tasks}/>
            </View>
          </View>

    )
  }

  render() {
    let view_height = 0
    if (this.props.selected === -1) {
      return this._renderStackedCard();
    } else if (this.props.selected === this.props.id) {
      return this._renderExtendedCard();
    }
    else {
      return this._renderCompressedCard();
    }

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
    borderTopLeftRadius:  10,
    borderTopRightRadius: 10,
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

export default CardItem;

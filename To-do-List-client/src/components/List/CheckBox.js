import React, {Component} from 'react'
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
} from 'react-native';


import PropTypes from 'prop-types';

CHECKED_IMAGE   = require('../../assets/icons/checkBox/checked.png');
UNCHECKED_IMAGE = require('../../assets/icons/checkBox/unchecked.png');

DEFAULT_HEIGHT      = 50;

export default class CheckBox extends Component {
  constructor(props){
    super(props);

    this.state = {
      checked:  false,
    }
  }

  /**
   * Changes the state of the checkbox
   * @return {void}
   */
  toggle(){
    this.setState(
      (previousState) =>
      {
          return {
            checked:  !previousState.checked,
          };
      });
  }

  render(){

    return (
      <View style={[styles.container, this.props.style]}>
        <TouchableOpacity
          style    ={styles.checkButton}
          onPress  ={() => {
              this.props.onChange(!this.state.checked, this.props.entity);
              this.toggle();
            }
          }
        >
          <Image
            style       ={styles.image}
            resizeMode  ="contain"
            source      ={ this.state.checked ? CHECKED_IMAGE : UNCHECKED_IMAGE}>
          </Image>
        </TouchableOpacity>
        <View style = {styles.textContainer}>
          <Text style = {styles.normalText}>
            {this.props.label}
          </Text>
        </View>
      </View>
    );
  }
}

/******************************************************************************
* Styles
******************************************************************************/

const styles = StyleSheet.create({
  container:{
    flexDirection:      'row',
    alignContent:       'center',
    padding:            5,
    width:              '100%',
    height:             DEFAULT_HEIGHT,
  },
  textContainer: {
    paddingLeft:        10,
    justifyContent:     'center',
  },
  checkButton: {
    flexDirection:      'column',
    justifyContent:     'center',
    alignContent:       'center',
    height:             '100%',

  },
  image: {
    height:             40,
    width:              40,
  },
  boldText: {
    fontSize:           18,
    fontWeight:         'bold',
    fontFamily:         'Lato',
  },
  normalText: {
    fontSize:           18,
    fontFamily:         'Lato',
    color:              'white',
  },
})

/******************************************************************************
* Props Setup
******************************************************************************/

CheckBox.propTypes = {
  onChange:           PropTypes.func,
  onChangeText:       PropTypes.func,
  label:              PropTypes.string,
  style:              PropTypes.object,
  entity:             PropTypes.object,
};
CheckBox.defaultProps = {
  label:              'label',
  style:              {},
};

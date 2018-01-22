import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {
  View,
  Text,
  TextInput,
  Dimensions,
  TouchableOpacity,
  StyleSheet
} from 'react-native';

class Place extends Component{
  constructor(props){
    super(props);
  }

  render(){
    let { name, coordinates } = this.props;
    return(
      <View>
        <Text>
          {name}
        </Text>
      </View>
    );
  }
}

Place.defaultProps = {
  name: '',
  coordinates: {
    latitude: 123,
    longitude: 32,
  }
};

Place.propTypes = {
  name: PropTypes.string.isRequired,
  coordinates: PropTypes.object.isRequired,
};


export default Place;

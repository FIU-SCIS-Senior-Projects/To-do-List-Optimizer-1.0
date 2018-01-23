import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {
  View,
  Text,
  TextInput,
  Dimensions,
  TouchableOpacity,
  Image,
  StyleSheet
} from 'react-native';

class Place extends Component{
  constructor(props){
    super(props);
  }

  render(){
    let { name, coordinates } = this.props;
    return(
      <View style={styles.container}>
        <Image source={ require('../assets/icons/map-marker.png')} style={styles.photo} />
        <TouchableOpacity>
          <Text style={styles.text}>
            {name}
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 12,
    flexDirection: 'row',
    alignItems: 'center',
  },
  text: {
    marginLeft: 12,
    fontSize: 16,
  },
  photo: {
    height: 40,
    width: 40,
    borderRadius: 20,
  },
});

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

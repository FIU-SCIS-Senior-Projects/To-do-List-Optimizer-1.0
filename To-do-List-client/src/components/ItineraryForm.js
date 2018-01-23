import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {
  View,
  Text,
  TextInput,
  Dimensions,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  ListView,
} from 'react-native';

import {Actions} from 'react-native-router-flux';

import {getRoute} from '../API/google'

import Place from './Place';

class ItineraryForm extends Component{
  constructor(props){
    super(props);

    this.getPlaces = this.getPlaces.bind(this);
  }
  render(){
    return(
      <View style={styles.container}>
        {/* <ListView>

        </ListView> */}
        <ScrollView>
          {this.getPlaces()}
        </ScrollView>


        <TouchableOpacity
            onPress={() => {
              Actions.map({

              });
            }}
          >
          <Text>
            Map
          </Text>
        </TouchableOpacity>
      </View>
    );
  }

  getPlaces(){
    let {places} =  this.props.route;
    console.log(places)
    return places.map((place, i) => {
      return(<Place key={i} name={place.name} location={place.location} />);
    })
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

ItineraryForm.propTypes = {
  route: PropTypes.object.isRequired,
}

export default ItineraryForm;

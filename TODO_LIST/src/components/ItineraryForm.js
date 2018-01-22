import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {
  View,
  Text,
  TextInput,
  Dimensions,
  TouchableOpacity,
  StyleSheet,
  ScrollView
} from 'react-native';

import {Actions} from 'react-native-router-flux';

import Place from './Place';

class ItineraryForm extends Component{
  constructor(props){
    super(props);

    this.getPlaces = this.getPlaces.bind(this);
  }
  render(){
    console.log(this.props.route);
    return(
      <View>
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

    return Object.keys(places).map((id, i) => {
      return(<Place key={i} name={places[id].name} location={places[id].location} />);
    })
  }
}



ItineraryForm.propTypes = {
  route: PropTypes.object.isRequired,
}

export default ItineraryForm;

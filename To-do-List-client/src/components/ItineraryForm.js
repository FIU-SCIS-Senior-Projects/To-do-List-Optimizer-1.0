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

import {getRoute} from '../api/googleApi'

import Place from './Place';

/** Defines the components that go into the ItineraryContainer */
class ItineraryForm extends Component{
  constructor(props){
    super(props);

    this.state = {
      user: {
        location: {
          latitude: 0,
          longitude: 0,
        }
    },
    order: [],
  }

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
  componentDidMount() {
    // getting the current GPS coordinates of the user
    navigator.geolocation.getCurrentPosition(
      (position) => {
        this.setState({
          user:{
            location: {
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
            }
          },
          error: null,
        });
      },
      (error) => this.setState({ error: error.message }),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 },
    );

    // sets the watcher so when the user changes coordinates it updates the class
    this.watchID = navigator.geolocation.watchPosition(position => {
      this.setState({
        user: {
          location:{
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
          }
        }
      });
    });
  }

  componentWillUnmount() {
    navigator.geolocation.clearWatch(this.watchID);
  }

  /**
  * Callback function that is pass to the getRoute method that takes care of
  * updating the state of the class once the request to the google API has been made.
  * @param {ItineraryForm} currentClass - an instance of the current class
  * @param {object} answer - contains the answer already parsed from the google API
  *                           call getRoute
  */
  update(currentClass,answer){
    currentClass.setState({
      order: answer.route.order,
    });
  }

  /**
  * Generates the elements in the ScrollView.
  * @return {JSX} - elements that are gonna be in the ScrollView
  */
  getPlaces(){
    let {places, destination} =  this.props.route;

    // checking that the request from the google API hasnt arrived yet, then
    // the size of the order array should be 0
    if (!this.state.order.length) {

      getRoute(this.state.user.location,
        places,
        destination,
        true,
        this,
        this.update);
      return null;
    }
    else{
      return this.state.order.map((i,id)=>{
        return(<Place key={id} name={places[i].name} location={places[i].location} />);
      });
    }

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

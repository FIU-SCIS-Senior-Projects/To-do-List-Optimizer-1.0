import React, {Component} from 'react';
import {
  View,
  StyleSheet,
  Text,
  TextInput,
} from 'react-native';

import ItineraryForm from '../components/ItineraryForm';

class ItineraryContainer extends Component{
  constructor(props){
    super(props);

    this.state = {
      route: {
        order: [0,1,2],
        places:{
          1:{
            name: 'Place 1',
            location:{
              latitude: 1,
              longitude: 2,
            }
          },
          2:{
            name: 'Place 2',
            location:{
              latitude: 1,
              longitude: 2,
            }
          },
          3:{
            name: 'Place 3',
            location:{
              latitude: 2,
              longitude: 3,
            }
          }
        }
      }
    }
  }

  render(){
    console.log(this.state.route);
    return(
      <ItineraryForm route={this.state.route}/>
    );
  }
}

export default ItineraryContainer

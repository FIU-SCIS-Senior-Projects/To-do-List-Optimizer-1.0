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
        places:[
          {
            name: 'Third Street South',
            location:{
              latitude: 26.1359886,
              longitude: -81.8024236,
            }
          },
          {
            name: 'Tin City Shops',
            location:{
              latitude: 26.141244,
              longitude: -81.79052660000002,
            }
          },
          {
            name: 'The Shelter Options Shoppe',
            location:{
              latitude: 26.1495793,
              longitude: -81.79478670000003,
            }
          }
        ]
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

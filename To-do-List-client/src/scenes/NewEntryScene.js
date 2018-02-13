import React, {Component} from 'react';
import {View, Text, Image, StyleSheet, TouchableOpacity} from 'react-native';

//Actions is provided by the router for dynamic routing
import {Actions} from 'react-native-router-flux';
import NewEntryContainer from '../containers/NewEntryContainer'
// import WelcomeContainer from '../containers/WelcomeContainer';

class NewEntryScene extends Component {
  constructor(props) {
    super(props);
    this.state = { text: ''};
  }
  render() {
    return(
      <NewEntryContainer />
    )
  }







}



/*TODO
  1. get text from input

  2. make api request to google
  3. parse response
  4. display options
  5. get selected option
  6. update DB with selected place
  7. update store when db is updated
  8.
*/






export default NewEntryScene;

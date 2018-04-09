import React, {Component} from 'react';
import {
  View,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
} from 'react-native';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as ActionCreators from '../actions/actions';

import {Actions} from 'react-native-router-flux';


class LoginContainer extends Component{
  constructor(props){
    super(props);
  }



  render(){

    return(
      <View>

      {/* <WelcomeContainer /> */}
      <TouchableOpacity
          onPress={() => {
            Actions.main({

            });
          }}
        >
        <Text>
          Login
        </Text>
      </TouchableOpacity>
    </View>

      );
    }



  }


  function mapStateToProps(state) {
    return {
      errands: state.errands,
      user: state.user
    };
  }

  function mapDispatchToProps(dispatch) {
    return {
      Actions: bindActionCreators(ActionCreators, dispatch),
    };
  }

  export default connect(mapStateToProps, mapDispatchToProps)(LoginContainer);

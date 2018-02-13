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

import MainForm from '../components/main/MainForm';
import NewEntryForm from '../components/entry/NewEntryForm';


const GOOGLE_API_KEY = "AIzaSyCq3vcvjUUk1yJKLVmE31K-0YRaQptm61Q";






class NewEntryContainer extends Component{
  constructor(props){
    super(props);

    this.state = {
      response: []
    };
    this.processText = this.processText.bind(this);
    this.getUrl = this.getUrl.bind(this);
    this.handleResponse = this.handleResponse.bind(this);

    // this.handleRoute = this.handleRoute.bind(this);
    // this.handleAddErrand = this.handleAddErrand.bind(this);
  }



  render(){

    return(
      <NewEntryForm placesList={this.state.response} userLocation={this.props.user.location.coords} onChange={this.processText} />

      );
    }

    // handleAddErrand(){
    //
    //   this.state.places.forEach((place) => {
    //     this.props.Actions.addPlace(place);
    //   })
    //
    //   this.state.tasks.forEach((place) => {
    //     this.props.Actions.addTask(place);
    //   })
    //
    //   Actions.entry();
    // }
    //
    // handleRoute() {
    //   this.props.Actions.getRouteRequested();
    //   this.props.Actions.getRoute(this.props.user.location.coords, this.props.errands.places, this.state.destination, true);
    //   Actions.tabbar();
    // }
    processText(text){
      if(text != ''){
        fetch(this.getUrl(text, this.props.user.location.coords))
        .then(response => response.json())
        .then((responseJson) => this.handleResponse(responseJson));
      }
    }
    getUrl(text, coords){

      var url = "https:\/\/maps.googleapis.com\/maps\/api\/place\/autocomplete\/json"
      + "?input="
      + text
      + "&location="
      + coords.longitude
      + ","
      + coords.latitude
      + "&key="
      + GOOGLE_API_KEY;

      return url
    }

    handleResponse(response){
      if (response.status == "OK"){
        this.setState({
          response: response.predictions
        });
      }
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

  export default connect(mapStateToProps, mapDispatchToProps)(NewEntryContainer);

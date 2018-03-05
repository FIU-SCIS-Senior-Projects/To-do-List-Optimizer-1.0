import React, {Component} from 'react';
import {
  View,
  Text,
  TextInput,
  Dimensions,
  TouchableOpacity,
  StyleSheet,
  Image
} from 'react-native';

const {width, height} = Dimensions.get('window');

class RoundButton extends Component{
  constructor(props){
    super(props);
    console.log(props);

    this.state = {
      text: '+',
    }
  }
  componentWillMount(){
    let customStyle = {}
    if (this.props.type === 'add') {

      this.setState(previousState => {
        return {
          text: '+',
          }
      });
    }
    else if (this.props.type === 'route') {

      this.setState(previousState => {
        return {
          text: 'START',
          }
      });

    }
  }
  render(){
    return(
          <TouchableOpacity
            style={
              [styles.roundButton,
                {
                  height: this.props.diameter,
                  width: this.props.diameter,
                  borderRadius: this.props.diameter/2,
                }
              ]}
            onPress={() => this.props.onPress()}>
            <Text style={styles.text}>{this.state.text}</Text>
          </TouchableOpacity>
    );
  }
}


const styles = StyleSheet.create({
  container:{
    flex: 1,
    // flexDirection: 'column',
    // alignItems: 'center',
    // justifyContent: 'center',
  },
  roundButton:{
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#3EFF8E',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 1,
  },
  text:{
    fontSize: 16,
    color: 'black'
  },
})
export default RoundButton;

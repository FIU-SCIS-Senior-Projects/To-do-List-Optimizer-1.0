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

class StartButton extends Component{
  constructor(props){
    super(props);
  }

  render(){
    return(
      <View style={styles.container}>
        <TouchableOpacity style={styles.outerButton}>
          <TouchableOpacity style={styles.innerButton}>
            <Text style={styles.text}>
              START
            </Text>
          </TouchableOpacity>
        </TouchableOpacity>
      </View>
    );
  }
}


const styles = StyleSheet.create({
  container:{
    flex: 1,
    ...StyleSheet.absoluteFillObject,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  outerButton:{
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255,255,255,0.5)',
    height: 180,
    width: 180,
    borderRadius: 90
  },
  innerButton:{
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255,255,255,0.7)',
    height: 150,
    width: 150,
    borderRadius: 80
  },
  text:{
    fontSize: 16,
    fontWeight: 'bold',
  }
})
export default StartButton;

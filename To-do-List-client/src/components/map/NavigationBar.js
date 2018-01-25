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

class NavigationBar extends Component{
  constructor(props){
    super(props);
  }

  render(){
    let {manouver, text, place, eta} = this.props
    return(
      <View style={styles.container}>
        <View style={styles.placeContainer}>
            <Text style={styles.placeText}>{place}</Text>
            <Text style={styles.etaText}>{eta} min</Text>
        </View>
        <View style={styles.direcctionContainer}>
          <Image source={ require('../../assets/icons/navigation/turn-right.png')} style={styles.photo} />
          <Text style={styles.text}>
            {text}
          </Text>
      </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container:{
    flex: 1,
    ...StyleSheet.absoluteFillObject,
    height: 70,
    flexDirection: 'column',
  },
  placeContainer:{
    flex: 4,
    flexDirection: 'row',
    alignItems:'center',
    alignContent: 'flex-start',
    backgroundColor: 'rgba(200,200,200,0.9)',
  },
  direcctionContainer: {
    flex: 6,
    padding: 3,
    paddingLeft: 10,
    flexDirection: 'row',
    alignItems:'center',
    backgroundColor: 'rgba(255,255,255,0.7)',
  },
  placeText: {
    flex: 4,
    marginLeft: 10,
    fontSize: 16,
    fontWeight: 'bold',
    // alignSelf: 'center'
  },
  etaText: {
    flex: 1,
    marginLeft: 10,
    fontSize: 16,
  },
  text: {
    // flex: 4,
    marginLeft: 12,
    fontSize: 16,
    // alignSelf: 'center'
  },
  photo: {
    // flex: 2,
    height: '90%',
    width: 30,
    // borderRadius: 20,
    // paddingLeft: 10
  },
});

export default NavigationBar;

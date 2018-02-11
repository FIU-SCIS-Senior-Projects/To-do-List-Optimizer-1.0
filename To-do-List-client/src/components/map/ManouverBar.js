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

class ManouverBar extends Component{
  constructor(props){
    super(props);
  }

  render(){
    return(
      <View style={styles.container}>
        <View style={styles.iconContainer}>
          <Image
            style={{width: 45, height: 45}}
            resizeMode="contain"
            source={ require('../../assets/icons/navigation/turn-right.png')}></Image>
            <Text style={styles.manouverText}>{this.props.maneuver}</Text>
        </View>
        <View style={styles.etaContainer}>
          <Text style={styles.etaText}>
            {this.props.eta}
          </Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container:{
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    height: 70,
    width: Dimensions.get('window').width,
    top: 0,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 1,
  },
  iconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    paddingLeft: 10,
  },
  etaContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    paddingLeft: 10,
  },
  manouverText: {
    paddingLeft: 10
  },
  etaText: {
    position: 'absolute',
    right: 10,
  }

})
export default ManouverBar;

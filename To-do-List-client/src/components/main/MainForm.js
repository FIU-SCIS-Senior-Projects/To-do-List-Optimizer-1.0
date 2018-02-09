import React, {Component} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet
} from 'react-native';

import {Actions} from 'react-native-router-flux';

import RoundButton from './RoundButton';
import OptionsBar from './OptionsBar';

class MainForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      added: false
    }

    this.emptyListView = this.emptyListView.bind(this);
    this.populatedListView = this.populatedListView.bind(this);
  }

  render(){
    return(
        !this.state.added ? this.emptyListView() : this.populatedListView()
    );
  }


  emptyListView(){
    return (
      <View style={[styles.container, styles.emptyContainer]}>
        <RoundButton
        diameter={75}
        onPress = {()=>{
          this.setState(previousState => {
              return { added: true };
            });
            this.props.addErrand();
            }
          }/>
      </View>)
  }

  populatedListView(){
    return (
      <View style={[styles.container, styles.populatedContainer]}>
          <OptionsBar addErrand={this.props.addErrand} route={this.props.route}/>

      </View>
    )
  }

}



const styles = StyleSheet.create({
  container:{
    ...StyleSheet.absoluteFillObject,
    flexDirection: 'column',
    justifyContent: 'center',
    backgroundColor:'#54C4C8',
  },
  emptyContainer: {
    alignItems: 'center',
  },
  populatedContainer: {
    alignContent: 'flex-end'
  }

});

export default MainForm;

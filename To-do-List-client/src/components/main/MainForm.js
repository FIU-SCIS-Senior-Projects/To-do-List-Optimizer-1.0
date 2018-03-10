import React, {Component} from 'react';
import {
  View,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

import {Actions} from 'react-native-router-flux';

import RoundButton from './RoundButton';
import OptionsBar from './OptionsBar';
import ErrandsList from './ErrandsList'

class MainForm extends Component {
  constructor(props) {
    super(props);

    this.emptyListView = this.emptyListView.bind(this);
    this.populatedListView = this.populatedListView.bind(this);
  }

  render(){
    return(
        !this.props.populated ? this.emptyListView() : this.populatedListView()
    );
  }

  emptyListView(){
    return (
      <View style={[styles.container, styles.emptyContainer]}>
        <RoundButton
        diameter={75}
        onPress = {()=>{
            this.props.addErrand();
            }
          }/>
      </View>)
  }

  populatedListView(){
    return (
      <View style={[styles.container, styles.populatedContainer]}>
          <ErrandsList order={this.props.order} errands={this.props.errands}/>
          <OptionsBar
            eta={this.props.eta}
            navigating={this.props.navigating}
            addErrand={this.props.addErrand}
            map={this.props.map}/>

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

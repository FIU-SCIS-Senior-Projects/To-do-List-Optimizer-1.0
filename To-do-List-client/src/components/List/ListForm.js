import React, {Component} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Image,
} from 'react-native';

import {Actions} from 'react-native-router-flux';
import CheckBox from './CheckBox';
import TaskList from './TaskList';

DRAG_DOWN_IMAGE = require('../../assets/icons/drag-down-arrow.png');

class ListForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      tasks: this.props.tasks,
    }
  }

  _completeAllTasks(){
    this.setState((prevState) => {
      var tasks = prevState.tasks;

      tasks.forEach(function(task, index) {
        tasks[index] = {
          ...tasks[index],
          completed: true
        }
      });

      return {
        tasks: tasks
      }
    })

  }

  render(){
    return(
      <View style={styles.container}>
        {/* Drag Down */}
        <View style = {styles.dragDownContainer}>
          <TouchableOpacity
              onPress     = {Actions.pop}
            >
            <Image
              style       = {styles.image}
              resizeMode  = "contain"
              source      = {DRAG_DOWN_IMAGE}
              >
            </Image>
          </TouchableOpacity>
        </View>

        {/* Current Place Header */}
        <View style = {styles.placeNameContainer}>
          <Text style={styles.boldText}>{this.props.place.name}</Text>
          <Text style={styles.placeAddressText}>{this.props.place.address}</Text>
        </View>

        {/* List of Tasks */}
        <View style = {styles.tasksContainer}>
          <TaskList
            tasks = {this.state.tasks}
          />
        </View>

        {/* Controls */}
        <View style = {styles.controlContainer}>
          <TouchableOpacity style = {styles.backButton} onPress={() => {this._completeAllTasks()}}>
            <Text style = {styles.buttonText}>
              COMPLETE ALL
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}


/******************************************************************************
* Styles
******************************************************************************/

const styles = StyleSheet.create({
  container: {
    flex:             1,
    justifyContent:   "center",
    alignItems:       "center",
    backgroundColor:  "#6D6597",
  },
  placeNameContainer: {
    flexDirection:    'column',
    width:            '100%',
    height:           '10%',
    justifyContent:   "center",
    alignItems:       "center",
  },
  tasksContainer: {
    flexDirection:    'column',
    // justifyContent:   "center",
    alignItems:       "center",
    width:            '100%',
    height:           '70%',
  },
  dragDownContainer: {
    flexDirection:    'column',
    justifyContent:   "center",
    alignItems:       "center",
    padding:          5,
    width:            '100%',
    height:           '10%',
  },
  controlContainer: {
    flexDirection:    'row',
    width:            '100%',
    height:           '10%',
    justifyContent:   "center",
    alignItems:       "center",
  },
  backButton: {
    justifyContent:   'center',
    alignItems:       'center',
    height:           '80%',
    width:            '90%',
    backgroundColor:  'rgba(255, 255, 255,0.9)',
    borderRadius:     10,
  },
  boldText: {
    fontSize:           18,
    fontWeight:         'bold',
    fontFamily:         'Lato',
    color:              'white'
  },
  placeAddressText: {
    fontSize:           12,
    fontFamily:         'Lato',
    color:              'white',
  },
  buttonText: {
    fontSize:           16,
    fontFamily:         'Lato',
    color:              'black',
  },
  image: {
    height:             30,
    width:              30,
  },
});

/******************************************************************************
* Props Setup
******************************************************************************/

export default ListForm;

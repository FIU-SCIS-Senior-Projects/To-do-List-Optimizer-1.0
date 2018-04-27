import React, { Component } from 'react'
import {Text, Image} from 'react-native'

/**
 * Navigation Tab
 */
const Tab = ({selected, title}) => {

  // let defaultStyles = {
  //   color: selected ? 'green' :'black',
  //   alignItems: 'flex-start',
  //   fontSize: 12,
  //   marginBottom: -6,
  //   marginLeft: -5
  // };
  let defaultStyles = {
      height: 5,
      width: 5,
      borderRadius: 2.5,
  }

  return (
    // <Text style={defaultStyles}>{title}</Text>
    <Image source={ require('../assets/icons/tab-bubble-unselected.png')} style={defaultStyles} />
  );

};

export default Tab;

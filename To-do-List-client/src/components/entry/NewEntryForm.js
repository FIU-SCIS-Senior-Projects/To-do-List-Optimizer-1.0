  import React, {Component} from 'react';
  import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    ListView,
    Picker
  } from 'react-native';

  import {FormLabel, FormInput} from 'react-native-elements';
  import {Actions} from 'react-native-router-flux';

  const DEBUG = true;
  var myConsole = (DEBUG)? console.log : function(){};



  export default class NewEntryForm extends Component {

    constructor(props) {
      super(props);


      // this.emptyListView = this.emptyListView.bind(this);
      // this.populatedListView = this.populatedListView.bind(this);
    }

    render(){
      var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
      myConsole("Im here");
      myConsole(this.props.placesList.length);
      var dataSource = (this.props.placesList.length > 0 )?
      ds.cloneWithRows(this.props.placesList):
      ds.cloneWithRows([]);
      return(

        <View>
          <FormInput placeholder="where to"
            onChangeText={(text) => {this.props.onChange(text)}}/>
            <ListView  dataSource={dataSource}
              renderRow={(rowData) =>
                <View style={{flexDirection: 'column', alignItems: 'center'}}>
                  <TouchableOpacity  style={{flexDirection: 'column', backgroundColor: 'white', width: '90%'}}>
                    <View style={{flexDirection: 'row'}}>
                      <Text>
                        {rowData.structured_formatting.main_text}
                      </Text>
                      <Text style={{position:'absolute', right: 10}}>
                        2.1 mi.
                      </Text>
                    </View>
                    <View style={{alignItems: 'center'}}>
                      <Text >
                        {rowData.structured_formatting.secondary_text}
                      </Text>

                    </View>
                  </TouchableOpacity>
                </View>
            }/>


            </View>
          );
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

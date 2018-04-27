import React, {Component} from 'react';
import {
  AsyncStorage,
  View,
  Alert,
  TextInput,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet
} from 'react-native';


import { Input, Button } from 'react-native-elements';


//Actions is provided by the router for dynamic routing
import {Actions} from 'react-native-router-flux';
// import WelcomeContainer from '../containers/WelcomeContainer';
import LoginContainer from '../containers/LoginContainer'
class LoginScene extends Component {

  constructor(){
    super();
    this.state = {
      username: null,
      password: null
    };
  }


  render() {
    return (
      // <LoginContainer />


      <View style={styles.container}>



        <View style={styles.inputContainer}>
          <Input
            editable={true}
            onChangeText={(username) => this.setState({username})}
            placeholder='Username'
            ref='username'
            returnKeyType='next'
            inputContainerStyle={{
              borderColor: "#000000",
              marginBottom: 25
            }}
            value={this.state.username}
          />

          <Input
            editable={true}
            onChangeText={(password) => this.setState({password})}
            placeholder='Password'
            ref='password'
            returnKeyType='next'
            inputContainerStyle={{
              borderColor: "#000000",
              marginBottom: 25
            }}
            secureTextEntry={true}
            value={this.state.password}
          />
        </View>



        <View style={styles.groupBtn}>
          <View style={styles.signInBtn}>
            <Button
              onPress={this.userLogin.bind(this)}
              title='Sign in'
              titleStyle={{
                fontWeight: "700",
                color: "#000000"
              }}
              buttonStyle={{
                backgroundColor: "rgba(0,0,0,0)",
                width: 100,
                height: 45,
                borderColor: "#000000",
                borderWidth: 2,
                borderRadius: 0
              }}
              containerStyle={{ marginTop: 20 }}
            />


          </View>
          <View style={styles.signUpBtn}>
            <Button
              onPress={this.userSignup.bind(this)}
              title='Sign up'
              titleStyle={{
                fontWeight: "700",
                color: "#000000"
              }}
              buttonStyle={{
                backgroundColor: "rgba(0,0,0,0)",
                width: 100,
                height: 45,
                borderColor: "#000000",
                borderWidth: 2,
                borderRadius: 0
              }}
              containerStyle={{ marginTop: 20 }}
            />
          </View>
        </View>
      </View>



    );
  }

  /****************************************************************************
  * create a request to create a new user with the entered
  * username and Password. expects a success token and stores it to
  * make further requests.
  * @return {void} [description]
  */
  userSignup() {
    if (!this.state.username || !this.state.password) {
      Alert.alert( ' No username or password');
      return;
    }
    fetch('http://localhost:8000/signup', {
      method: 'POST',
      headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email : this.state.username,
        password : this.state.password
      })
    })
    .then((response) => response.json())
    .then((responseData) => {
      console.log(responseData);
      this.saveItem('id_token', responseData.token);
      Alert.alert( 'Signup Success!');
      Actions.main();
    })
    .done();
  }


  

  /**
  * authenticate a registered user with the entered username and pasword.
  * Expects a success token and stores it to make further requests.
  * @return {[type]} [description]
  */
  userLogin() {
    if (!this.state.username || !this.state.password){
      Alert.alert( ' No username or password');
      return;
    }
    try {
      fetch('http://localhost:8000/signin', {
        method: 'POST',
        headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: this.state.username,
          password: this.state.password,
        })
      })
      .then((response) => {

        response.json();


        if (response.status == 200){

          var body = JSON.parse(response._bodyInit);
          console.log("saved token: " + body.token);
          this.saveItem('id_token', body.token);
          Alert.alert('Login Success!');
          Actions.main();
        }
        else if (response.status == 404 || response.status == 401) {
          console.log("response status: " + response.status);
          Alert.alert('wrong username or password');
        }
        else {
          console.log("response status: " + response.status);
          Alert.alert('something went wrong');
        }
      })
      .done();
    }
    catch (e) {
      console.log(e);
    }
  }

  async saveItem(item, selectedValue) {
    try {
      await AsyncStorage.setItem(item, selectedValue);
    } catch (error) {
      console.error('AsyncStorage error: ' + error.message);
    }
  }

}


const styles = StyleSheet.create({

  container:{
    flex: 1,
    backgroundColor: '#f8dc43'
  },
  inputContainer:{
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  signIn:{
    color: 'black',
    borderColor: '#000000',
    width: 100,
    height: 45,
    borderWidth: 2,
    borderRadius: 0
  },
  groupBtn:{
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  signInBtn:{
    marginLeft: 50
  },
  signUpBtn:{
    marginRight: 50
  },
  formContainer: {

  }


});










export default LoginScene;

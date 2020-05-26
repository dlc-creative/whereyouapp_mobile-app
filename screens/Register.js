import React from 'react';
import {
  Text,
  Image,
  ImageBackground,
  TextInput,
  View,
  TouchableOpacity
} from 'react-native';
import axios from 'axios';
import bcrypt from 'react-native-bcrypt';
import isaac from 'isaac';
import {validateEmail, hashPassword} from '../helpers/index';
import {connect} from 'react-redux';
import styles from '../styles/_register.js';
import db from '../firebase.js';

class Register extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      first_name: '',
      last_name: '',
      email: '',
      password: '',
      confirm_password: ''
    };

    this.db = db.database().ref();
    this.registerUser = this.registerUser.bind(this);
  }

  async registerUser(state) {
    let hashedPassword;
    try {

      if (state.first_name == '' || state.last_name == '' || state.email == '' || state.password == '' || state.confirm_password == '') {
        alert('Registration fields can not be blank');
        return;
      }

      if (state.email !== '' || state.email.length !== 0) {
        if (!validateEmail(state.email.toLowerCase())) {
          alert('Not a valid email address');
          return;
        }
      }

      if (state.password === state.confirm_password) {
        state.password = await hashPassword(state.password);
        this.db.child('users').push({
          first_name: state.first_name,
          last_name: state.last_name,
          email: state.email.toLowerCase(),
          password: state.password
        });
        alert('Registration successful!');
        return this.props.navigation.navigate('Login');
      } else {
        alert('Passwords do not match');
      }
    } catch (e) {
      console.error('app error', e);
    }
  }

  render() {
    return (
      <ImageBackground source={require('../assets/img/bg.png')} style={styles.container}>
        <View style={styles.align}>
          <View style={styles.content}>
            <Image source={require('../assets/img/logo.png')} style={{width: 300, height: 90}} />
          </View>
          <View style={styles.content}>
            <TextInput
              style={styles.input}
              placeholder="First Name"
              onChangeText={(text) => this.setState({first_name: text})}
              value={this.state.text}
            />
            <TextInput
              style={styles.input}
              placeholder="Last Name"
              onChangeText={(text) => this.setState({last_name: text})}
              value={this.state.text}
            />
            <TextInput
              style={styles.input}
              placeholder="Email Address"
              onChangeText={(text) => this.setState({email: text})}
              value={this.state.email}
            />
            <TextInput
              style={styles.input}
              secureTextEntry={true}
              placeholder="Password"
              onChangeText={(text) => this.setState({password: text})}
            />
            <TextInput
              style={styles.input}
              secureTextEntry={true}
              placeholder="Confirm Password"
              onChangeText={(text) => this.setState({confirm_password: text})}
            />
            <TouchableOpacity onPress={(e) => this.registerUser(this.state)} style={styles.buttonContainer}>
              <Text style={styles.button}>Sign Up</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.signup}>
            <Text style={{color: '#fff', paddingRight: 5}}>Already a member?</Text>
            <Text style={{color: '#fff', fontWeight: 'bold', textDecorationLine: 'underline'}} onPress={() => this.props.navigation.navigate('Login')}>Login</Text>
          </View>
        </View>
      </ImageBackground>
    )
  }
}

function mapStateToProps(state) {
  return {
    authentication: state.authentication
  }
}

export default connect(mapStateToProps)(Register);

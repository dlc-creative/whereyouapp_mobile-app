import Config from '../app.config.js';
import React from 'react';
import {
  Text,
  Image,
  ImageBackground,
  TextInput,
  View,
  TouchableOpacity
} from 'react-native';
import styles from '../styles/_login.js';

class Login extends React.Component {

  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    console.log('navigate', this.props);
    return (
      <ImageBackground source={require('../assets/img/bg.png')} style={styles.container}>
        <View style={styles.align}>
          <View style={styles.content}>
            <Text style={styles.text}>Where You App</Text>
          </View>
          <View style={styles.content}>
            <TouchableOpacity onPress={() => this.props.navigation.navigate('Home')} style={styles.buttonContainer}>
              <Text style={styles.button}>Login</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.signup}>
            <Text style={{color: '#fff'}}>Not a member?</Text>
            <Text style={{color: '#000'}} onPress={() => this.props.navigation.navigate('Register')}>Sign up</Text>
          </View>
        </View>
      </ImageBackground>
    )
  }
}

export default Login;

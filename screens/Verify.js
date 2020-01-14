import React from 'react';
import {
  Text,
  ImageBackground,
  TextInput,
  View,
  TouchableOpacity
} from 'react-native';
import styles from '../styles/_verify.js';
// import Amplify, { API } from 'aws-amplify';
// import awsconfig from './aws-exports';
// Amplify.configure(awsconfig);

class Verify extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      first_name: '',
      last_name: ''
    };

    this.verifyUser = this.verifyUser.bind(this);
  }

  async verifyUser() {

  }

  onChangeText(e) {

  }

  render() {
    return (
      <ImageBackground source={require('../assets/img/bg.png')} style={styles.container}>
        <View style={styles.align}>
          <View style={styles.content}>
            <Text style={styles.text}>Where You App</Text>
          </View>
          <View style={styles.content}>
            <TextInput
              style={styles.input}
              placeholder="Confirmation code"
              onChangeText={(text) => this.setState({text})}
              value={this.state.text}
            />
            <TouchableOpacity onPress={() => this.props.navigation.navigate('Login')} style={styles.buttonContainer}>
              <Text style={styles.button}>Confirm Registration</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>
    )
  }
}

export default Verify;

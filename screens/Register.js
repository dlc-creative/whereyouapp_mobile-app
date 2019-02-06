import React from 'react';
import {
  Text,
  ImageBackground,
  TextInput,
  View,
  TouchableOpacity
} from 'react-native';
import styles from '../styles/_register.js';

class Register extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      text: ''
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <TextInput
          style={{height: 40, borderColor: 'gray', borderWidth: 1}}
          onChangeText={(text) => this.setState({text})}
          value={this.state.text}
        />
      </View>
    )
  }
}

export default Register;

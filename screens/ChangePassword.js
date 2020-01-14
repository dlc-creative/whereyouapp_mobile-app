import React from 'react';
import {
  Text,
  Image,
  ImageBackground,
  TextInput,
  View,
  TouchableOpacity
} from 'react-native';
import {connect} from 'react-redux';
import styles from '../styles/_changepassword.js';
import {hashPassword, comparePassword} from '../helpers/index';
import db from '../firebase.js';

class ChangePassword extends React.Component {

  static navigationOptions = { title: 'ChangePassword' };

  constructor(props) {
    super(props);

    this.state = {
      current_password: '',
      new_password: '',
      confirm_new_password: ''
    };

    this.user = this.props.authentication.user_id;
    this.db = db.database().ref();
    this.updatePassword = this.updatePassword.bind(this);
    this.checkStoredPassword = this.checkStoredPassword.bind(this);
  }

  async checkStoredPassword() {
    return await new Promise((resolve, reject) => {
      return this.db.child(`users/${this.user}`).once('value', (snapshot) => {
        resolve(snapshot.val().password);
      });
    });
  }

  async updatePassword() {
    let hashed;
    if (!this.state.current_password && !this.state.new_password && !this.state.confirm_new_password) {
      alert("Fields can not be blank");
    } else {
      let storedPassword = await this.checkStoredPassword();
      let matched = await comparePassword(this.state.current_password, storedPassword);
      if (!!matched) {
        if (this.state.new_password === this.state.confirm_new_password) {
          hashed = await hashPassword(this.state.new_password);
          this.db.child(`users/${this.user}`).update({password: hashed});
          alert("New password is updated!");
          this.setState({current_password: '', new_password: '', confirm_new_password: ''});
          return this.props.navigation.navigate('Home');
        } else {
          alert("Passwords do not match");
        }
      } else {
        alert("Current password does not match our records");
      }
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.content}>
          <TextInput
            style={styles.input}
            placeholder="Current Password"
            secureTextEntry={true}
            onChangeText={(text) => this.setState({current_password: text})}
          />
          <TextInput
            style={styles.input}
            placeholder="New Password"
            secureTextEntry={true}
            onChangeText={(text) => this.setState({new_password: text})}
          />
          <TextInput
            style={styles.input}
            placeholder="Confirm Password"
            secureTextEntry={true}
            onChangeText={(text) => this.setState({confirm_new_password: text})}
          />
        </View>
        <View>
          <TouchableOpacity onPress={() => this.updatePassword()} style={styles.buttonContainer}>
            <Text style={styles.button}>Save Password</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }

}

function mapStateToProps(state) {
  return {
    authentication: state.authentication
  }
}

export default connect(mapStateToProps)(ChangePassword);

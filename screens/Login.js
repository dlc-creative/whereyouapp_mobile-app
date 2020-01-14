import React from 'react';
import {
  Text,
  Image,
  ImageBackground,
  TextInput,
  View,
  TouchableOpacity
} from 'react-native';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {getUserToken} from '../actions/index';
import styles from '../styles/_login.js';
import {comparePassword} from '../helpers/index';
import db from '../firebase.js';

class Login extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      username: '',
      password: ''
    };

    this.db = db.database().ref();
    this.authenticateUser = this.authenticateUser.bind(this);
  }

  async authenticateUser() {
    try {
      let auth,
          userAccount,
          username = this.state.username,
          password = this.state.password;
      this.db.child('users').orderByChild('email').equalTo(username).on('value', async (snapshot) => {
        let res = snapshot.val();
        if (res !== null) {
          let userID = Object.keys(res)[0];
          auth = await comparePassword(password, Object.values(res)[0].password);
          if (!!auth) {
            userAccount = {
              id: userID,
              account: Object.values(res)[0]
            };
            this.props.getUserToken(userAccount);
            if (!!this.props.authentication) {
              this.props.navigation.navigate('Home');
            }
          } else {
            alert("Invalid password");
          }
        } else {
          alert("Invalid email address");
        }
      });
    } catch (error) {
      console.error('error', error.toString(error));
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
              placeholder="Email Address"
              onChangeText={(text) => this.setState({username: text.toLowerCase()})}
            />
            <TextInput
              style={styles.input}
              placeholder="Password"
              secureTextEntry={true}
              onChangeText={(text) => this.setState({password: text})}
            />
            <TouchableOpacity onPress={() => this.authenticateUser()} style={styles.buttonContainer}>
              <Text style={styles.button}>Login</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.signup}>
            <Text style={{color: '#fff', paddingRight: 5}}>Not a member?</Text>
            <Text style={{color: '#fff', fontWeight: 'bold', textDecorationLine: 'underline'}} onPress={() => this.props.navigation.navigate('Register')}>Sign up</Text>
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

function matchDispatchToProps(dispatch) {
  return bindActionCreators({getUserToken: getUserToken}, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(Login);

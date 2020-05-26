import React from 'react';
import {
  Text,
  Image,
  ImageBackground,
  TextInput,
  View,
  Dimensions,
  Platform,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator
} from 'react-native';
import {bindActionCreators} from 'redux';
import config from '../config';
import {connect} from 'react-redux';
import {getUserToken, getLocation, searchRestaurants} from '../actions/index';
import styles from '../styles/_login.js';
import {comparePassword, buildRequest} from '../helpers/index';
import db from '../firebase.js';
import _ from 'lodash';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;
const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = 0.0421; //LATITUDE_DELTA * ASPECT_RATIO;

class Login extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      username: '',
      password: '',
      initialPosition: {
        latitude: 0,
        longitude: 0,
        latitudeDelta: 0,
        longitudeDelta: 0
      },
      region: {
        latitude: 0,
        longitude: 0,
        latitudeDelta: 0,
        longitudeDelta: 0
      },
      search: ''
    };

    this.db = db.database().ref();
    this.authenticateUser = this.authenticateUser.bind(this);
    this.exploreRestaurants = this.exploreRestaurants.bind(this);
    this.getCityDetails = this.getCityDetails.bind(this);
    this.getResturantsByCity = this.getResturantsByCity.bind(this);
  }

  componentDidMount = async() => {
    navigator.geolocation.getCurrentPosition((position) => {
      var lat = parseFloat(position.coords.latitude);
      var long = parseFloat(position.coords.longitude);
      var region = {
        latitude: lat,
        longitude: long,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA,
      };
      this.setState({region: region});
      this.exploreRestaurants(region, false);
      return this.props.getLocation(region);
    },
    (error) => alert(JSON.stringify(error)),
    {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000});
    this.watchID = navigator.geolocation.watchPosition((position) => {
      const newRegion = {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA
      }
      this.onRegionChange(newRegion);
    });
 }

  componentWillUnmount = async() => {
    navigator.geolocation.clearWatch(this.watchID);
    this.exploreRestaurants(this.props.location, false);
 }

  async exploreRestaurants(location, search) {
    let cityID = await this.getCityDetails(location);
    let cityRestaurants = await this.getResturantsByCity(cityID, search);
    return this.props.searchRestaurants(cityRestaurants.restaurants);
  }

  async getCityDetails(location) {
    let response = await buildRequest(`cities?lat=${location.latitude}&lon=${location.longitude}`);
    return response.data.location_suggestions[0].id;
  }

  async getResturantsByCity(entityId, search) {
    let response;
    if (!search) {
      response = await buildRequest(`search?entity_id=${entityId}&entity_type=city`);
    } else {
      response = await buildRequest(`search?entity_id=${entityId}&entity_type=city&q=${this.state.search}`);
    }
    return response.data;
  }

  static navigationOptions = {
    header: null,
  };

  onRegionChange(region) {
    this.setState({ region: region });
  }


  async authenticateUser() {
    try {
      let auth,
          userAccount,
          username = this.state.username.toLowerCase(),
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
    authentication: state.authentication,
    restaurants: state.restaurants,
    location: state.location
  }
}

function matchDispatchToProps(dispatch) {
  return bindActionCreators({getUserToken: getUserToken, getLocation: getLocation, searchRestaurants: searchRestaurants}, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(Login);

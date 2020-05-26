import React from 'react';
import {
  View,
  Text,
  Image,
  Dimensions,
  Platform,
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ActivityIndicator
} from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { MonoText } from '../components/StyledText';
import config from '../config';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {getLocation, searchRestaurants} from '../actions/index';
import {buildRequest} from '../helpers/index';
import styles from '../styles/_home.js';
import _ from 'lodash';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;
const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = 0.0421; //LATITUDE_DELTA * ASPECT_RATIO;

class Home extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
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
    }

    this.exploreRestaurants = this.exploreRestaurants.bind(this);
    this.getCityDetails = this.getCityDetails.bind(this);
    this.getResturantsByCity = this.getResturantsByCity.bind(this);
    this.onRegionChange = this.onRegionChange.bind(this);
    this.onSearchChange = this.onSearchChange.bind(this);
    this.onKeyPress = this.onKeyPress.bind(this);
  }

  componentDidMount = async() => {
    // get city_name => https://developers.zomato.com/api/v2.1/cities?lat=41.894386269181936&lon=-87.64146109999876
    // get entity_id => https://developers.zomato.com/api/v2.1/locations?query=city_name
    // get restaurants => 'search?entity_id=292&entity_type=city'
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
 }

  async onKeyPress(e) {
    await this.exploreRestaurants(this.state.region, true);
  }

  async exploreRestaurants(location, search) {
    let cityID = await this.getCityDetails(location);
    let cityRestaurants = await this.getResturantsByCity(cityID, search);
    return this.props.searchRestaurants(cityRestaurants.restaurants);
  }

  async getCityDetails(location) {
    // LOS ANGELES | LAT: 34.05217 & LONG: -118.243469
    let response = await buildRequest(`cities?lat=${location.latitude}&lon=${location.longitude}`);
    return response.data.location_suggestions[0].id;
  }

  async getResturantsByCity(entityId, search) {
    let response;
    response = await buildRequest(`search?entity_id=${entityId}&entity_type=city&q=${this.state.search}`);
    return response.data;
  }

  static navigationOptions = {
    header: null,
  };

  onRegionChange(region) {
    this.setState({ region: region });
  }

  onSearchChange(e) {
    this.setState({
      search: e.nativeEvent.text
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <MapView
          style={styles.map}
          region={this.state.region}
          showsUserLocation={true}>
          {this.props.restaurants.map((marker, index) => (
            <Marker
              key={index}
              coordinate={{latitude: parseFloat(marker.restaurant.location.latitude), longitude: parseFloat(marker.restaurant.location.longitude)}}
              title={marker.restaurant.name}
              description={marker.restaurant.cuisines}
            />
          ))}
        </MapView>
        <View style={styles.searchbar}>
          <TextInput
            placeholder="Search..."
            style={styles.search}
            onSubmitEditing={this.onKeyPress}
            onChange={this.onSearchChange}
            value={this.state.search}
            >
          </TextInput>
        </View>
      </View>
    );
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
	return bindActionCreators({getLocation: getLocation, searchRestaurants: searchRestaurants}, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(Home);

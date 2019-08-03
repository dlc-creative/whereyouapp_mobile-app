import React from 'react';
import { View, ImageBackground, Text, StatusBar, ScrollView } from 'react-native';
import { ExpoConfigView, ExpoLinksView } from '@expo/samples';
import axios from 'axios';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import config from '../app.config';
import {searchRestaurants} from '../actions/index';
import {buildRequest} from '../helpers/index';
import styles from '../styles/_explore.js';
import _ from 'lodash';

class Explore extends React.Component {
  static navigationOptions = { title: 'Explore' };

  constructor(props) {
    super(props);

    this.exploreRestaurants = this.exploreRestaurants.bind(this);
    this.getCityDetails = this.getCityDetails.bind(this);
    this.getResturantsByCity = this.getResturantsByCity.bind(this);

  }

  componentDidMount() {
    // get city_name => https://developers.zomato.com/api/v2.1/cities?lat=41.894386269181936&lon=-87.64146109999876
    // get entity_id => https://developers.zomato.com/api/v2.1/locations?query=city_name
    // get restaurants => 'search?entity_id=292&entity_type=city'
    console.log('pulled location', this.props.location);
    this.exploreRestaurants();
  }

  async exploreRestaurants() {
    var cityID = await this.getCityDetails();
    var cityRestaurants = await this.getResturantsByCity(cityID);
    return this.props.searchRestaurants(cityRestaurants.restaurants);
  }

  async getCityDetails() {
      // LOS ANGELES | LAT: 34.05217 & LONG: -118.243469
      let response = await buildRequest(`cities?lat=${this.props.location.latitude}&lon=${this.props.location.longitude}`);
      return response.data.location_suggestions[0].id;
  }

  async getResturantsByCity(entityId) {
      let response = await buildRequest(`search?entity_id=${entityId}&entity_type=city`);
      return response.data;
  }

  get allRestaurants() {
   return _.map(this.props.restaurants, (restaurant, idx) => {
     return (
        <View style={styles.restaurant} key={idx}>
           <ImageBackground source={{uri: restaurant.restaurant.featured_image}} style={styles.restaurantImage}>
             <View style={styles.overlay} />
             <Text style={styles.restaurantName}>{restaurant.restaurant.name}</Text>
             <View style={styles.baseline}>
               <Text style={styles.cuisines}>{restaurant.restaurant.cuisines}</Text>
               <Text style={styles.votes}>{restaurant.restaurant.user_rating.votes}</Text>
             </View>
           </ImageBackground>
           <Text style={styles.restaurantLocation}>{`${restaurant.restaurant.location.address}, ${restaurant.restaurant.location.city}, ${restaurant.restaurant.location.zipcode}`}</Text>
        </View>
     )
   });
  }

  render() {
     return (
       <View style={styles.restaurantList}>
         <ScrollView>{this.allRestaurants}</ScrollView>
       </View>
     )
  }
}

function mapStateToProps(state) {
	return {
		restaurants: state.restaurants,
    location: state.location
	}
}

function matchDispatchToProps(dispatch) {
	return bindActionCreators({searchRestaurants: searchRestaurants}, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(Explore);

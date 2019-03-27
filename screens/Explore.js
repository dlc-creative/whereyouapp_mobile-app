import React from 'react';
import { View, ImageBackground, Text, StatusBar, ScrollView } from 'react-native';
import { ExpoConfigView, ExpoLinksView } from '@expo/samples';
import axios from 'axios';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import config from '../app.config';
import {searchRestaurants} from '../actions/index';
import styles from '../styles/_explore.js';
import _ from 'lodash';

class Explore extends React.Component {
  static navigationOptions = { title: 'Explore' };

  constructor(props) {
    super(props);

  }

  componentDidMount() {
    let request = config.current.zomato_api_url + 'search?entity_id=292&entity_type=city';
    let headers = { headers: {'user-key': config.current.zomato_api_key} };
    axios.get(request, headers)
    .then((response) => {
      return this.props.searchRestaurants(response.data.restaurants);
    })
    .catch((error) => {
      console.error('error', error);
    })
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
		restaurants: state.restaurants
	}
}

function matchDispatchToProps(dispatch) {
	return bindActionCreators({searchRestaurants: searchRestaurants}, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(Explore);

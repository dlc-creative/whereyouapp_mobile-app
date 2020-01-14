import React from 'react';
import {
  View,
  ImageBackground,
  Button,
  Text,
  StatusBar,
  ScrollView,
  WebView,
  Dimensions,
  Animated,
  TouchableHighlight,
  ActivityIndicator
} from 'react-native';
import Modal, { ModalTitle, ModalContent } from 'react-native-modals';
import { Ionicons } from '@expo/vector-icons';
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

    this.state = {
      modal: true
    };

  }

  get allRestaurants() {
   const {navigate} = this.props.navigation;
   return _.map(this.props.restaurants, (restaurant, idx) => {
     if (restaurant.restaurant.featured_image !== "") {
       return (
          <View style={styles.restaurant} key={idx}>
          <TouchableHighlight onPress={() => navigate('RestaurantProfile', {restaurant: restaurant.restaurant})}>
             <ImageBackground source={{uri: restaurant.restaurant.featured_image}} style={styles.restaurantImage}>
               <View style={styles.overlay} />
               <Text style={styles.restaurantName}>{restaurant.restaurant.name}</Text>
               <View style={styles.baseline}>
                 <Text style={styles.cuisines}>{restaurant.restaurant.cuisines}</Text>
                 <Text style={styles.votes}><Ionicons name="md-heart" color="red" /> {restaurant.restaurant.user_rating.votes}</Text>
               </View>
             </ImageBackground>
             </TouchableHighlight>
             <Text style={styles.restaurantLocation}>{`${restaurant.restaurant.location.address}, ${restaurant.restaurant.location.city}, ${restaurant.restaurant.location.zipcode}`}</Text>
          </View>
       )
     }
   });
  }

  // <View style={styles.restaurantProfileContainer}>
  //   <WebView
  //      source={{uri: 'https://google.com/'}}
  //      style={{marginTop: 20, backgroundColor: '#fff'}}
  //    />
  // </View>


  render() {
     return (
       <View style={styles.container}>
       { this.props.restaurants.length == 0 && (
         <ActivityIndicator size="large" color="#ff0000" />
       ) }
         <View style={styles.restaurantList}>
           <ScrollView>{this.allRestaurants}</ScrollView>
         </View>
       </View>
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
	return bindActionCreators({searchRestaurants: searchRestaurants}, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(Explore);

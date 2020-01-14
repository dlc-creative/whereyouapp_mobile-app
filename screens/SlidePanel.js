import React from 'react';
import { View, ImageBackground, Button, Text, StatusBar, ScrollView, WebView, Dimensions, Animated } from 'react-native';
import { ExpoConfigView, ExpoLinksView } from '@expo/samples';
import axios from 'axios';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import config from '../app.config';
import {searchRestaurants} from '../actions/index';
import {buildRequest} from '../helpers/index';
import styles from '../styles/_explore.js';
import _ from 'lodash';
import SlidingUpPanel from 'rn-sliding-up-panel';

const { height } = Dimensions.get("window");

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

  // <View style={styles.restaurantProfileContainer}>
  //   <WebView
  //      source={{uri: 'https://google.com/'}}
  //      style={{marginTop: 20, backgroundColor: '#fff'}}
  //    />
  // </View>

  // <View style={styles.restaurantList}>
  //   <ScrollView>{this.allRestaurants}</ScrollView>
  // </View>

  static defaultProps = {
  draggableRange: { top: height + 180 - 64, bottom: 180 }
  };

  _draggedValue = new Animated.Value(180);

  render() {

    const { top, bottom } = this.props.draggableRange;

const backgoundOpacity = this._draggedValue.interpolate({
  inputRange: [height - 48, height],
  outputRange: [1, 0],
  extrapolate: "clamp"
});

const iconTranslateY = this._draggedValue.interpolate({
  inputRange: [height - 56, height, top],
  outputRange: [0, 56, 180 - 32],
  extrapolate: "clamp"
});

const textTranslateY = this._draggedValue.interpolate({
  inputRange: [bottom, top],
  outputRange: [0, 8],
  extrapolate: "clamp"
});

const textTranslateX = this._draggedValue.interpolate({
  inputRange: [bottom, top],
  outputRange: [0, -112],
  extrapolate: "clamp"
});

const textScale = this._draggedValue.interpolate({
  inputRange: [bottom, top],
  outputRange: [1, 0.7],
  extrapolate: "clamp"
});
     return (
       <View style={styles.container}>
         <Text onPress={() => this._panel.show(360)}>Show panel</Text>
         <SlidingUpPanel
           ref={c => (this._panel = c)}
           draggableRange={this.props.draggableRange}
           animatedValue={this._draggedValue}
           snappingPoints={[360]}
           height={height + 180}
           friction={0.5}
           style={styles.slidePanel}
         >
           <View style={styles.panel}>
             <Animated.View
               style={[
                 styles.iconBg,
                 {
                   opacity: backgoundOpacity,
                   transform: [{ translateY: iconTranslateY }]
                 }
               ]}
             />
             <View style={styles.panelHeader}>
               <Animated.View
                 style={{
                   transform: [
                     { translateY: textTranslateY },
                     { translateX: textTranslateX },
                     { scale: textScale }
                   ]
                 }}
               >
                 <Text style={styles.textHeader}>Sliding Up Panel</Text>
               </Animated.View>
             </View>
             <View style={styles.container}>
               <Text>Bottom sheet content</Text>
             </View>
           </View>
         </SlidingUpPanel>
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

import React from 'react';
import {
  Linking,
  Platform,
  ScrollView,
  StyleSheet,
  View,
  Image,
  Text,
  StatusBar,
  Dimensions,
  ImageBackground,
  Button,
  TouchableOpacity,
  TouchableHighlight,
  ActivityIndicator
} from 'react-native';
import { Drawer } from 'react-native-paper';
import { Ionicons, FontAwesome } from '@expo/vector-icons';
import {connect} from 'react-redux';
import styles from '../styles/_restaurantprofile.js';
import * as WebBrowser from 'expo-web-browser';
import _ from 'lodash';
// import { ExpoLinksView } from '@expo/samples';

class RestaurantProfile extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      value: 0,
      delay: false
    };

    this.change = this.change.bind(this);
    this.dialCall = this.dialCall.bind(this);
    this.setDelay = this.setDelay.bind(this);
    this.loadMenu = this.loadMenu.bind(this);
  }

  componentDidMount() {
  	// setTimeout(() => {this.scrollView.scrollTo({x: -30}) }, 1) // scroll view position fix
    setTimeout(() => this.setDelay(), 3000);
  }

  change(value) {
   this.setState({
     value: value
   });
  }

  dialCall = (number) => {
    let phoneNumber = (Platform.OS === 'android') ? `tel:${number}` : `telprompt:${number}`;
    Linking.openURL(phoneNumber);
  };

  setDelay() {
    this.setState({
      delay: true
    });
  }

  async loadMenu(url) {
    return await WebBrowser.openBrowserAsync(url);
  }

  get restaurantTimes() {
    const { restaurant } = this.props.navigation.state.params;
    return _.map(restaurant.timings.split(','), (time, idx) => {
      return (
        <Drawer.Item key={idx} label={time} />
      )
    });
  }

  get restaurantPhotos() {
    const { restaurant } = this.props.navigation.state.params;
    return _.map(restaurant.photos, (photo, idx) => {
      return (
        <View key={idx}>
        { photo.photo.url !== "" && (
          <ImageBackground source={{uri: photo.photo.url}} style={styles.card} key={idx} />
        )}
        </View>
      )
    });
  }

  render() {
    const { width } = Dimensions.get('window');
    const { restaurant } = this.props.navigation.state.params;
    const parsedPhone = (restaurant.phone_numbers.indexOf(',')) ? restaurant.phone_numbers.substring(0, restaurant.phone_numbers.indexOf(',')) : restaurant.phone_numbers;
    return (
      <ScrollView style={styles.container}>
         <View style={styles.restaurant}>
            <ImageBackground source={{uri: restaurant.featured_image}} style={styles.restaurantImage}>
              <View style={styles.overlay} />
              <Text style={styles.restaurantName}>{restaurant.name}</Text>
              <View style={styles.baseline}>
                <Text style={styles.cuisines}>{restaurant.cuisines}</Text>
                <Text style={styles.votes}><Ionicons name="md-heart" color="red" /> {restaurant.user_rating.votes}</Text>
              </View>
            </ImageBackground>
            <Drawer.Section>
              <Drawer.Item
                label={restaurant.location.address.split(',')} />
              <TouchableOpacity onPress={() => this.dialCall(restaurant.phone_numbers)}>
                <Drawer.Item
                  label={restaurant.phone_numbers} />
              </TouchableOpacity>
            </Drawer.Section>
            <Drawer.Section>
              <TouchableOpacity onPress={() => this.loadMenu(restaurant.menu_url)}>
                <Drawer.Item
                  label="Menu" />
              </TouchableOpacity>
            </Drawer.Section>
            <Drawer.Section title="Hours">
              {this.restaurantTimes}
            </Drawer.Section>
            <View style={styles.restaurantProfile}>
              <View style={styles.restaurantInfoHours}>
              { !this.state.delay ? (
                <ActivityIndicator size="large" color="#ff0000" />
              ) : (
                <ScrollView
                  style={styles.container}
                  //pagingEnabled={true}
                  horizontal={true}
                  decelerationRate={0}
                  snapToInterval={width}
                  snapToAlignment={"center"}
                  contentInset={{
                    top: 0,
                    left: 0,
                    bottom: 0,
                    right: 0,
                  }}>
                  {this.restaurantPhotos}
                  </ScrollView>
                )}
                </View>
              </View>
            </View>
      </ScrollView>
    );
  }
}

function mapStateToProps(state) {
  return {
    authentication: state.authentication
  }
}

export default connect(mapStateToProps)(RestaurantProfile);

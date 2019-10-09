import React from 'react';
import { ScrollView, StyleSheet, View, Image, Text, StatusBar, } from 'react-native';
// import { ExpoLinksView } from '@expo/samples';

class RestaurantProfile extends React.Component {
  static navigationOptions = {
    title: 'RestaurantProfile',
  };

  constructor(props) {
    super(props);

    this.state = {
      value: 0,
    };

    this.change = this.change.bind(this);
    console.log('constructor props', props.navigation.state.routeName);
  }

  change(value) {
   this.setState({
     value: value
   });
 }

  render() {
    return (
      <ScrollView style={styles.container}>
        {/* Go ahead and delete ExpoLinksView and replace it with your
           * content, we just wanted to provide you with some helpful links */}
           <View style={{flex:1, flexDirection: 'column', justifyContent: 'center'}}>
              <Text>Restaurant Profile</Text>
          </View>
      </ScrollView>
    );
  }
}

export default RestaurantProfile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#fff',
  },
});

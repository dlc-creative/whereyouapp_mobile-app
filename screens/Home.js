import React from 'react';
import {
  Image,
  Dimensions,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';
import MapView from 'react-native-maps';
import { WebBrowser } from 'expo';

import { MonoText } from '../components/StyledText';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

class Home extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      apiResults: [],
      position: {
        latitude: 41.882702,
        longitude: -87.619392,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421
      },
      markerPosition: {
        latitude: 0,
        longitude: 0
      },
      currentPosition: {
        latitude: '',
        logitude: ''
      }
    };

    this.onRegionChange = this.onRegionChange.bind(this);
  }

  componentDidMount() {}

  static navigationOptions = {
    header: null,
  };

  onRegionChange(region) {
    this.setState({ region });
  }


  render() {
    // WebBrowser.openBrowserAsync('https://docs.expo.io/versions/latest/guides/development-mode');
    console.log('ps', Platform.OS);
    console.log('width', width, 'height', height);
    // <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
    //   <View style={styles.welcomeContainer}>
    //     <Text>Where You App</Text>
    //   </View>
    //
    //   <View style={styles.helpContainer}>
    //     <TouchableOpacity onPress={this._handleHelpPress} style={styles.helpLink}>
    //       <Text style={styles.helpLinkText}>Map</Text>
    //     </TouchableOpacity>
    //   </View>
    // </ScrollView>
    return (
      <View style={styles.container}>
        <MapView
          style={styles.map}
          region={this.state.position}>
        </MapView>
        <View style={styles.searchbar}>
          <TextInput
            placeholder="Search..."
            style={styles.search}
          ></TextInput>
        </View>
        <View style={styles.tabBarInfoContainer}>
          <Text style={styles.tabBarInfoText}>Where You App</Text>
          <View style={[styles.codeHighlightContainer, styles.navigationFilename]}>
          </View>
        </View>
      </View>
    );
  }
}

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  developmentModeText: {
    marginBottom: 20,
    color: 'rgba(0,0,0,0.4)',
    fontSize: 14,
    lineHeight: 19,
    textAlign: 'center',
  },
  contentContainer: {
    paddingTop: 30,
  },
  welcomeContainer: {
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  welcomeImage: {
    width: 100,
    height: 80,
    resizeMode: 'contain',
    marginTop: 3,
    marginLeft: -10,
  },
  getStartedContainer: {
    alignItems: 'center',
    marginHorizontal: 50,
  },
  homeScreenFilename: {
    marginVertical: 7,
  },
  codeHighlightText: {
    color: 'rgba(96,100,109, 0.8)',
  },
  codeHighlightContainer: {
    backgroundColor: 'rgba(0,0,0,0.05)',
    borderRadius: 3,
    paddingHorizontal: 4,
  },
  getStartedText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    lineHeight: 24,
    textAlign: 'center',
  },
  tabBarInfoContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    ...Platform.select({
      ios: {
        shadowColor: 'black',
        shadowOffset: { height: -3 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
      },
      android: {
        elevation: 20,
      },
    }),
    alignItems: 'center',
    backgroundColor: '#fbfbfb',
    paddingVertical: 20,
  },
  tabBarInfoText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    textAlign: 'center',
  },
  navigationFilename: {
    marginTop: 5,
  },
  helpContainer: {
    marginTop: 15,
    alignItems: 'center',
  },
  helpLink: {
    paddingVertical: 15,
  },
  helpLinkText: {
    fontSize: 14,
    color: '#2e78b7',
  },
  map: {
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    flex: 1,
    position: 'absolute'
  },
  searchbar: {
    // flex: 1,
    justifyContent: 'flex-start',
    marginTop: 40,
    alignItems: 'center'
  },
  search: {
    backgroundColor: '#fff',
    height: 40,
    width: '90%',
    padding: 10
  }
});

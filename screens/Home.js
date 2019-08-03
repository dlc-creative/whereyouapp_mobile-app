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
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {getLocation} from '../actions/index';
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
      }
    }
  }

  componentDidMount() {
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
    //     this.watchID = navigator.geolocation.watchPosition((position) => {
    //   const newRegion = {
    //     latitude: position.coords.latitude,
    //     longitude: position.coords.longitude,
    //     latitudeDelta: LATITUDE_DELTA,
    //     longitudeDelta: LONGITUDE_DELTA
    //   }
    //
    //   this.onRegionChange({region: newRegion});
    // });
  }

  static navigationOptions = {
    header: null,
  };

  onRegionChange(region) {
    this.setState({ region: region });
  }

  render() {
    return (
      <View style={styles.container}>
        <MapView
          style={styles.map}
          region={this.state.region}
          onRegionChange={region => this.setState({region: region})}
          showsUserLocation={true}/>
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

function mapStateToProps(state) {
	return {
		location: state.location
	}
}

function matchDispatchToProps(dispatch) {
	return bindActionCreators({getLocation: getLocation}, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(Home);

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

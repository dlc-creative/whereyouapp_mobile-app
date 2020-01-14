import React from 'react';
import { Linking, ScrollView, StyleSheet, View, Image, Text, StatusBar, TouchableOpacity } from 'react-native';
import MultiSlider from '@ptomasroos/react-native-multi-slider';
import SettingsList from 'react-native-settings-list';
import { ExpoLinksView } from '@expo/samples';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {userSignOut} from '../actions/index';
import styles from '../styles/_settings.js';

class Settings extends React.Component {
  static navigationOptions = { title: 'Settings' };

  constructor(props) {
    super(props);

    this.state = {
      value: 0,
    };

    this.dialCall = this.dialCall.bind(this);
    this.signOut = this.signOut.bind(this);
  }

  dialCall = async (number) => {
    let phoneNumber = (Platform.OS === 'android') ? `tel:${number}` : `telprompt:${number}`;
    await Linking.openURL(phoneNumber);
  };

  async signOut() {
    if (!!this.props.authentication) {
      this.props.userSignOut();
      return this.props.navigation.navigate('Login');
    }
  }

  render() {
    return (
      <ScrollView style={styles.container}>
        {/* Go ahead and delete ExpoLinksView and replace it with your
           * content, we just wanted to provide you with some helpful links */}
           <View style={{flex:1, flexDirection: 'column', justifyContent: 'center'}}>
            <SettingsList>
              <SettingsList.Header
                headerText='Account & Settings'
                headerStyle={{color: '#fff', marginTop:50, fontWeight: 'bold'}}
                />
              <SettingsList.Item
                title='Change Password'
                titleStyle={{color: '#fff'}}
                backgroundColor='#A62D2D'
                onPress={() => this.props.navigation.navigate('ChangePassword')} />
              <SettingsList.Header
                headerText='Help & Support'
                headerStyle={{color: '#fff', marginTop:50, fontWeight: 'bold'}} />
              <SettingsList.Item
                title='Contact Us'
                titleStyle={{color: '#fff'}}
                backgroundColor='#A62D2D'
                onPress={() => this.dialCall('(216) 970-2489')} />
              <SettingsList.Item
                title='Terms & Conditions'
                titleStyle={{color: '#fff'}}
                backgroundColor='#A62D2D'
                onPress={() => this.props.navigation.navigate('Policies')} />
            </SettingsList>
            <View>
              <TouchableOpacity onPress={() => this.signOut()} style={styles.buttonContainer}>
                <Text style={styles.button}>Sign Out</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.release}>
              <Text style={styles.releaseNumber}>Version 1.0.0</Text>
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

function matchDispatchToProps(dispatch) {
  return bindActionCreators({userSignOut: userSignOut}, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(Settings);

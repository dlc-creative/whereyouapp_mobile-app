import React from 'react';
import { View, Text, StatusBar } from 'react-native';
import { ExpoConfigView } from '@expo/samples';
import MultiSlider from '@ptomasroos/react-native-multi-slider';

class Settings extends React.Component {
  static navigationOptions = {
    title: 'app.json',
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
    /* Go ahead and delete ExpoConfigView and replace it with your
     * content, we just wanted to give you a quick view of your config */
     console.log('settings', this.props);
     return (
       <View style={{flex:1, flexDirection: 'row', justifyContent: 'center'}}>
        <MultiSlider
          min={0}
          max={10}
          step={1}
          onValuesChange={this.change}
          value={this.state.value}
        />
        <Text>{this.state.value}</Text>
       </View>
     )
  }
}

export default Settings;

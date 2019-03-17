import React from 'react';
import { Text, View, Button } from 'react-native';
import { withNavigation } from 'react-navigation';

class LocationItem extends React.Component {
  _onPress = () => {
    this.props.navigation.navigate('HomeStack', { from: 'Location' });
  };

  render() {
    const { item } = this.props;
    return (
      <View>
        <View>
          <Text>{item.title}</Text>
          <Text>{item.description}</Text>
          <Text>Latitude: {item.latitude}</Text>
          <Text>Longitude: {item.longitude}</Text>
        </View>
        <View>
          <Button onPress={this._onPress} title="Edit" color="#841584" />
          <Button onPress={this._onPress} title="Delete" color="red" />
        </View>
      </View>
    );
  }
}

export default withNavigation(LocationItem);

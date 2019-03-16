import React from 'react';
import { Text, View, Button } from 'react-native';
import { withNavigation } from 'react-navigation';
class LocationItem extends React.Component {
  _onPress = () => {
    // this.props.onPressItem(this.props.id);

    this.props.navigation.navigate('HomeStack', {from: 'Location'});
  };

  render() {
    const textColor = this.props.selected ? 'red' : 'black';
    return (
      <View>
        <View>
          <Text style={{ color: textColor }}>{this.props.title}</Text>
        </View>
        <View>
          <Button
            onPress={this._onPress}
            title="Edit"
            color="#841584"
            accessibilityLabel="Learn more about this purple button"
          />
          <Button
            onPress={this._onPress}
            title="Delete"
            color="red"
            accessibilityLabel="Learn more about this purple button"
          />
        </View>
      </View>
    );
  }
}

export default withNavigation(LocationItem);

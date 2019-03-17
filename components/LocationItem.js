import React from 'react';
import { Text, View, Button } from 'react-native';
import { withNavigation } from 'react-navigation';

import { deleteLocation } from '../utils/requestService';

class LocationItem extends React.Component {
  _onEditPress = item => {
    this.props.editItem(item);
  };

  _onDeletePress = async id => {
    const _res = await deleteLocation(id);
    this.props.itemDeleted(id);
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
          <Button
            onPress={() => this._onEditPress(item)}
            title="Edit"
            color="#841584"
          />
          <Button
            onPress={() => this._onDeletePress(item.id)}
            title="Delete"
            color="red"
          />
        </View>
      </View>
    );
  }
}

export default withNavigation(LocationItem);

import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
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
      <View style={styles.container}>
        <View style={styles.infoContainer}>
          <Text style={styles.title}>{item.title}</Text>
          <Text>{item.description}</Text>
          <Text>Latitude: {item.latitude}</Text>
          <Text>Longitude: {item.longitude}</Text>
        </View>
        <View style={styles.buttonsContainer}>
          <Button
            onPress={() => this._onEditPress(item)}
            title="Edit"
            color="#841584"
          />
          <Button
            onPress={() => this._onDeletePress(item.id)}
            title="Delete"
            color="#de1f45"
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f9f9f9',
    borderBottomWidth: 1,
    borderColor: '#c6c6c6'
  },
  infoContainer: {
    flex: 1,
    padding: 15,
    justifyContent: 'center'
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#841584',
    paddingBottom: 5
  },
  buttonsContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-evenly'
  }
});

export default withNavigation(LocationItem);

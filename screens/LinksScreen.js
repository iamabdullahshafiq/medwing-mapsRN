import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { withNavigation } from 'react-navigation';

import LocationItem from '../components/LocationItem';
import { getLocationsFromApi } from '../utils/requestService';

class LinksScreen extends React.Component {
  static navigationOptions = {
    title: 'Locations'
  };

  state = { locations: [] };

  componentDidMount() {
    const { navigation } = this.props;
    this.focusListener = navigation.addListener('didFocus', () => {
      this._getAllLocations();
    });
  }

  componentWillUnmount() {
    this.focusListener.remove();
  }

  async _getAllLocations() {
    const locations = await getLocationsFromApi();
    this.setState({ locations });
  }

  _keyExtractor = item => item.id.toString();

  _renderItem = ({ item }) => (
    <LocationItem
      item={item}
      itemDeleted={this._deleteItem}
      editItem={this._editItem}
    />
  );

  _deleteItem = id => {
    const { locations } = this.state;
    const _locations = locations.filter(e => e.id !== id);
    this.setState({ locations: _locations });
  };

  _editItem = item => {
    this.props.navigation.navigate('Home', { edit: true, item: item });
  };

  render() {
    return (
      <View style={styles.container}>
        {this.state.locations.length > 0 ? (
          <FlatList
            data={this.state.locations}
            keyExtractor={this._keyExtractor}
            renderItem={this._renderItem}
          />
        ) : (
          <Text style={styles.noDataText}>No Locations Available</Text>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  noDataText: {
    paddingVertical: 30,
    alignSelf: 'center',
    fontSize: 16
  }
});

export default withNavigation(LinksScreen);

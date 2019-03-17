import React from 'react';
import { FlatList } from 'react-native';
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

  _renderItem = ({ item }) => <LocationItem item={item} />;

  render() {
    return (
      <FlatList
        data={this.state.locations}
        keyExtractor={this._keyExtractor}
        renderItem={this._renderItem}
      />
    );
  }
}

export default withNavigation(LinksScreen);

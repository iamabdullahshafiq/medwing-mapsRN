import React from 'react';
import { StyleSheet, FlatList } from 'react-native';

import LocationItem from '../components/LocationItem';

const data = [
  {
    id: 1,
    title: 'Hello'
  },
  {
    id: 2,
    title: 'World'
  }
];

export default class LinksScreen extends React.Component {
  static navigationOptions = {
    title: 'Links'
  };

  state = { selected: new Map() };

  _keyExtractor = (item, index) => item.id.toString();

  _onPressItem = id => {
    // updater functions are preferred for transactional updates
    this.setState(state => {
      // copy the map rather than modifying state.
      const selected = new Map(state.selected);
      selected.set(id, !selected.get(id)); // toggle
      return { selected };
    });
  };

  _renderItem = ({ item }) => (
    <LocationItem
      id={item.id}
      onPressItem={this._onPressItem}
      selected={!!this.state.selected.get(item.id)}
      title={item.title}
    />
  );

  render() {
    return (
      <FlatList
        data={data}
        extraData={this.state}
        keyExtractor={this._keyExtractor}
        renderItem={this._renderItem}
      />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#fff'
  }
});

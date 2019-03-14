import React from 'react';
import { StyleSheet } from 'react-native';
import { MapView } from 'expo';

const markers = [
  {
    id: 1,
    latlng: {
      latitude: 37.78825,
      longitude: -122.4324
    },
    title: 'Hello World',
    description: 'Just here'
  },
  {
    id: 2,
    latlng: {
      latitude: 36.78825,
      longitude: -120.4324
    },
    title: 'Hello World 2',
    description: 'Just there'
  }
];

export default class HomeScreen extends React.Component {
  static navigationOptions = {
    header: null
  };

  constructor(props) {
    super(props);
    this.state = { markers };
  }

  render() {
    return (
      <MapView
        style={styles.container}
        initialRegion={{
          latitude: 37.78825,
          longitude: -122.4324,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421
        }}
      >
        {this.state.markers.map(marker => (
          <MapView.Marker
            key={marker.id}
            coordinate={marker.latlng}
            title={marker.title}
            description={marker.description}
          />
        ))}
      </MapView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  }
});

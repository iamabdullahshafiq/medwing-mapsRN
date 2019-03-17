import React from 'react';
import { StyleSheet, View } from 'react-native';
import { MapView } from 'expo';
import { withNavigation } from 'react-navigation';

import { CreateLocationScreen } from './CreateLocationScreen';
import { getLocationsFromApi, createLocation } from '../utils/requestService';

class HomeScreen extends React.Component {
  static navigationOptions = {
    header: null
  };

  state = { markers: [], modalVisible: false, selectedPosition: null };

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
    let locations = await getLocationsFromApi();
    locations = locations.map(marker => {
      marker.latlng = {
        latitude: marker.latitude,
        longitude: marker.longitude
      };
      return marker;
    });
    this.setState({ markers: locations });
  }

  async _createMapLocation(location) {
    const { markers } = this.state;
    let marker = await createLocation(location);
    marker.latlng = {
      latitude: marker.latitude,
      longitude: marker.longitude
    };
    markers.push(marker);
    this.setState({ markers, modalVisible: false });
  }

  _setModalVisible(visible) {
    this.setState({ modalVisible: visible });
  }

  render() {
    return (
      <View style={styles.container}>
        <CreateLocationScreen
          modalVisible={this.state.modalVisible}
          setModalVisible={visible => this._setModalVisible(visible)}
          createMapLocation={position => this._createMapLocation(position)}
          markerCord={this.state.selectedPosition}
        />
        <MapView
          style={styles.container}
          initialRegion={{
            latitude: 37.78825,
            longitude: -122.4324,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421
          }}
          onLongPress={position => {
            this.setState({
              selectedPosition: position.nativeEvent.coordinate
            });
            this._setModalVisible(true);
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
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  }
});

export default withNavigation(HomeScreen);

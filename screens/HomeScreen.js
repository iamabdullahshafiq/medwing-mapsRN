import React from 'react';
import {
  Modal,
  StyleSheet,
  View,
  Text,
  TouchableHighlight,
  Alert,
  TextInput,
  Button
} from 'react-native';
import { MapView } from 'expo';
import { CreateLocationScreen } from './CreateLocationScreen';

export default class HomeScreen extends React.Component {
  static navigationOptions = {
    header: null
  };

  constructor(props) {
    super(props);
    this.state = {
      markers: [],
      modalVisible: false,
      selectedPosition: null
    };
  }

  componentDidMount() {
    this.getAllLocations();
  }

  componentWillReceiveProps(nextProps){
    console.log('nextProps', nextProps.navigation);
  }

  async getAllLocations() {
    let locations = await this.getMoviesFromApi();
    locations = locations.map(marker => {
      marker.latlng = {
        latitude: marker.latitude,
        longitude: marker.longitude
      };
      return marker;
    });
    this.setState({ markers: locations });
  }

  async getMoviesFromApi() {
    try {
      let response = await fetch('http://localhost:3000/v1/locations');
      let responseJson = await response.json();
      return responseJson;
    } catch (error) {
      console.error(error);
    }
  }

  async createLink(body) {
    try {
      let response = await fetch('http://localhost:3000/v1/locations', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
      });
      let responseJson = await response.json();
      return responseJson;
    } catch (error) {
      console.error(error);
    }
  }

  async createMapLocation(location) {
    const { markers } = this.state;
    let marker = await this.createLink(location);
    marker.latlng = {
      latitude: marker.latitude,
      longitude: marker.longitude
    };
    markers.push(marker);
    this.setState({ markers, modalVisible: false });
  }

  setModalVisible(visible) {
    this.setState({ modalVisible: visible });
  }

  render() {
    return (
      <View style={styles.container}>
        <CreateLocationScreen
          modalVisible={this.state.modalVisible}
          setModalVisible={visible => this.setModalVisible(visible)}
          createMapLocation={position => this.createMapLocation(position)}
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
            this.setModalVisible(true);
            this.setState({
              selectedPosition: position.nativeEvent.coordinate
            });
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

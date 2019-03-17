import React from 'react';
import { StyleSheet, View } from 'react-native';
import { MapView } from 'expo';
import { withNavigation } from 'react-navigation';

import { LocationCreateAndUpdateScreen } from './LocationCreateAndUpdateScreen';
import {
  getLocationsFromApi,
  createLocation,
  updateLocation
} from '../utils/requestService';

class HomeScreen extends React.Component {
  static navigationOptions = {
    header: null
  };

  state = {
    markers: [],
    modalVisible: false,
    selectedPosition: null,
    id: null,
    title: '',
    description: '',
    locationFormType: 'Create'
  };

  componentDidMount() {
    const { navigation } = this.props;
    this.focusListener = navigation.addListener('didFocus', () => {
      this._getAllLocations();
    });
  }

  componentDidUpdate() {
    const { navigation } = this.props;
    const editItem = navigation.getParam('edit', false);
    if (editItem) {
      const item = navigation.getParam('item');
      this.setState({
        id: item.id,
        title: item.title,
        description: item.description,
        locationFormType: 'Edit',
        modalVisible: true
      });
      navigation.setParams({ edit: false, item: null });
    }
  }

  componentWillUnmount() {
    this.focusListener.remove();
  }

  _getAllLocations = async () => {
    let locations = await getLocationsFromApi();
    locations = locations.map(marker => {
      marker.latlng = {
        latitude: marker.latitude,
        longitude: marker.longitude
      };
      return marker;
    });
    this.setState({ markers: locations });
  };

  _createMapLocation = async location => {
    const { markers } = this.state;
    let marker = await createLocation(location);
    marker.latlng = {
      latitude: marker.latitude,
      longitude: marker.longitude
    };
    markers.push(marker);
    this.setState({
      markers,
      modalVisible: false,
      locationFormValues: {
        title: '',
        description: ''
      }
    });
  };

  _onUpdatePressed = async () => {
    const { id, title, description, markers } = this.state;
    const location = {
      title: title,
      description: description
    };
    let marker = await updateLocation(location, id);
    marker.latlng = {
      latitude: marker.latitude,
      longitude: marker.longitude
    };
    const index = markers.findIndex(e => e.id === marker.id);
    markers.splice(index, 1, marker);
    this.setState({
      markers,
      id: null,
      title: '',
      description: '',
      locationFormType: 'Create',
      modalVisible: false
    });
  };

  _setModalVisible = visible => {
    this.setState({ modalVisible: visible });
  };

  _setTitle = title => {
    this.setState({ title });
  };

  _setDescription = description => {
    this.setState({ description });
  };

  _onCancelPressed = () => {
    this.setState({
      id: '',
      title: '',
      description: '',
      locationFormType: 'Create',
      modalVisible: false
    });
  };

  _onSavePressed = () => {
    const location = {
      title: this.state.title,
      description: this.state.description,
      latitude: this.state.selectedPosition.latitude,
      longitude: this.state.selectedPosition.longitude
    };
    this._createMapLocation(location);
  };

  render() {
    return (
      <View style={styles.container}>
        <LocationCreateAndUpdateScreen
          modalVisible={this.state.modalVisible}
          title={this.state.title}
          setTitle={this._setTitle}
          description={this.state.description}
          setDescription={this._setDescription}
          locationFormType={this.state.locationFormType}
          onCancel={this._onCancelPressed}
          onSave={this._onSavePressed}
          onUpdate={this._onUpdatePressed}
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

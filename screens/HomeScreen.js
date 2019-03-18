import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
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
    locationFormType: 'Create',
    isLoading: false
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
      isLoading: false,
      locationFormValues: {
        title: '',
        description: ''
      }
    });
  };

  _onUpdatePressed = async () => {
    this.setState({ isLoading: true });
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
      modalVisible: false,
      isLoading: false
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
    this.setState({ isLoading: true });
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
          isLoading={this.state.isLoading}
        />
        <MapView
          style={styles.container}
          initialRegion={{
            latitude: 52.520008,
            longitude: 13.404954,
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
        <View style={styles.tabBarInfoContainer}>
          <Text style={styles.tabBarInfoText}>
            Long Press on map to add new location
          </Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  tabBarInfoContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    shadowColor: 'black',
    shadowOffset: { height: -3 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    alignItems: 'center',
    backgroundColor: '#fbfbfb',
    paddingVertical: 20
  },
  tabBarInfoText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    textAlign: 'center'
  }
});

export default withNavigation(HomeScreen);

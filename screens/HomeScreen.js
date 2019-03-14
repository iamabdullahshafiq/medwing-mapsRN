import React from 'react';
import {
  Modal,
  StyleSheet,
  View,
  Text,
  TouchableHighlight,
  Alert,
  TextInput
} from 'react-native';
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
    this.state = { markers, modalVisible: false, text: 'Useless Placeholder' };
  }

  createLocation(position) {
    const { markers } = this.state;
    console.log(position);
    const latlng = position.nativeEvent.coordinate;
    const marker = {
      id: markers[markers.length - 1].id + 1,
      latlng,
      title: 'temp',
      description: 'temp'
    };
    markers.push(marker);
    this.setState({ markers });
  }

  setModalVisible(visible) {
    this.setState({ modalVisible: visible });
  }

  render() {
    return (
      <View style={styles.container}>
        <Modal
          animationType="slide"
          transparent={false}
          visible={this.state.modalVisible}
          onRequestClose={() => {
            Alert.alert('Modal has been closed.');
          }}
        >
          <View style={{ marginTop: 22 }}>
            <View>
              <Text>Hello World!</Text>

              <TextInput
                style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
                onChangeText={text => this.setState({ text })}
                value={this.state.text}
              />

              <TouchableHighlight
                onPress={() => {
                  this.setModalVisible(!this.state.modalVisible);
                }}
              >
                <Text>Hide Modal</Text>
              </TouchableHighlight>
            </View>
          </View>
        </Modal>
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
            this.createLocation(position);
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

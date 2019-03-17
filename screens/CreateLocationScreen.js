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

export class CreateLocationScreen extends React.Component {
  state = {
    title: '',
    description: ''
  };

  _onSavePress = () => {
    const location = {
      title: this.state.title,
      description: this.state.description,
      latitude: this.props.markerCord.latitude,
      longitude: this.props.markerCord.longitude
    };
    this.props.createMapLocation(location);
  };

  _onCancelPress = () => {
    this.props.setModalVisible(false);
  };

  render() {
    return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={this.props.modalVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
        }}
      >
        <View
          style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'rgba(0, 0, 0, 0.5)'
          }}
        >
          <View
            style={{
              backgroundColor: '#fff',
              padding: 10,
              width: '90%',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <Text
              style={{
                color: '#841584',
                paddingVertical: 10,
                fontSize: 20,
                fontWeight: 'bold'
              }}
            >
              Create Location
            </Text>

            <Text style={{ width: '90%', textAlign: 'left', color: '#841584' }}>
              Title
            </Text>

            <TextInput
              style={{
                height: 40,
                borderColor: 'gray',
                borderWidth: 1,
                width: '90%',
                marginVertical: 10,
                padding: 10
              }}
              onChangeText={title => this.setState({ title })}
              value={this.state.title}
            />

            <Text style={{ width: '90%', textAlign: 'left', color: '#841584' }}>
              Description
            </Text>

            <TextInput
              style={{
                height: 40,
                borderColor: 'gray',
                borderWidth: 1,
                width: '90%',
                marginVertical: 10,
                padding: 10
              }}
              onChangeText={description => this.setState({ description })}
              value={this.state.description}
            />
            <View style={{ backgroundColor: '#841584', width: '90%' }}>
              <Button onPress={this._onSavePress} title="Save" color="#fff" />
            </View>

            <View
              style={{
                borderWidth: 1,
                borderColor: '#841584',
                width: '90%',
                marginVertical: 10
              }}
            >
              <Button
                onPress={this._onCancelPress}
                title="Cancel"
                color="#841584"
              />
            </View>

            {/* <TouchableHighlight
            onPress={() => {
              this.props.setModalVisible(!this.props.modalVisible);
            }}
          >
            <Text>Hide Modal</Text>
          </TouchableHighlight> */}
          </View>
        </View>
      </Modal>
    );
  }
}

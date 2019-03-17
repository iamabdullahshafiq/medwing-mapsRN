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

export class LocationCreateAndUpdateScreen extends React.Component {
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
              {this.props.locationFormType === 'Create'
                ? 'Create Location'
                : 'Update Location'}
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
              value={this.props.title}
              onChangeText={title => this.props.setTitle(title)}
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
              value={this.props.description}
              onChangeText={description =>
                this.props.setDescription(description)
              }
            />
            <View style={{ backgroundColor: '#841584', width: '90%' }}>
              {this.props.locationFormType === 'Create' ? (
                <Button onPress={this.props.onSave} title="Save" color="#fff" />
              ) : (
                <Button
                  onPress={this.props.onUpdate}
                  title="Update"
                  color="#fff"
                />
              )}
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
                onPress={this.props.onCancel}
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

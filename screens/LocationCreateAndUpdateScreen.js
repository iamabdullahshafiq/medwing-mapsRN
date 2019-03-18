import React from 'react';
import {
  Modal,
  StyleSheet,
  View,
  Text,
  Alert,
  TextInput,
  Button,
  ActivityIndicator
} from 'react-native';

export class LocationCreateAndUpdateScreen extends React.Component {
  _validateTitle = () => {
    const title = this.props.title.replace(/ /g, '');
    if (title === '') {
      return true;
    } else {
      return false;
    }
  };
  _renderButton = () => {
    const { isLoading, locationFormType, onSave, onUpdate } = this.props;
    if (isLoading) {
      return <ActivityIndicator size="large" color="#fff" />;
    } else {
      if (locationFormType === 'Create') {
        return (
          <Button
            onPress={onSave}
            disabled={this._validateTitle()}
            title="Save"
            color="#fff"
          />
        );
      } else {
        return (
          <Button
            onPress={onUpdate}
            disabled={this._validateTitle()}
            title="Update"
            color="#fff"
          />
        );
      }
    }
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
        <View style={styles.container}>
          <View style={styles.card}>
            <Text style={styles.header}>
              {this.props.locationFormType === 'Create'
                ? 'Create Location'
                : 'Update Location'}
            </Text>

            <Text style={styles.label}>Title</Text>

            <TextInput
              style={[
                styles.textInput,
                this._validateTitle() ? styles.textInputError : null
              ]}
              value={this.props.title}
              onChangeText={title => this.props.setTitle(title)}
            />

            <Text style={styles.label}>Description</Text>

            <TextInput
              style={styles.textInput}
              value={this.props.description}
              onChangeText={description =>
                this.props.setDescription(description)
              }
            />
            <View style={styles.submitButton}>{this._renderButton()}</View>

            <View style={styles.cancelButton}>
              <Button
                onPress={this.props.onCancel}
                disabled={this.props.isLoading}
                title="Cancel"
                color="#841584"
              />
            </View>
          </View>
        </View>
      </Modal>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)'
  },
  card: {
    backgroundColor: '#fff',
    padding: 10,
    width: '90%',
    alignItems: 'center',
    justifyContent: 'center'
  },
  header: {
    color: '#841584',
    paddingVertical: 10,
    fontSize: 20,
    fontWeight: 'bold'
  },
  label: {
    width: '90%',
    textAlign: 'left',
    color: '#841584'
  },
  textInput: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    width: '90%',
    marginVertical: 10,
    padding: 10
  },
  textInputError: {
    height: 40,
    borderColor: 'red',
    borderWidth: 1,
    width: '90%',
    marginVertical: 10,
    padding: 10
  },
  submitButton: {
    backgroundColor: '#841584',
    width: '90%'
  },
  cancelButton: {
    borderWidth: 1,
    borderColor: '#841584',
    width: '90%',
    marginVertical: 10
  }
});

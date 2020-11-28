//Registration.js
import React, { Component } from 'react';
import {
  View,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Text,
  Alert,
  Image,
  Button,
  ImageBackground,
  TextInput,
} from 'react-native';

import { useRoute } from '@react-navigation/native';
import firestore from './firebase/Firestore';
import { connect } from 'react-redux';
import { addCar, editCar, deleteCar } from './actions/car';


class Edit extends Component {
  constructor(props) {
    super(props);

    const { route } = this.props;
    this.route = route
    this.state = {
      model: route.params.car.model,
      description: route.params.car.description,
    };
  }

  updateSuccess = () => {
    let car = {
      model: this.state.model,
      description: this.state.description,
      id: this.route.params.car.id
    }
    this.props.edit(car)
    console.log('onEdit')
    console.log(this.props.cars)
    console.log('onEdit END')
    this.props.navigation.navigate('MyBottomtab');
  };

  reject = (error) => {
    console.log(error);
  }

  onEdit = async () => {
    let car = {
      model: this.state.model,
      description: this.state.description,
      id: this.route.params.car.id,
    }
    await firestore.updateCarByID(car, this.updateSuccess, this.reject);

  };

  deleteSuccess = () => {
    let car = {
      model: this.state.model,
      description: this.state.description,
      id: this.route.params.car.id
    }
    this.props.del(car);
    console.log('onDelete')
    console.log(this.props.cars)
    console.log('onDelete END')
    this.props.navigation.navigate('MyBottomtab');
  }

  onDelete = async () => {
    let id = this.route.params.car.id;
    await firestore.deleteCar(id, this.deleteSuccess, this.reject);
  }



  onCancel = () => {
    this.props.navigation.navigate('MyBottomtab');
  };

  render(props) {
    const { navigation } = this.props;

    return (
      <View style={{ flex: 1, justifyContent: "center" }}>
        <View style={styles.middle}>
          <View style={{ flexDirection: 'row', marginBottom: 16 }}>
            <Text style={{ fontSize: 25, marginStart: 8, alignSelf: 'center' }}>
              Edit Car
            </Text>
          </View>

          <TextInput
            placeholder="Model"
            value={this.state.model}
            style={styles.textInput}
            onChangeText={(txt) => {
              this.setState({ model: txt });
            }}
          />


          <TextInput
            placeholder="Description"
            value={this.state.description}
            style={[styles.textInput, { height: 150, paddingTop: 8 }]}
            multiline={true}
            onChangeText={(txt) => {
              this.setState({ description: txt });
            }}
          />

          <TouchableOpacity
            style={styles.buttonLogin}
            onPress={this.onEdit}>
            <Text style={{ fontSize: 15 }}>Edit</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.buttonLogin}
            onPress={this.onDelete}>
            <Text style={{ fontSize: 15 }}>Delete</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.buttonLogin} onPress={this.onCancel}>
            <Text style={{ fontSize: 15 }}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  middle: {
    backgroundColor: '#ffffff',
    borderWidth: 1,
    padding: 16,
    margin: 16,
  },
  buttonLogin: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#DDDDDD',
    borderRadius: 25,
    height: 50,
    marginBottom: 8,
  },
  textInput: {
    borderRadius: 25,
    height: 50,
    borderColor: 'gray',
    borderWidth: 1,
    paddingStart: 10,
    paddingEnd: 10,
    marginBottom: 8,
  },
});

const mapStateToProps = (state) => {
  return {
    cars: state.carReducer.cars
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    del: (id) => dispatch(deleteCar(id)),
    edit: (car) => dispatch(editCar(car))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Edit);

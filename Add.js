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
import firestore from './firebase/Firestore.js'
import { connect } from 'react-redux';
import { addCar } from './actions/car';

class Add extends Component {

  constructor(props) {
    super(props);
    this.state = {
      model: null,
      des: null,
      firstname: this.props.todos.firstname,
      lastname: this.props.todos.lastname,
      uid: this.props.todos.uid, // auth.user.uid
      // docId: this.props.todos.id //doc.id
    };
  }

  reject = (error) => {
    console.log(error);
  }

  success = (docRef) => {
    console.log('addCar Success');
    console.log(docRef);
    let car = {
      model: this.state.model,
      description: this.state.des,
      id: docRef.id,
      uid: this.state.uid,
      firstname: this.state.firstname,
      lastname: this.state.lastname,
    }
    //console.log(car)
    this.props.add(car)
    console.log('onAdd')
    console.log(this.props.cars)
    console.log('onAdd END')
    this.props.navigation.navigate('MyBottomtab');
  };


  onAdd = () => {
    var car = {
      model: this.state.model,
      description: this.state.des,
      //////
      uid: this.state.uid,
      firstname: this.state.firstname,
      lastname: this.state.lastname,

    }
    firestore.addCar(car, this.success, this.reject);

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
              Add Car
            </Text>
          </View>

          <TextInput
            placeholder="Model"
            style={styles.textInput}
            onChangeText={(txt) => {
              this.setState({ model: txt });
            }}
          />

          <TextInput
            placeholder="Description"
            style={[styles.textInput, { height: 150, paddingTop: 8 }]}
            multiline={true}
            onChangeText={(txt) => {
              this.setState({ des: txt });
            }}
          />

          <TouchableOpacity
            style={styles.buttonLogin}
            onPress={this.onAdd}>
            <Text style={{ fontSize: 15 }}>Add</Text>
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
    todos: state.userReducer.userList,
    cars: state.carReducer.cars
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    add: (car) => dispatch(addCar(car))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Add);

import React, { Component } from 'react';
import { View, StyleSheet, Image, TextInput, TouchableOpacity, Text, ImageBackground, Alert } from "react-native";
import { connect } from 'react-redux';
import firestore from './firebase/Firestore'
import { addUser } from './actions/User';
import auth from './firebase/Auth';
import { updateCar } from './actions/car';
import * as firebase from 'firebase';

import 'firebase/storage';
import * as ImagePicker from 'expo-image-picker';
import storage from './firebase/Storage';

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: this.props.todos.id, //docId
      // username: this.props.todos.username,
      //   studentID: this.props.todos.studentID,
      firstname: this.props.todos.firstname,
      lastname: this.props.todos.lastname,
      image: this.props.todos.uri,
      uri: null
    };
  }


  logOut = () => {
    auth.signOut(this.reject)
    this.props.navigation.navigate("Login");
    // console.log(this.props.todos)
  }


  reject = (error) => {
    console.log(error);
    console.log('error on ProfileUpdate')
  }

  //////// Now //////////////////
  updateCarSuccess = () => {
    console.log('Nice Update')
  }


  updateSuccess = () => {
    console.log("update success")
    let user = {
      firstname: this.state.firstname,
      lastname: this.state.lastname,
      id: this.state.id,
      uri: this.state.uri
    }
    this.props.add(user);
    Alert.alert(
      "Update Success",
      "Update Your Account Success",
      [
        { text: "OK", }
      ],
      { cancelable: false }
    );
    console.log(this.props.todos)
  }
  //////////////////// NOW /////////////

  onGetCarByUid = async (querySnapshot) => {
    var cars = []
    let upCar = {
      firstname: this.state.firstname,
      lastname: this.state.lastname,
      uid: firebase.auth().currentUser.uid,
      uri: this.state.uri,
      // number : Math.floor(Math.random())
    }
    querySnapshot.forEach(async function (doc) {
      let car = doc.data();
      car.id = doc.id
      cars = cars.concat(car);
    });

    await cars.map((car) => { firestore.updateUserPost(car, upCar, this.updateCarSuccess, this.reject) })
    console.log('onGetCarByUid Before Success');
    console.log(cars);
    this.props.updateCar(upCar)
    console.log(upCar)
    console.log('onUpCar')
    console.log(this.props.cars)
    // this.props.add(users[0])

    console.log('onUpCar END')
  }

  uploadSuccess = async (uri) => {
    // console.log('Uploaded Success...');

    // this.setState({ uri: uri })
    // console.log(this.state.uri);

    // var User = {
    //   firstname: this.state.firstname,
    //   lastname: this.state.lastname,
    //   uid: firebase.auth().currentUser.uid,
    //   uri: uri
    // }

    // await firestore.addUser(User, this.success, this.unsuccess);
    // this.props.add(User);
  };

  uploadError = (error) => {
    console.log('Uploaded Error...');
    console.log(error);
  };

  onSaveEdit = async () => {
    await storage.uploadToFirebase(
      this.state.image,
      this.state.number,
      // this.uploadSuccess,
      this.editProfile,
      this.uploadError,
    );
  }

  editProfile = async (uri) => {

    this.setState({ uri: uri })
    let user = {
      firstname: this.state.firstname,
      lastname: this.state.lastname,
      id: this.state.id,
      uri: uri
      //   studentID: this.state.studentID,
      //   username: this.state.username,
    }

    let car = {
      firstname: this.state.firstname,
      lastname: this.state.lastname,
      uid: firebase.auth().currentUser.uid,
      uri: uri
    }
    console.log('onEditProfile User : ', user)
    console.log(firebase.auth().currentUser.uid)
    await firestore.updateUser(user, this.updateSuccess, this.reject)
    console.log('onEditProfile Car : ', car)
    await firestore.getCarByUid(car, this.onGetCarByUid, this.reject)
  }


  Header = () => {
    return (
      <View style={styles.header}>
        <Image
          style={styles.image}
          source={{
            uri: 'https://sv1.picz.in.th/images/2020/07/28/Ez0iOl.png',
          }} />
        <Text style={styles.headerText}>Edit Account</Text>
      </View>
    );
  }

  ///////////////// image ///////////////////////
  pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      quality: 1, //og  size
    });
    if (!result.cancelled) {
      console.log(result);
      this.setState({ image: result.uri });
    }
  };



  render(props) {
    return (
      <View style={{ flex: 1, paddingTop: 30 }}>
        <this.Header />

        <View style={styles.onimage}>
          <TouchableOpacity onPress={this.pickImage}>
            <Image style={styles.icon} source={{
              uri: this.state.image
            }} />
          </TouchableOpacity>
        </View>

        <View style={styles.middle} >
          <TextInput placeholder="First Name" style={styles.textInput} value={this.state.firstname}
            onChangeText={(firstname) => this.setState({ firstname })} />

          <TextInput placeholder="Last Name" style={styles.textInput} value={this.state.lastname}
            onChangeText={(lastname) => this.setState({ lastname })} />

          <TouchableOpacity style={styles.buttonLogin} onPress={this.onSaveEdit}>
            <Text style={{ fontSize: 15 }}>Save</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.buttonLogin} onPress={this.logOut}>
            <Text style={{ fontSize: 15 }}>Logout</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    height: 70,
    borderBottomWidth: 1,
    borderBottomColor: "gray",
  },
  headerText: {
    fontSize: 25
  },
  image: {
    width: 60,
    height: 60,
    resizeMode: 'contain',
    alignSelf: 'center',
    marginLeft: 8,
    marginRight: 8
  },
  buttonLogin: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#DDDDDD",
    borderRadius: 25,
    height: 50,
    marginBottom: 8
  },
  textInput: {
    borderRadius: 25,
    height: 50,
    borderColor: 'gray',
    borderWidth: 1,
    paddingStart: 20,
    marginBottom: 8
  },
  middle: {
    backgroundColor: '#ffffff',
    padding: 16,
    margin: 16,
  },
  icon: {
    height: 180,
    width: 180,
    borderRadius: 90,
    backgroundColor: 'blue',
    alignSelf: 'center',
    opacity: 1
  },
  onimage: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
    margin: 1,
    paddingTop: 35,
    backgroundColor: 'white',
    width: "100%"
  },
});

const mapDispatchToProps = (dispatch) => {
  return {
    add: (user) => dispatch(addUser(user)),
    addCar: (car) => dispatch(addCar(car)),
    updateCar: (car) => dispatch(updateCar(car)),
  }
}

const mapStateToProps = (state) => {

  return {
    todos: state.userReducer.userList,
    cars: state.carReducer.cars,
    // getUpdateCar: state.carReducer.cars
  }

}
export default connect(mapStateToProps, mapDispatchToProps)(Profile);


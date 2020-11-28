import React, { Component } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  Alert,
  Image

} from 'react-native';
import * as firebase from 'firebase';

import '@firebase/firestore'
import '@firebase/auth';
import { connect } from 'react-redux';
import { addUser } from './actions/User';
import firestore from './firebase/Firestore'
import auth from './firebase/Auth'
import 'firebase/storage';
import * as ImagePicker from 'expo-image-picker';
import storage from './firebase/Storage';

class Registraion extends Component {
  constructor(props) {
    super(props);
    this.state = {

      email: null,
      password: null,
      firstname: null,
      lastname: null,
      // username: null,
      image: "https://sv1.picz.in.th/images/2020/08/01/EhqNgn.png",
      uri: null

    };
    // this.Auth = firebase.auth().currentUser

  }

  componentDidMount() {

  }



  success = (docRef) => {
    // auth.signOut(this.reject)
    Alert.alert(
      "Success",
      "Add Your Account Success",
      [
        // { text: "OK", onPress: () => this.props.navigation.navigate("Login") }
        { text: "OK" }
      ],
      { cancelable: false }
    );

    console.log("Regis success")
    // firebase.auth().onAuthStateChanged(user => {

    //   if (user != null) {

    //     this.setState({ uid: user.uid })
    //     console.log(this.state.uid)
    //   } else {


    //   }

    // })
  }
  unsuccess = (error) => {

    console.log("Storage Error")
    console.log(error)
    Alert.alert(
      "Alert !!",
      "Register Account UnSuccess",
      [
        // { text: "OK", onPress: () => this.props.navigation.navigate("Login") }
        { text: "OK" }
      ],
      { cancelable: false }
    );

  }

  uploadSuccess = async (uri) => {
    console.log('Uploaded Success...');
    this.setState({ uri: uri })
    console.log(this.state.uri);
    var User = {
      firstname: this.state.firstname,
      lastname: this.state.lastname,
      uid: firebase.auth().currentUser.uid,
      uri: uri
    }
    await firestore.addUser(User, this.success, this.unsuccess);
    this.props.add(User);
  };

  uploadError = (error) => {
    console.log('Uploaded Error...');
    console.log(error);
  };
  onUpload = (progress) => {
    console.log('onUpload...');
    console.log(progress);
  };

  addProfile = async (payload) => {
    /////// Storage /////////
    await storage.uploadToFirebase(
      this.state.image,
      this.state.email, //name file
      this.uploadSuccess,
      this.uploadError,
    );
    ///////////////////
    // var User = {
    //   firstname: this.state.firstname,
    //   lastname: this.state.lastname,
    //   uid: payload.user.uid,
    //   // uri: this.state.uri
    // }
    // await firestore.addUser(User, this.success, this.unsuccess);
    // this.props.add(User);
  }

  onRegister = async () => {

    await auth.createUser(this.state.email, this.state.password, this.addProfile, this.unsuccess)
    //  await this.props.add(User)
    //await auth.createUser(this.state.email, this.state.password, this.unsuccess)
    // await firestore.addUser(User, this.success, this.unsuccess);
    console.log("Regis")

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
    const { navigation } = this.props;
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', paddingTop: 35 }} >

        <View style={styles.onimage}>
          <TouchableOpacity onPress={this.pickImage}>
            <Image style={styles.icon} source={{
              uri: this.state.image
            }} />
          </TouchableOpacity>
        </View>

        <View style={styles.content}>

          <TextInput
            placeholder="FirstName"
            style={styles.textInput}
            onChangeText={txt => { this.setState({ firstname: txt }) }}
          />
          {/* {txt => (txt === '' && aaaa) ? <Text>please </Text> : ''} */}


          <TextInput
            placeholder="LastName"
            style={styles.textInput}
            onChangeText={txt => { this.setState({ lastname: txt }) }} />

          <TextInput
            placeholder="Email"
            style={styles.textInput}
            onChangeText={txt => { this.setState({ email: txt }) }} />

          <TextInput
            placeholder="Password"
            style={styles.textInput}
            secureTextEntry={true}
            onChangeText={txt => { this.setState({ password: txt }) }} />

          <TouchableOpacity
            style={styles.buttonLogin}
            onPress={this.onRegister}>
            <Text style={{ fontSize: 15 }}>Register</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => this.props.navigation.navigate('Login')}>
            <Text style={{ textAlign: 'right', color: 'blue' }}>Sign In </Text>
          </TouchableOpacity>

        </View>

      </View >
    );
  }
}

const styles = StyleSheet.create({
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
  onimage: {
    flex: 1,
    padding: 16,
    margin: 1,
    paddingTop: 35,

    width: "100%"
  },
  content: {
    flex: 2,
    padding: 16,
    margin: 16,
    width: "90%"
  },
  icon: {
    height: 180,
    width: 180,
    borderRadius: 90,
    // backgroundColor:'gray',
    alignSelf: 'center',
    opacity: 1
  },


});

const mapDispatchToProps = (dispatch) => {
  return {
    add: (user) => dispatch(addUser(user))
  }
}

const mapStateToProps = (state) => {
  return {
    todos: state.userReducer.userList
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Registraion);
// export default Registraion;
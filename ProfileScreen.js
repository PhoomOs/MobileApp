import React, { Component } from 'react';
import { View, StyleSheet, Image, TextInput, TouchableOpacity, Text, ImageBackground, Alert } from "react-native";
import { connect } from 'react-redux';
import firestore from './firebase/Firestore'
import { addUser } from './actions/User';
import auth from './firebase/Auth';
import * as firebase from 'firebase';
class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: this.props.todos.id,
      // username: this.props.todos.username,
      //   studentID: this.props.todos.studentID,
      firstname: this.props.todos.firstname,
      lastname: this.props.todos.lastname,
    };
  }

  logOut = () => {
    auth.signOut(this.reject)
    this.props.navigation.navigate("Login");
    // console.log(this.props.todos)
  }

  reject = (error) => {
    console.log(error);
  }

  updateSuccess = () => {
    console.log("update success")
    let user = {
      firstname: this.state.firstname,
      lastname: this.state.lastname,
      id: this.state.id,
      //   studentID: this.state.studentID,
      //   username: this.state.username,
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
  
  editProfile = async () => {
    let user = {
      firstname: this.state.firstname,
      lastname: this.state.lastname,
      id: this.state.id,
      //   studentID: this.state.studentID,
      //   username: this.state.username,
    }
    console.log('onEditProfile User : ', user)
    console.log(firebase.auth().currentUser.uid)
    await firestore.updateUser(user, this.updateSuccess, this.reject)
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
  
  render(props) {
    return (
      <View style={{ flex: 1, paddingTop: 30 }}>
        <this.Header />
        <View style={styles.middle} >
          <TextInput placeholder="First Name" style={styles.textInput} value={this.state.firstname}
            onChangeText={(firstname) => this.setState({ firstname })} />

          <TextInput placeholder="Last Name" style={styles.textInput} value={this.state.lastname}
            onChangeText={(lastname) => this.setState({ lastname })} />

          {/* <TextInput placeholder="StudentID" style={styles.textInput} value={this.state.studentID}
            onChangeText={(studentID) => this.setState({ studentID })} /> */}

          {/* <TextInput placeholder="Username" style={styles.textInput} value={this.state.username}
            onChangeText={(username) => this.setState({ username })} /> */}


          <TouchableOpacity style={styles.buttonLogin} onPress={this.editProfile}>
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
export default connect(mapStateToProps, mapDispatchToProps)(Profile);


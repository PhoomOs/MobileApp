// import React, { Component } from 'react';
// import {
//   View, TouchableOpacity, StyleSheet, Text, Alert, Image, ImageBackground, TextInput
// } from 'react-native';
// import firestore from './firebase/Firestore'
// class Registration extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       firstname: null,
//       lastname: null,
//       studentid: null,
//       username: null,

//     };

//   }

//   success = (docRef) => {
//     Alert.alert(
//       "Success",
//       "Add Your Account Success",
//       [
//         { text: "OK", onPress: () => this.props.navigation.navigate("Login") }
//       ],
//       { cancelable: false }
//     );
//   }
//   addProfile = async () => {
//     var User = {
//       firstname: this.state.firstname,
//       lastname: this.state.lastname,
//       studentID: this.state.studentid,
//       username: this.state.username
//     }
//     await firestore.addUser(User, this.success, this.reject);
//   }

//   cancel = () => {
//     this.props.navigation.navigate("Login")
//   }
//   render(props) {
//     const { navigation } = this.props;
//     return (
//       <ImageBackground
//         style={styles.imageBackground}
//         source={{ uri: 'https://sv1.picz.in.th/images/2020/07/28/EYFj0b.jpg' }}
//         blurRadius={1}>


//         <View style={styles.middle} >
//           <View style={{ flexDirection: 'row', marginBottom: 16 }}>
//             <Image
//               style={styles.image}
//               source={{ uri: 'https://sv1.picz.in.th/images/2020/07/28/Ez0iOl.png' }}
//             />
//             <Text style={{ fontSize: 25, marginStart: 8, alignSelf: "center" }}>Registration</Text>
//           </View>

//           <TextInput placeholder="First Name" style={styles.textInput}
//             onChangeText={(firstname) => this.setState({ firstname })} />

//           <TextInput placeholder="Last Name" style={styles.textInput}
//             onChangeText={(lastname) => this.setState({ lastname })} />

//           <TextInput placeholder="StudentID" style={styles.textInput}
//             onChangeText={(studentid) => this.setState({ studentid })} />

//           <TextInput placeholder="Username" style={styles.textInput}
//             onChangeText={(username) => this.setState({ username })} />


//           <TouchableOpacity style={styles.buttonLogin} onPress={this.addProfile}>
//             <Text style={{ fontSize: 15 }}>Registor</Text>
//           </TouchableOpacity>

//           <TouchableOpacity style={styles.buttonLogin} onPress={this.cancel}>
//             <Text style={{ fontSize: 15 }}>Cancel</Text>
//           </TouchableOpacity>

//         </View>
//       </ImageBackground>
//     );

//   }
// }
// const styles = StyleSheet.create({
//   middle: {
//     backgroundColor: '#ffffff',
//     borderWidth: 1,
//     padding: 16,
//     margin: 16,
//     borderTopLeftRadius: 50,
//     borderBottomRightRadius: 50,
//   },
//   image: {
//     width: 60,
//     height: 60,
//     resizeMode: 'contain',
//     alignSelf: 'center',
//     marginBottom: 8

//   },
//   imageBackground: {
//     flex: 1,
//     resizeMode: "cover",
//     justifyContent: "center"
//   },
//   buttonLogin: {
//     justifyContent: "center",
//     alignItems: "center",
//     backgroundColor: "#DDDDDD",
//     borderRadius: 25,
//     height: 50,
//     marginBottom: 8
//   },
//   textInput: {
//     borderRadius: 25,
//     height: 50,
//     borderColor: 'gray',
//     borderWidth: 1,
//     paddingStart: 20,
//     marginBottom: 8
//   },


// });

// export default Registration;

import React, { Component } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  Alert

} from 'react-native';
import * as firebase from 'firebase';

import '@firebase/firestore'
import '@firebase/auth';
import { connect } from 'react-redux';
import { addUser } from './actions/User';

import firestore from './firebase/Firestore'
import auth from './firebase/Auth'
class Registraion extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: null,
      password: null,
      firstname: null,
      lastname: null,
      username: null
    };

    // this.Auth = firebase.auth().currentUser
  }

  componentDidMount() {

  }

  success = (docRef) => {
    Alert.alert(
      "Success",
      "Add Your Account Success",
      [
        { text: "OK", onPress: () => this.props.navigation.navigate("Login") }
      ],
      { cancelable: false }
    );
    console.log("nice")
    // firebase.auth().onAuthStateChanged(user => {

    //   if (user != null) {

    //     this.setState({ uid: user.uid })
    //     console.log(this.state.uid)
    //   } else {


    //   }

    // })
  }
  unsuccess = (error) => {
    console.log(error)
  }

  addProfile = async (payload) => {
    var User = {
      firstname: this.state.firstname,
      lastname: this.state.lastname,
      uid: payload.user.uid
    }
    await firestore.addUser(User, this.success, this.unsuccess);
    this.props.add(User);
  }

  onRegister = async () => {
    await auth.createUser(this.state.email, this.state.password, this.addProfile, this.unsuccess)
    //  await this.props.add(User)
    //await auth.createUser(this.state.email, this.state.password, this.unsuccess)

    // await firestore.addUser(User, this.success, this.unsuccess);
    console.log("Regis")

  }

  render(props) {
    const { navigation } = this.props;
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }} >

        <View style={styles.content}>

          <TextInput
            placeholder="FirstName"
            style={styles.textInput}
            onChangeText={txt => { this.setState({ firstname: txt }) }} />

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
  content: {
    padding: 16,
    margin: 16,
    width: "90%"
  }

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
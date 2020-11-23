// import React, { Component } from 'react';
// import { View, StyleSheet, Image, TextInput, TouchableOpacity, Text, ImageBackground, Alert } from "react-native";
// import { connect } from 'react-redux';
// import firestore from './firebase/Firestore'
// import { addUser } from './actions/User';

// class Login extends Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             username: null,
//         };
//     }
//     success = (querySnapshot) => {
//         let username = this.state.username
//         var check = false;
//         var users = []

//         querySnapshot.forEach(function (doc) {
//             let user = doc.data();
//             user.id = doc.id;
//             users = users.concat(user)
//         });

//         console.log("this")
//         console.log(users)
//         console.log("endddddd")

//         for (let i = 0; i < users.length; i++) {
//             if (users[i].username === username) {
//                 check = true;
//                 this.props.add(users[i])
//                 console.log(this.props.todos);
//                 this.props.navigation.navigate("Menu");
//                 break;
//             }
//         }
//         if (!check) {
//             Alert.alert(
//                 "Login fail",
//                 "Please check your account",
//                 [
//                     { text: "OK", onPress: () => console.log("ok") }
//                 ],
//                 { cancelable: false }
//             );
//         }

//     }

//     reject = (error) => {
//         console.log(error);
//     }
//     onCheck = async () => {
//         await firestore.getUser(this.success, this.reject)
//     }
//     render(props) {
//         return (
//             <ImageBackground
//                 style={styles.imageBackground}
//                 source={{ uri: 'https://sv1.picz.in.th/images/2020/07/28/EYFj0b.jpg' }}
//                 blurRadius={1}>


//                 <View style={styles.middle} >
//                     <Image
//                         style={styles.image}
//                         source={{ uri: 'https://sv1.picz.in.th/images/2020/07/28/Ez0iOl.png' }}
//                     />
//                     <TextInput placeholder="Username" style={styles.textInput} onChangeText={(username) => this.setState({ username })} />

//                     <TouchableOpacity style={styles.buttonLogin} onPress={this.onCheck}>
//                         <Text style={{ fontSize: 15 }}>Login</Text>
//                     </TouchableOpacity>

//                     <TouchableOpacity style={styles.buttonRegister} onPress={() => this.props.navigation.navigate("Registration")}>
//                         <Text style={styles.text}>Registration</Text>
//                     </TouchableOpacity>
//                 </View>
//             </ImageBackground>
//         );
//     }
// }


// const styles = StyleSheet.create({
//     middle: {
//         backgroundColor: '#ffffff',
//         borderWidth: 1,
//         padding: 16,
//         margin: 16,
//         borderTopLeftRadius: 50,
//         borderBottomRightRadius: 50,
//     },
//     image: {
//         width: 120,
//         height: 120,
//         resizeMode: 'contain',
//         alignSelf: 'center',
//         marginBottom: 8

//     },
//     imageBackground: {
//         flex: 1,
//         resizeMode: "cover",
//         justifyContent: "center"
//     },
//     buttonLogin: {
//         justifyContent: "center",
//         alignItems: "center",
//         backgroundColor: "#DDDDDD",
//         borderRadius: 25,
//         height: 50,
//         marginBottom: 8
//     },
//     buttonRegister: {
//         justifyContent: "center",
//         alignItems: "flex-end",
//     },
//     textInput: {
//         borderRadius: 25,
//         height: 50,
//         borderColor: 'gray',
//         borderWidth: 1,
//         paddingStart: 20,
//         marginBottom: 8
//     },
//     text: {
//         fontSize: 12,
//         textDecorationLine: "underline",
//         color: 'blue',
//         marginBottom: 16
//     }

// });
// const mapDispatchToProps = (dispatch) => {
//     return {
//         add: (user) => dispatch(addUser(user))
//     }
// }
// const mapStateToProps = (state) => {
//     return {
//         todos: state.userReducer.userList
//     }
// }
// export default connect(mapStateToProps, mapDispatchToProps)(Login);

import React, { Component } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    TextInput,
    StyleSheet,
} from 'react-native';

import auth from './firebase/Auth';
import { connect } from 'react-redux';
import { addUser } from './actions/User';
import * as firebase from 'firebase';
import firestore from './firebase/Firestore'

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: null,
            password: null,
        };
    }

    //ทำงานอยู่ตลอดเวลาหลังจาก constructor
    componentDidMount() {
        auth.listeningCurrentUser(this.listeningUser);
    }

    // check login
    listeningUser = (user) => {
        if (user !== null) {
            // console.log('Login Successssss');
            // this.props.add(user)
            /////////////////// Car //////////////////////
            
            this.props.navigation.navigate('MyBottomtab');
            // this.props.navigation.navigate('Profile');
        }
        else {
            this.props.navigation.navigate('Login');
        }
    }

    onreject = (error) => {
        console.log(error);

    };

    onsuccess = (querySnapshot) => {
        var users = []
        querySnapshot.forEach(function (doc) {
            let user = doc.data();
            user.id = doc.id 
            users = users.concat(user);
        });
        console.log('onLogin Success');
        console.log(users);
        this.props.add(users[0])
    }

    onLoad = (querySnapshot) => {
        console.log('click');
        let uid = querySnapshot.user.uid
        console.log(uid)
        console.log("this")
        firestore.getUserByUid(uid, this.onsuccess, this.onreject)

        this.props.navigation.navigate("MyBottomtab");
        // .forEach(function (doc) {
        //         let user = doc.data();
        //         users = users.concat(user)
        //     });


        // console.log(users)
        // console.log("endddddd")
        // console.log(uid)
        // for (let i = 0; i < users.length; i++) {
        //     if (users[i].uid == uid) {
        //         check = true;
        //         this.props.add(users[i])
        //         // console.log(this.props.todos);
        //         auth.signIn(this.state.email, this.state.password, this.onreject);

        //         console.log("SignIn")
        //         console.log(check)
        //         break;
        //     }
        // }

        // if (!check) {
        //     Alert.alert(
        //         "Login fail",
        //         "Please check your account",
        //         [
        //             { text: "OK", onPress: () => console.log("ok") }
        //         ],
        //         { cancelable: false }
        //     );
        // }
    };

    onLogout = () => {
        auth.signOut(this.onSignoutSuccess, this.onreject);

    };
    onSignoutSuccess = () => {
        console.log('Signout Success');
    };
    onLogin = async () => {
         await auth.signIn(this.state.email, this.state.password, this.onLoad, this.onreject);
        // auth.signOut(this.onSignoutSuccess, this.onreject);
    }

    render(props) {
        const { navigation } = this.props;
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <View style={styles.content}>
                    <TextInput
                        placeholder="email"
                        style={styles.textInput}
                        onChangeText={(txt) => {
                            this.setState({ email: txt });
                        }}
                    />

                    <TextInput
                        placeholder="Password"
                        style={styles.textInput}
                        onChangeText={(txt) => {
                            this.setState({ password: txt });
                        }}
                    />

                    <TouchableOpacity style={styles.buttonLogin} onPress={this.onLogin}>
                        <Text style={{ fontSize: 15 }}>Login</Text>
                    </TouchableOpacity>

                    {/* <TouchableOpacity style={styles.buttonLogin} onPress={this.onLogout}>
                        <Text style={{ fontSize: 15 }}>Logout</Text>
                    </TouchableOpacity> */}

                    <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
                        <TouchableOpacity
                            onPress={() => {
                                this.props.navigation.navigate('Registration');
                            }}>
                            <Text style={{ fontSize: 15, color: 'blue' }}>
                                Registration,{' '}
                            </Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            onPress={() => this.props.navigation.navigate('RecoverPassword')}>
                            <Text style={{ fontSize: 15, color: 'blue' }}>
                                Forget password
              </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
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
        paddingStart: 20,
        marginBottom: 8,
    },
    content: {
        padding: 16,
        margin: 16,
        width: '90%',
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
export default connect(mapStateToProps, mapDispatchToProps)(Login);

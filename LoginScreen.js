
import React, { Component } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    TextInput,
    StyleSheet,
    Alert
} from 'react-native';

import auth from './firebase/Auth';
import { connect } from 'react-redux';
import { addUser } from './actions/User';
import * as firebase from 'firebase';
import firestore from './firebase/Firestore'
import { addCar } from './actions/car';

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
        // auth.listeningCurrentUser(this.listeningUser);
        firestore.getAllCar(this.onSuccessPost, this.onreject);

    }

    // check login
    listeningUser = (user) => {
        if (user !== null) {
            // console.log('Login Successssss');
            // this.props.add(user)
            /////////////////// Car //////////////////////

            // this.props.navigation.navigate('MyBottomtab');

            // this.props.navigation.navigate('Profile');
        }
        else {
            this.props.navigation.navigate('Login');
        }
    }

    onreject = (error) => {
        console.log(error);
        Alert.alert(
            "Alert !!",
            "Login UnSuccess",
            [
                // { text: "OK", onPress: () => this.props.navigation.navigate("Login") }
                { text: "OK" }
            ],
            { cancelable: false }
        );

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
        this.props.navigation.navigate("MyBottomtab");
        Alert.alert(
            "Alert !!",
            "Login Success",
            [
                // { text: "OK", onPress: () => this.props.navigation.navigate("Login") }
                { text: "OK" }
            ],
            { cancelable: false }
        );

    }


    onSuccessPost = (querySnapshot) => {
        var cars = []
        querySnapshot.forEach(function (doc) {
            let car = doc.data();
            car.id = doc.id;
            cars = cars.concat(car);
        });
        this.props.addCar(cars)
        console.log('onLogin')
        console.log(cars);
        console.log('onLogin END')
        //  this.props.navigation.navigate("MyBottomtab");
    }

    onLoad = (querySnapshot) => {

        console.log('click');
        let uid = querySnapshot.user.uid
        console.log(uid)
        console.log("this")
        firestore.getUserByUid(uid, this.onsuccess, this.onreject)
        // firestore.getAllCar(this.onSuccessPost, this.onreject);

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
                        secureTextEntry={true}
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
        add: (user) => dispatch(addUser(user)),
        addCar: (car) => dispatch(addCar(car))
    }
}
const mapStateToProps = (state) => {
    return {
        todos: state.userReducer.userList,
        cars: state.carReducer.cars
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Login);

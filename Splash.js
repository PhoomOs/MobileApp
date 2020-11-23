//Splash.js
import React, { Component } from 'react';
import {
  View,Text
} from 'react-native';
import auth from './firebase/Auth'
import firestore from './firebase/Firestore'
class Splash extends Component {
  constructor(props){
    super(props);
     this.state = {
 
    };
  }

  getUnsuccess=(error)=>{
     console.log(error);
  }
 
  
  componentDidMount() {
    auth.listeningCurrentUser(this.listeningUser);
  }

  // check login
  listeningUser=(user)=>{
    if (user !== null ){
      console.log('Login Success');
      
      // this.props.navigation.navigate('MyBottomtab');
      //  auth.signOut(this.getUnsuccess)
      this.props.navigation.navigate('Login');
    }
    else{
      this.props.navigation.navigate('Login');
    }
  }

  render(props) {
    const { navigation } = this.props;
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
           <Text style={{color:"black", fontSize:32}}>Splash Screen</Text>
        </View>
    );
  }
}


export default Splash;
// App.js
import React, { Component } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';
import { useRoute } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';

import Add from './Add'
import Edit from './Edit'
import Menu from './Menu'
import Splash from './Splash'
import Login from './LoginScreen';
import Registration from './RegistrationScreen'
import RecoverPassword from './RecoverPassword';
import Profile from './ProfileScreen'

import { Provider } from 'react-redux'
import configureStore from './Store'


const AddScreen = () => {
  const navigation = useNavigation();
  return (
    <Add navigation={navigation} />
  );
}

const SplashScreen = () => {
  const navigation = useNavigation();
  return (
    <Splash navigation={navigation} />
  );
}

const EditScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  return (
    <Edit navigation={navigation} route={route} />
  );
}

const MenuScreen = () => {
  const navigation = useNavigation();
  return (
    <Menu navigation={navigation} />
  );
}

function RegistrationScreen() {
  const navigation = useNavigation();
  return (
    <Registration navigation={navigation} />
  );
}
function ProfileScreen() {
  const navigation = useNavigation();
  return (
    <Profile navigation={navigation} />
  );
}

const RecoverPasswordScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  return (
    <RecoverPasswordScreen navigation={navigation} route={route} />
  );
}

function LoginScreen() {
  const navigation = useNavigation();
  return (
    <Login navigation={navigation} />
  );
}

const BottomTab = createBottomTabNavigator();
function MyBottomTab() {
  return (
    <BottomTab.Navigator tabBarOptions={{ activeTintColor: "#e91e63" }}>
      <BottomTab.Screen
        options={{ tabBarIcon: ({ color }) => (<MaterialCommunityIcons name="account" size={24} color={color} />) }}
        name="Menu" component={MenuScreen} />
      <BottomTab.Screen
        options={{ tabBarIcon: ({ color }) => (<MaterialCommunityIcons name="pencil" size={24} color={color} />) }}
        name="Profile" component={ProfileScreen} />
    </BottomTab.Navigator>
  );
}

const Stack = createStackNavigator();
function MyStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Splash"
        component={SplashScreen}
        options={{ headerShown: false }} />


      <Stack.Screen name="Login"
        options={{ headerShown: false }}
        component={LoginScreen} />

      <Stack.Screen name="Registration"
        options={{ headerShown: false }}
        component={RegistrationScreen} />

      <Stack.Screen name="RecoverPassword"
        options={{ headerShown: false }}
        component={RecoverPassword} />

      <Stack.Screen name="MyBottomtab"
        component={MyBottomTab}
        options={{ headerShown: false }} />

      <Stack.Screen name="Menu"
        component={MenuScreen}
        options={{ headerShown: false }} />

      <Stack.Screen name="Add"
        component={AddScreen}
        options={{ headerShown: false }} />

      <Stack.Screen name="Edit"
        component={EditScreen}
        options={{ headerShown: false }} />

    </Stack.Navigator>
  );
}


export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };

  }
  render(props) {
    return (
      <Provider store={configureStore}>
        <NavigationContainer>
          <MyStack />
        </NavigationContainer>
      </Provider>
    );
  }
}
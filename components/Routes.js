import 'react-native-gesture-handler';
import React, { Component, useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import {View, Text, Button, StyleSheet} from 'react-native';
import AppBar from './AppBar'
import BottomNavigation from './BottomNavigation'
import { Provider as PaperProvider } from 'react-native-paper';
import Profile from './Profile'

function HomeScreen({ navigation }) {
  return (
    <PaperProvider>
          {/* <LoginOrLogout></LoginOrLogout> */}
    <BottomNavigation></BottomNavigation>
    </PaperProvider>
  );
}

class DetailsScreen extends Component{
  render(){

  return (
    <View>
      <Text>Details Screen</Text>
    </View>
  );    
  }
}

const Stack = createStackNavigator();

export default class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      userLoggedIn: false
    }
  }

  componentDidMount(){
    
  }

  render(){
  return (
    <PaperProvider>
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home" screenOptions={{
          header: AppBar,
        }}>
          <Stack.Screen name="Home" component={HomeScreen} />
        {/* <Stack.Screen name="LoginOrLogout" component={LoginOrLogout} /> */}
        <Stack.Screen name="Details" component={DetailsScreen} />
        <Stack.Screen name="Profile" component={Profile} />
      </Stack.Navigator>
    </NavigationContainer>
    </PaperProvider>
  );
  }
}
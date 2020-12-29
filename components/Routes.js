import 'react-native-gesture-handler';
import React, { Component, useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import {View, Text, StyleSheet} from 'react-native';
import AppBar from './GlobalComponents/AppBar'
import BottomNavigation from './GlobalComponents/BottomNavigation'
import { Provider as PaperProvider, Button } from 'react-native-paper';
import { Root } from 'native-base'
import Profile from './Profile/Profile'
import AddTaskButton from './Tasks/AddTaskButton'
import PostTask from './Tasks/PostTask'
import SelectBounty from './Tasks/SelectBounty';

function HomeScreen({ navigation }) {
  return (
    <Root>
    <PaperProvider>
    <AddTaskButton navigation={navigation}></AddTaskButton>
    <BottomNavigation></BottomNavigation>
    </PaperProvider></Root>
  );
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
        <Stack.Screen name="PostTask" component={PostTask} />
        <Stack.Screen name="SelectBounty" component={SelectBounty} />
        <Stack.Screen name="Profile" component={Profile} />
      </Stack.Navigator>
    </NavigationContainer>
    </PaperProvider>
  );
  }
}
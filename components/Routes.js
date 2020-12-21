import 'react-native-gesture-handler';
import React, { Component } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import {View, Text, Button, StyleSheet} from 'react-native';
import AppBar from './AppBar'
import BottomNavigation from './BottomNavigation'
import { Provider as PaperProvider } from 'react-native-paper';

function HomeScreen() {
  return (
    <PaperProvider>
    <BottomNavigation></BottomNavigation>
    </PaperProvider>
  );
}

function DetailsScreen() {
  return (
    <View style={style.container}>
      <Text>Details Screen</Text>
    </View>
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
        <Stack.Screen name="Details" component={DetailsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
    </PaperProvider>
  );
  }
}
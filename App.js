import React, {useState} from 'react';
import {View, StyleSheet, FlatList, Alert, Dimensions} from 'react-native';
import AppBar from './components/AppBar'
import BottomNavigation from './components/BottomNavigation'
import { Provider as PaperProvider } from 'react-native-paper';

const App = () => {
  return (
    <PaperProvider>
    <AppBar></AppBar>
    <BottomNavigation></BottomNavigation>
    </PaperProvider>
  )
}




export default App;
import React, {useState} from 'react';
import {View, StyleSheet, FlatList, Alert, Dimensions} from 'react-native';
import AppBar from './components/GlobalComponents/AppBar'
import BottomNavigation from './components/GlobalComponents/BottomNavigation'
import { Provider as PaperProvider } from 'react-native-paper';
import Routes from './components/Routes'

const App = () => {
  return (
    <PaperProvider>
    <AppBar></AppBar>
    <BottomNavigation></BottomNavigation>
    </PaperProvider>
  )
}




export default Routes;
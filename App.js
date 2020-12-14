import React, {useState} from 'react';
import {View, StyleSheet, FlatList, Alert, Dimensions} from 'react-native';
import AppBar from './components/AppBar'
import BottomNavigation from './components/BottomNavigation'
import { Provider as PaperProvider } from 'react-native-paper';

let desctipton="Hallo, Ich bräuchte: 3x Äpfel, Tomaten, Faschiertes Rind, Käse, 3x Äpfel, Tomaten, Faschiertes Rind, Käse, 3x Äpfel, Tomaten, Faschiertes Rind, Käse, 3x Äpfel, Tomaten, Faschiertes Rind, Käse"

const App = () => {
  return (
    <PaperProvider>
    <AppBar></AppBar>
    <BottomNavigation></BottomNavigation>
    </PaperProvider>
  )
}




export default App;
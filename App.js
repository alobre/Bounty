import React, {useState} from 'react';
import {View, StyleSheet, FlatList, Alert, Dimensions} from 'react-native';
import TaskTab from './components/TaskTab'
import TaskCard from './components/TaskCard';
import BottomNavigation from './components/BottomNavigation'
import { Provider as PaperProvider } from 'react-native-paper';

let desctipton="Hallo, Ich bräuchte: 3x Äpfel, Tomaten, Faschiertes Rind, Käse, 3x Äpfel, Tomaten, Faschiertes Rind, Käse, 3x Äpfel, Tomaten, Faschiertes Rind, Käse, 3x Äpfel, Tomaten, Faschiertes Rind, Käse"

const App = () => {
  // const [item, setItem] = useState("Hallo, Ich bräuchte: 3x Äpfel, Tomaten, Faschiertes Rind, Käse")
  
  // let desctipton="Hallo, Ich bräuchte: 3x Äpfel, Tomaten, Faschiertes Rind, Käse"
  return (
    <PaperProvider>
    <BottomNavigation></BottomNavigation>
    </PaperProvider>
    // <PaperProvider>
    // <Container>
    //   <TaskCard username="alobre" title="Kleiner Einkauf" category="Einkauf" description={item} wage="5€"/>
    // </Container>
    // </PaperProvider>
  )
}




export default App;
import React from 'react';
import {View, StyleSheet, FlatList, Alert} from 'react-native';
import TaskCard from './components/TaskCard';
import {Container} from 'native-base'

const App = () => {

  return (
    <Container>
      <TaskCard username="alobre" title="Kleiner Einkauf" category="Einkauf" description="Hallo, ich bräuchte:" wage="5€"/>
    </Container>
  )
}




export default App;
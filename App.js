import React, {useState} from 'react';
import {View, StyleSheet, FlatList, Alert, Dimensions} from 'react-native';
import TaskCard from './components/TaskCard';
import { Provider as PaperProvider } from 'react-native-paper';
import {Container} from 'native-base'
import { TabView, SceneMap } from 'react-native-tab-view';

let desctipton="Hallo, Ich bräuchte: 3x Äpfel, Tomaten, Faschiertes Rind, Käse, 3x Äpfel, Tomaten, Faschiertes Rind, Käse, 3x Äpfel, Tomaten, Faschiertes Rind, Käse, 3x Äpfel, Tomaten, Faschiertes Rind, Käse"
const FirstRoute = () => (
  <TaskCard username="alobre" title="Kleiner Einkauf" category="Einkauf" description={desctipton} wage="5€"/>
);
const SecondRoute = () => (
  <View style={ {backgroundColor: '#673ab7'} } />
);
const initialLayout = { width: Dimensions.get('window').width };

const App = () => {
  // const [item, setItem] = useState("Hallo, Ich bräuchte: 3x Äpfel, Tomaten, Faschiertes Rind, Käse")
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: 'first', title: 'Empfehlung' },
    { key: 'second', title: 'Aktuell' },
  ]);

  const renderScene = SceneMap({
    first: FirstRoute,
    second: SecondRoute,
  });

  // let desctipton="Hallo, Ich bräuchte: 3x Äpfel, Tomaten, Faschiertes Rind, Käse"
  return (
    <PaperProvider>
    <TabView
      navigationState={{ index, routes }}
      renderScene={renderScene}
      onIndexChange={setIndex}
      initialLayout={initialLayout}
    />
    </PaperProvider>
    // <PaperProvider>
    // <Container>
    //   <TaskCard username="alobre" title="Kleiner Einkauf" category="Einkauf" description={item} wage="5€"/>
    // </Container>
    // </PaperProvider>
  )
}




export default App;
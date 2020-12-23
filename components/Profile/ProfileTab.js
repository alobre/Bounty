import * as React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { TabView, SceneMap } from 'react-native-tab-view';
import TaskCard from '../Tasks/TaskCard'

const description = 'Hallo! Ich hätte gerne: 4 Bananen, 6er Pack Wasser (prickelnd), Gouda, Salami'

const AssignedTasks = () => (
    <TaskCard username="alobre" title="Kleiner Einkauf" category="Einkauf" description={description} wage="5€"></TaskCard>
);

const YourTasks = () => (
  <View style={[styles.scene, { backgroundColor: '#673ab7' }]} />
);

const initialLayout = { width: Dimensions.get('window').width };

export default function TabViewExample() {
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: 'first', title: 'Assigned Tasks' },
    { key: 'second', title: 'Your Tasks' },
  ]);

  const renderScene = SceneMap({
    first: AssignedTasks,
    second: YourTasks,
  });

  return (
    <TabView
      navigationState={{ index, routes }}
      renderScene={renderScene}
      onIndexChange={setIndex}
      initialLayout={initialLayout}
    />
  );
}

const styles = StyleSheet.create({
  scene: {
    flex: 1,
  },
});
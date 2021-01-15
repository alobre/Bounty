import * as React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { ActivityIndicator, Colors, Text } from 'react-native-paper';
import { TabView, SceneMap } from 'react-native-tab-view';
import { ScrollView } from 'react-native-gesture-handler';
import YourTasks from '../Tasks/YourTasks'
import TaskCard from '../Tasks/TaskCard'
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';


const initialLayout = { width: Dimensions.get('window').width };

export default function ProfileTab() {


  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: 'first', title: 'Assigned Tasks' },
    { key: 'second', title: 'Your Tasks' },
  ]);


  const AssignedTasks = () => (
    <View>
      
    </View>
      // <TaskCard username="alobre" title="Kleiner Einkauf" tags="Einkauf" description={description} wage="5€"></TaskCard>
  );
  const YourTasks = () => (
    <YourTasks></YourTasks>
);


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
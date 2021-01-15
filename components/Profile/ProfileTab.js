import * as React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { ActivityIndicator, Colors, Text } from 'react-native-paper';
import { TabView, SceneMap } from 'react-native-tab-view';
import { ScrollView } from 'react-native-gesture-handler';
import UserTasks from './UserTasks'
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';


const initialLayout = { width: Dimensions.get('window').width };

export default function ProfileTab() {


  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: 'first', title: 'Deine Aufträge' },
    { key: 'second', title: 'Zugewiesene Aufträge' },
  ]);

  const YourTasks = () => (
    <View>
      <UserTasks uid={auth().currentUser.uid}/>
    </View>
    
);

  const AssignedTasks = () => (
    <View>
      
    </View>
      // <TaskCard username="alobre" title="Kleiner Einkauf" tags="Einkauf" description={description} wage="5€"></TaskCard>
  );


  const renderScene = SceneMap({
    first: YourTasks,
    second: AssignedTasks,
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
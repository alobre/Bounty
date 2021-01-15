import * as React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { ActivityIndicator, Colors, Text } from 'react-native-paper';
import { TabView, SceneMap } from 'react-native-tab-view';
import { ScrollView } from 'react-native-gesture-handler';
import UserProfileTasks from './UserProfileTasks'
import TaskCard from '../Tasks/TaskCard'
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';


const initialLayout = { width: Dimensions.get('window').width };

export default function ProfileTab({navigation, uid}) {


  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: 'first', title: 'Tasks' },
  ]);

  const Tasks = () => (
    <UserProfileTasks navigation={navigation} uid={uid}></UserProfileTasks>
);


  const renderScene = SceneMap({
    first: Tasks,
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
import React from 'react';
import { Dimensions, View, StyleSheet } from 'react-native'
import { TabView, SceneMap } from 'react-native-tab-view';
import RecommendedTasks from './RecommendedTasks'
import CurrentTasks from "./CurrentTasks";
import AddTaskButton from './AddTaskButton'

let globalNavigation;

const FirstRoute = () => (
  <View>
    <RecommendedTasks navigation={globalNavigation}/>
  </View>

  );
  const SecondRoute = () => (
    <View>
      <CurrentTasks navigation={globalNavigation}></CurrentTasks>
    </View>
  );
  const initialLayout = { width: Dimensions.get('window').width };

const TaskTab = ({navigation}) => {
  globalNavigation = navigation
    const [index, setIndex] = React.useState(1);
    const [routes] = React.useState([
      { key: 'first', title: 'Empfehlung' },
      { key: 'second', title: 'Aktuell' },
    ]);
  
    const renderScene = SceneMap({
      first: FirstRoute,
      second: SecondRoute,
    });

    return(
    <View style={styles.view}>
    <TabView
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={initialLayout}
        lazy={true}
      >
        
      </TabView>
      <AddTaskButton navigation={navigation}></AddTaskButton>
      </View>
      )
}

const styles = StyleSheet.create({
  view: {
    height: "100%"
  }
})

export default TaskTab
import React from 'react';
import { Dimensions, View } from 'react-native'
import { TabView, SceneMap } from 'react-native-tab-view';
import RecomendedTasks from './RecomendedTasks'
import CurrentTasks from "./CurrentTasks";

let globalNavigation;

const FirstRoute = () => (
    <RecomendedTasks/>
  );
  const SecondRoute = () => (
    <View>
      <CurrentTasks navigation={globalNavigation}></CurrentTasks>
    </View>
  );
  const initialLayout = { width: Dimensions.get('window').width };

const TaskTab = ({navigation}) => {
  globalNavigation = navigation
    const [index, setIndex] = React.useState(0);
    const [routes] = React.useState([
      { key: 'first', title: 'Empfehlung' },
      { key: 'second', title: 'Aktuell' },
    ]);
  
    const renderScene = SceneMap({
      first: FirstRoute,
      second: SecondRoute,
    });

    return(
    <TabView
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={initialLayout}
      />
      )
}

export default TaskTab
import React from 'react';
import {StyleSheet, View} from 'react-native'
import TaskTab from './TaskTab'
import globalStyles from './GlobalStyles.js'
import { BottomNavigation, Text } from 'react-native-paper';

const BountyRoute = () => <TaskTab></TaskTab>
const MessagesRoute = () => <Text>Messages</Text>;
const SettingsRoute = () => <Text>Settings</Text>;

const bottomNavigation = () => {
    const [index, setIndex] = React.useState(0);
    const [routes] = React.useState([
      { key: 'bounty', title: 'Bounty', icon: 'clipboard-outline', color: '#fff'},
      { key: 'messages', title: 'Messages', icon: 'comment-outline' },
      { key: 'settings', title: 'Settings', icon: 'cog-outline' },
    ]);
  
    const renderScene = BottomNavigation.SceneMap({
      bounty: BountyRoute,
      messages: MessagesRoute,
      settings: SettingsRoute,
    });

    return (
        <BottomNavigation
          navigationState={{ index, routes }}
          onIndexChange={setIndex}
          renderScene={renderScene}
        />
      );
}

export default bottomNavigation;
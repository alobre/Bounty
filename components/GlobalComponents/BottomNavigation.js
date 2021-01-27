import React from 'react';
import {StyleSheet, View} from 'react-native'
import TaskTab from '../Tasks/TaskTab'
import Messages from '../Messages'
import Conversations from '../Messaging/Conversations'
import globalStyles from './GlobalStyles.js'
import { BottomNavigation, Text } from 'react-native-paper';

let globalNavigation;

const BountyRoute = () => <TaskTab navigation={globalNavigation}></TaskTab>
const ConversationsRoute = () => <Conversations navigation={globalNavigation}></Conversations>;
const SettingsRoute = () => {};

const bottomNavigation = ({navigation}) => {
    globalNavigation = navigation
    const [index, setIndex] = React.useState(0);
    const [routes] = React.useState([
      { key: 'bounty', title: 'Bounty', icon: 'clipboard-outline', color: '#fff'},
      { key: 'messages', title: 'Messages', icon: 'comment-outline' },
      { key: 'settings', title: 'Settings', icon: 'cog-outline' },
    ]);
  
    const renderScene = BottomNavigation.SceneMap({
      bounty: BountyRoute,
      messages: ConversationsRoute,
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
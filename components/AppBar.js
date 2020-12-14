import React from 'react';
import { Appbar, Avatar } from 'react-native-paper';
import { StyleSheet } from 'react-native';

let profilePic="{require('../media/obama.jpg')}"

const AppBar = () => (
    <Appbar style={styles.bottom}>
       <Appbar.Action  onPress={() => console.log('Pressed label')}></Appbar.Action>
       <Avatar.Image style={styles.profile} size={24} source={require('../media/obama.jpg')} />
     </Appbar>
    );
   
   export default AppBar
   
   const styles = StyleSheet.create({
     bottom: {
       position: 'relative',
       top: 0,
       left: 0,
       right: 0,
       bottom: 0,
     },
   });
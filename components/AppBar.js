import React, { useState, useEffect } from 'react';
import { Appbar, Avatar, Text, Button , TouchableRipple} from 'react-native-paper';
import { StyleSheet } from 'react-native';
import { Col, Row, Grid } from "react-native-easy-grid";
import Login from './Login'
import Logout from './Logout'
import LoginOrLogout from './LoginOrLogout'

let profilePic="{require('../media/obama.jpg')}"
const MORE_ICON = Platform.OS === 'ios' ? 'dots-horizontal' : 'dots-vertical';

const AppBar = ({ navigation, previous }) => 
{
  let [loggedIn, setLoggedIn] = useState()
  let action;
  function callback(childData){
    setLoggedIn(childData);
  }
    if(loggedIn){
      // action = <Button onPress={()=> navigation.navigate('Profile')}>Alo</Button>
      action =             <TouchableRipple style={styles.avatarParent} onPress={()=> navigation.navigate('Profile')} borderless={true} rippleColor="rgba(0, 0, 0, .32)">
      <Avatar.Image style={styles.profile} size={32} source={{uri: loggedIn.photoURL}} />
  </TouchableRipple>
    }
    if(!loggedIn){
      action = <Login/>
    }
return(
    <Appbar.Header style={styles.appbar}>
      {previous ? <Appbar.BackAction onPress={navigation.goBack} /> : null}
      <Grid>
        <Col size={20}>
        </Col>
        <Col style={styles.colTitle} size={40}>
          <Text style={styles.title}>Bounty</Text>
        </Col>
        <Col style={styles.colProfile} size={10}>
          {/* <Login/> */}
          {action}
          <LoginOrLogout parentCallback={callback} />
        </Col>
        <Col size={10}>
          <Appbar.Action icon={MORE_ICON} onPress={() => {}} />
        </Col>
        </Grid>
     </Appbar.Header>
    );
   }
   export default AppBar
   
   const styles = StyleSheet.create({
     appbar: {
       position: 'relative',
       top: 0,
       left: 0,
       right: 0,
       bottom: 0,
     },
     colTitle:{
      justifyContent: 'center'
     },
     title:{
      alignSelf: "center",
      color: "white",
      fontSize: 26
     },
     colProfile:{
      justifyContent: "center",
     },
     profile:{
      alignSelf: 'center'
      },
     avatarParent:{
        borderRadius:50
      }
   });
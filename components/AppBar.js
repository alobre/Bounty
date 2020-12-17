import React from 'react';
import { Appbar, Avatar, Text } from 'react-native-paper';
import { StyleSheet } from 'react-native';
import { Col, Row, Grid } from "react-native-easy-grid";
import Login from './Login'
import LoginOrLogout from './LoginOrLogout'

let profilePic="{require('../media/obama.jpg')}"
const MORE_ICON = Platform.OS === 'ios' ? 'dots-horizontal' : 'dots-vertical';

const AppBar = () => (
    <Appbar style={styles.appbar}>
      <Grid>
        <Col size={20}>
        </Col>
        <Col style={styles.colTitle} size={40}>
          <Text style={styles.title}>Bounty</Text>
        </Col>
        <Col style={styles.colProfile} size={10}>
          {/* <Login/> */}
          <LoginOrLogout/>
        </Col>
        <Col size={10}>
          <Appbar.Action icon={MORE_ICON} onPress={() => {}} />
        </Col>
        </Grid>
     </Appbar>
    );
   
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

   });
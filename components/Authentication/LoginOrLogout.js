import React, { Component, useState, useEffect } from 'react'
import { View, StyleSheet, Text  } from 'react-native';
import { Button  } from "react-native-paper";
import auth from '@react-native-firebase/auth';

const LoginOrLogout = ({ parentCallback }) => {
    const [initializing, setInitializing] = useState(true);
    const [user, setUser] = useState();
  
    // Handle user state changes
    function onAuthStateChanged(user) {
      setUser(user);
      if (initializing) setInitializing(false);
    }
    function onTrigger(data){
        parentCallback(data);
      }
    useEffect(() => {
      const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
      return subscriber; // unsubscribe on unmount
    }, []);
    useEffect(()=>{
      onTrigger(user)
    })
    
    

    if (initializing) return null;
    
    if (!user) {
      return (
        // <View>
        //   <Login></Login>
        // </View>
        false
      );
    }
  
    return (
      // <View>
      //   <Logout user={user}></Logout>
      //   {/* <Profile></Profile> */}
      //   {/* <Button
      //   title="Profile"
      //   onPress={() => navigation.navigate('Profile')}*/}
      // </View>
      true
    );
}

export default LoginOrLogout
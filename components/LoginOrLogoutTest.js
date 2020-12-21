import React, { Component, useState, useEffect } from 'react'
import { View, StyleSheet, Text  } from 'react-native';
import auth from '@react-native-firebase/auth';
import Login from './Login'
import Logout from './Logout'
import Profile from './Profile'
import Routes from './Routes'

const LoginOrLogout = () => {
    const [initializing, setInitializing] = useState(true);
    const [user, setUser] = useState();
  
    // Handle user state changes
    function onAuthStateChanged(user) {
      setUser(user);
      if (initializing) setInitializing(false);
    }
  
    useEffect(() => {
      const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
      return subscriber; // unsubscribe on unmount
    }, []);
  
    if (initializing) return null;
    if (!user) {
      return false
    }
    console.log(user)
  
    return true
}

export default LoginOrLogout
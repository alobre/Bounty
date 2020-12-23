import React, { Component } from 'react';
import { View, StyleSheet  } from 'react-native';
import firestore from '@react-native-firebase/firestore';

export default function addUser(user){
    console.log(firestore())
   firestore()
  .collection('users')
  .doc(user.uid)
  .set({
    user
  })
  .then(() => {
    console.log('User added!');
  }); 
}

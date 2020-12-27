import React, { Component } from 'react';
import { View, StyleSheet  } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

export default function addUser(){
    // console.log(firestore())
    // console.log(auth().currentUser)
  let user = auth().currentUser
   firestore()
  .collection('users')
  .doc(user.uid)
  .set(
    // user
    {
        'displayName': user.displayName,
        'email': user.email,
        'emailVeryfied': user.emailVeryfied,
        'phoneNumber': user.phoneNumber,
        'photoURL': user.photoURL,
        'uid': user.uid

    }
    )
  .then(() => {
    console.log('User added!');
  }); 
}

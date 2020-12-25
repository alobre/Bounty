import React, { Component } from 'react';
import { View, StyleSheet  } from 'react-native';
import firestore from '@react-native-firebase/firestore';

export default function addUser(user){
    // console.log(firestore())
    console.log(user)
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
  // firestore()
  // .collection('users')
  // .doc("test")
  // .set({
  //   "test": "test"
  // })
  // .then(() => {
  //   console.log('User added!');
  // }); 

}

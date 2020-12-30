import React, { Component } from 'react';
import { View, StyleSheet  } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import { InputGroup } from 'native-base';

export default function StoreUser(signInMethod, userProps){
    // console.log(firestore())
    // console.log(auth().currentUser)
    if(signInMethod == 'register'){
      let user = auth().currentUser
      firestore()
      .collection('users')
      .doc(user.uid)
      .set(
        {
            'displayName': userProps.displayName,
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
    if(signInMethod == 'google'){
       let user = auth().currentUser
      firestore()
      .collection('users')
      .doc(user.uid)
      .set(
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
}

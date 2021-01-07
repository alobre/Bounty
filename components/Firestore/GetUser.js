import { FirebaseStorageTypes } from '@react-native-firebase/storage';
import React from 'react';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

export default GetUser = async(uid) => {
const user = firestore().collection('users').doc(uid).get()
return user
}
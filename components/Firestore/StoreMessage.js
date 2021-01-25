import React from 'react';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import moment from 'moment'
import GetPublicUser from './GetPublicUser'



export default async function StoreMessage(chatPartner, message){
    let user = await GetPublicUser(auth().currentUser.uid)
    // console.log(user.data());
        firestore()
        .collection('users')
        .doc(auth().currentUser.uid)
        .collection('Conversations')
        .doc(chatPartner.uid)
        .collection('Messages')
        .doc(message._id)
        .set({
            'dateAndTime': moment().format('YYYY.MM.DD HH:mm:ss'),
            'createdAt': message.createdAt.toString(),
            'text': message.text,
            'user': {
                '_id': message.user._id,
                'name': user.data().displayName,
                'avatar': user.data().photoURL,
            },
            '_id': message._id
        })
        firestore()
        .collection('users')
        .doc(chatPartner.uid)
        .collection('Conversations')
        .doc(auth().currentUser.uid)
        .collection('Messages')
        .doc(message._id)
        .set({
            'dateAndTime': moment().format('YYYY.MM.DD HH:mm:ss'),
            'createdAt': message.createdAt.toString(),
            'text': message.text,
            'user': {
                '_id': message.user._id,
                'name': user.data().displayName,
                'avatar': user.data().photoURL,
            },
            '_id': message._id
        })
}
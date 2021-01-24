import React from 'react';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';




export default function PostMessage(chatPartner, message){

    console.log(message.text);
// addMessage = () => {
    firestore()
    .collection('users')
    .doc(auth().currentUser.uid)
    .collection('Messages')
    .doc(chatPartner.uid)
    .collection('Conversation')
    .doc(message._id)
    .set({
        'createdAt': message.createdAt,
        'text': message.text,
        'user': message.user,
        '_id': message._id
    })
// }   



}
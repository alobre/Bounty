import React, { useState } from 'react';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

export default async function GetMessages (uid, chatPartnerId){
    const chatPartnerRef = firestore().collection('users').doc(uid).collection('Conversations').doc(chatPartnerId).collection('Messages')
    let message = await chatPartnerRef.orderBy('createdAt').get();
    console.log(message.docs);
}

import React, { useState } from 'react';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

export default async function GetMessages (uid, chatPartnerId, callback){
    const chatPartnerRef = firestore().collection('users').doc(uid).collection('Conversations').doc(chatPartnerId).collection('Messages')
    await chatPartnerRef.orderBy('createdAt').onSnapshot(docs => {
        callback(docs)
    });
}

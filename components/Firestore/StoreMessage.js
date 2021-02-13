import React from 'react';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import moment from 'moment'
import GetPublicUser from './GetPublicUser'



export default async function StoreMessage(chatPartner, message){
    let user = await GetPublicUser(auth().currentUser.uid);
    let partner = await GetPublicUser(chatPartner.uid);
        firestore()
        .collection('users')
        .doc(auth().currentUser.uid)
        .collection('Conversations')
        .doc(chatPartner.uid)
        .collection('Messages')
        .doc(message.mid)
        .set({
            'dateAndTime': moment().format('YYYY.MM.DD HH:mm:ss'),
            'createdAt': message.createdAt.toString(),
            'text': message.text,
            'isPilotMessage': message.isPilotMessage,
            'requestedTaskId': message.requestedTaskId,
            'user': {
                'uid': message.user.uid,
                'name': user.data().displayName,
                'avatar': user.data().photoURL,
            },
            'mid': message.mid
        })

        firestore()
        .collection('users')
        .doc(chatPartner.uid)
        .collection('Conversations')
        .doc(auth().currentUser.uid)
        .collection('Messages')
        .doc(message.mid)
        .set({
            'dateAndTime': moment().format('YYYY.MM.DD HH:mm:ss'),
            'createdAt': message.createdAt.toString(),
            'text': message.text,
            'isPilotMessage': message.isPilotMessage,
            'requestedTaskId': message.requestedTaskId,
            'user': {
                'uid': message.user.uid,
                'name': user.data().displayName,
                'avatar': user.data().photoURL,
            },
            'mid': message.mid
        })

        firestore()
        .collection('users')
        .doc(auth().currentUser.uid)
        .collection('Conversations')
        .doc(chatPartner.uid)
        .set({
            'chatPartnerUid': partner.data().uid,
            'chatPartnerName': partner.data().displayName,
            'chatPartnerAvatar': partner.data().photoURL,
            'lastUpdateDateAndTime': moment().format('YYYY.MM.DD HH:mm:ss'),
            'lastUpdateDate': moment().format('DD.MM.YYYY'),
            'lastUpdateTime': moment().format('HH:mm:ss'),
            'lastWhoWrote': user.data(),
            'lastMessage': message.text,
        })

        firestore()
        .collection('users')
        .doc(chatPartner.uid)
        .collection('Conversations')
        .doc(auth().currentUser.uid)
        .set({
            'chatPartnerUid': user.data().uid,
            'chatPartnerName': user.data().displayName,
            'chatPartnerAvatar': user.data().photoURL,
            'lastUpdateDateAndTime': moment().format('YYYY.MM.DD HH:mm:ss'),
            'lastUpdateDate': moment().format('DD.MM.YYYY'),
            'lastUpdateTime': moment().format('HH:mm:ss'),
            'lastWhoWrote': user.data(),
            'lastMessage': message.text,

        })

}
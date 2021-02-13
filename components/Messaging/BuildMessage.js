import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import auth from '@react-native-firebase/auth';

const buildMessage = (message, callback) => {
    callback({
        mid: uuidv4(),
        createdAt: new Date(),
        text: message.text,
        requestedTaskId: message.requestedTaskId ? message.requestedTaskId : "none",
        isPilotMessage: message.isPilotMessage ? true : false,
        user:{
            uid: auth().currentUser.uid
        }
    })
}

export default buildMessage
import React from 'react';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

const AssignTask = (tid, assigningTaskTo) => {
    firestore().collection('users').doc(auth().currentUser.uid).collection('UserTasks').doc(tid).update({
        taskAssigned: assigningTaskTo
    });
}

export default AssignTask
import React, { Component } from 'react';
import firestore from '@react-native-firebase/firestore';

export default GetTaskDetails = async(tid) => {
    const task = await firestore().collectionGroup('UserTasks').where('id', '==', tid).get();
    return task
}
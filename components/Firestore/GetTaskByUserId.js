import React, { Component } from 'react';
import firestore from '@react-native-firebase/firestore';

export default GetTaskByUserId = async(uid) => {
    const TaskRef = firestore().collectionGroup('UserTasks')
    const tasks = await TaskRef.where('uid', '==', uid).get();
    console.log(tasks);
    return tasks
}
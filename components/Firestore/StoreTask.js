import React from 'react';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import { InputGroup } from 'native-base';

export default function StoreTask(task){
    firestore().collection('tasks').doc(auth().currentUser.uid).collection('UserTasks').get().then(data=>{
            task.id = data.docs.length + 1
            console.log(task)
            firestore()
            .collection('tasks')
            .doc(auth().currentUser.uid)
            .collection('UserTasks')
            .doc()
            .set(
                {
                    'id': task.id,
                    'title': task.title,
                    'description': task.description,
                    'tags': task.tags,
                    'time': task.time,
                    'date': task.date,
                    'username': task.username,
                    'bounty': task.bounty
                })
        console.log(data.docs.length)
        
    })          
}
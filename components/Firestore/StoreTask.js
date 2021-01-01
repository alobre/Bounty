import React from 'react';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import { InputGroup } from 'native-base';

export default function StoreTask(task){
    firestore().collection('tasks').doc(auth().currentUser.uid).collection('tasks').get().then(data=>{
            task.id = data.docs.length + 1
            firestore()
            .collection('tasks')
            .doc(auth().currentUser.uid)
            .collection('tasks')
            .doc()
            .set(
                {
                    task
                })
        console.log(data.docs.length)
        
    })          
}
import React from 'react';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

export default function StoreTask(task){
    firestore().collection('tasks').doc(auth().currentUser.uid).get().then((doc)=>{
        if(!doc.data().allTasks){
            let allTasks = [task]
            firestore()
            .collection('tasks')
            .doc(auth().currentUser.uid)
            .set(
                
                {
                   'allTasks':allTasks 
                } 
                
                )
            .then(() => {
                console.log('Task added!');
            });
        }
        if(doc.data().allTasks){
           let currentTasks = doc.data()
            currentTasks.allTasks.push(
            task
            )
            console.log(currentTasks)
            firestore()
            .collection('tasks')
            .doc(auth().currentUser.uid)
            .set(
                
                    currentTasks
                
                )
            .then(() => {
                console.log('Task added!');
            });
    }
    })       
}
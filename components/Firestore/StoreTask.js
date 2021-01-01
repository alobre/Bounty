import React from 'react';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import { InputGroup } from 'native-base';

export default function StoreTask(task){
    firestore().collection('tasks').doc(auth().currentUser.uid).get().then((doc)=>{
        if(doc.exists == false){
            console.log("false")
            // let currentTasks = doc.data()
            // task.id = currentTasks.allTasks.length + 1
            // let allTasks = [task]
            firestore()
            .collection('tasks')
            .doc(auth().currentUser.uid)
            .set(
                
                {
                   'allTasks': [] 
                } 
                
                )
            .then(() => {
                    console.log("not existed")
                    firestore().collection('tasks').doc(auth().currentUser.uid).get().then((doc)=>{
                        let currentTasks = doc.data()
                        task.id = currentTasks.allTasks.length + 1
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
                    })
                
            });
        
        }
        if(!doc.data().allTasks){
            // task.id = currentTasks.allTasks.length + 1
            // let allTasks = [task]
            console.log("kein all tasks")
            firestore()
            .collection('tasks')
            .doc(auth().currentUser.uid)
            .set(
                
                {
                   'allTasks': allTasks
                } 
                
                )
            .then(() => {
                console.log('Task added!');
            });
        }
        if(doc.data().allTasks){
            console.log("all tasks")
           let currentTasks = doc.data()
           task.id = currentTasks.allTasks.length + 1
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
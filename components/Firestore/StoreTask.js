import React from 'react';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import { InputGroup } from 'native-base';
import AddPicturesToTask from '../Storage/AddPicturesToTask';

export default function StoreTask(task){
    console.log(task.images);
    if(task.images.length >= 0){
    AddPicturesToTask(task.images, (images) => {
        console.log(images);
                firestore().collection('tasks').doc(auth().currentUser.uid).collection('UserTasks').get().then(data=>{
                    task.id = data.docs.length + 1
                    console.log(data);
                    // console.log(task)
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
                            'bounty': task.bounty,
                            'images': images
                        })
                })    
        })
    } else {
            firestore().collection('tasks').doc(auth().currentUser.uid).collection('UserTasks').get().then(data=>{
                task.id = data.docs.length + 1
                console.log(data);
                // console.log(task)
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
                        'bounty': task.bounty,
                        'images': false
                    })
            })    
        }    
}
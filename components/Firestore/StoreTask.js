import React from 'react';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import { InputGroup } from 'native-base';
import AddPicturesToTask from '../Storage/AddPicturesToTask';

export default function StoreTask(task){
    console.log('storetask');
                firestore()
                .collection('users')
                .doc(auth().currentUser.uid)
                .collection('UserTasks')
                .add(
                    {   
                        'id': false,
                        'uid': auth().currentUser.uid,
                        'title': task.title,
                        'description': task.description,
                        'tags': task.tags,
                        'time': task.time,
                        'dateAndTime': task.dateAndTime,
                        'date': task.date,
                        'username': task.username,
                        'bounty': task.bounty,
                        'images': false,
                        'taskAssigned': task.taskAssigned,
                        'taskDone': task.taskDone,
                    }).then(doc => {
                        if(task.images.length > 0){
                            AddPicturesToTask(task.images, doc.id, async(images) => {
                                firestore()
                                .collection('users')
                                .doc(auth().currentUser.uid)
                                .collection('UserTasks')
                                .doc(doc.id)
                                .update({
                                    id: doc.id,
                                    images: images
                                })
                            })
                        } else {
                            firestore()
                            .collection('users')
                            .doc(auth().currentUser.uid)
                            .collection('UserTasks')
                            .doc(doc.id)
                            .update({
                                id: doc.id,
                            })
                        }
                }).catch(err=>console.log(err))
}
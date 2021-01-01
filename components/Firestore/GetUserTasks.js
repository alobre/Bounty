import React, { useState } from 'react';
import { Text } from "react-native";
import TaskCard from '../Tasks/TaskCard'
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { View } from 'native-base';


const GetUserTasks = () => {
    let [tasks, setTasks] = useState([])
    if(tasks == ''){
        firestore().collection('tasks').doc(auth().currentUser.uid).collection('tasks').get().then((querySnapshot) => {
                setTasks(querySnapshot.docs)
        })
    }
return(
<View>
    {tasks.map(task => <TaskCard key={task.data().task.id} username={task.data().task.username} title={task.data().task.title} category={task.data().task.tags} description={task.data().task.description} wage={task.data().task.bounty}></TaskCard>)}
</View>
)
}

export default GetUserTasks
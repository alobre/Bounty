import React, { useState } from 'react';
import { Text } from "react-native";
import TaskCard from '../Tasks/TaskCard'
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { View } from 'native-base';


const GetUserTasks = () => {
    let [tasks, setTasks] = useState([])
    if(tasks == ''){
        firestore().collection('tasks').doc(auth().currentUser.uid).collection('UserTasks').get().then((querySnapshot) => {
                setTasks(querySnapshot.docs)
        })
    }
return(
<View>
    {tasks.map(task => <TaskCard key={task.data().id} username={task.data().username} title={task.data().title} category={task.data().tags} description={task.data().description} wage={task.data().bounty} imageURL={task.data().images}></TaskCard>)}
</View>
)
}

export default GetUserTasks
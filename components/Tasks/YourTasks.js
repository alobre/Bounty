import React, { Component } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { ActivityIndicator, Colors, Text } from 'react-native-paper';
import { TabView, SceneMap } from 'react-native-tab-view';
import { ScrollView } from 'react-native-gesture-handler';
import TaskCard from './TaskCard'
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

export default class YourTasks extends Component {
    constructor(props){
        super(props)
        this.state={
            tasks:{
               allTasks:["test"] 
            }
                
            
        }
    }
    async getTasks(){
        await firestore().collection('tasks').doc(auth().currentUser.uid).get().then( doc => {
        this.setState(state => { state.tasks.allTasks = doc.data().allTasks});
        // setTask(<TaskCard key={tasks[1].uid} username={tasks[1].username} title={tasks[1].title} category={tasks[1].tags} description={tasks[1].description} wage={tasks[1].bounty}></TaskCard>)
        // console.log(this.state.tasks);    
    })    
    }
    async componentDidMount(){
        await this.getTasks()
        // console.log(this.state.tasks);
    }

    async render() {
        return (
            <ScrollView>
                {await this.state.tasks.allTasks.map(task => { 
                    console.log(task);
                    // <TaskCard key={task.id} username={task.username} title={task.title} category={task.tags} description={task.description} wage={task.bounty}></TaskCard>
                    // <Text>{task.title}</Text>}
                })}
                {/* <Text>{this.state.tasks[0]}</Text> */}
            </ScrollView>
        );
    }
}
import React, { Component, useState, useEffect } from 'react';
import {
    StyleSheet,
    View,
    Image,
    FlatList,
    ActivityIndicator,
    RefreshControl
  } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { Text } from "react-native-paper";
import TaskCard from './TaskCard'
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';



const CurrentTasks = () => {

  const tasksRef = firestore().collection('tasks');

  async function getTasks(){
    firestore().collection('tasks').doc(auth().currentUser.uid).collection('tasks').get().then((querySnapshot) => {
      // console.log(querySnapshot.docs[0].data())
    })
    if(snapshot.empty == true){
      console.log("empty")
    }
    console.log(tasksRef)
  }

  useEffect(() => {
    getTasks();
  }, []);

  return(
    <View></View>
  )
}


export default CurrentTasks
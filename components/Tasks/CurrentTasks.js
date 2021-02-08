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
import GetPublicUser from '../Firestore/GetPublicUser'
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';



const CurrentTasks = ({navigation}) => {

  let onEndReachedCalledDuringMomentum = false;
  
  const [isLoading, setIsLoading] = useState(false);
  const [isMoreLoading, setIsMoreLoading] = useState(false);
  const [lastDoc, setLastDoc] = useState(null);
  const [tasks, setTasks] = useState([]);

  const UserTasksRef = firestore().collectionGroup('UserTasks');

  useEffect(() => {
    getTasks();
  }, []);

  const getTasks = async () => {
    setIsLoading(true);
    const snapshot = await UserTasksRef.where('taskAssigned', '==', 'notAssigned').orderBy('dateAndTime', 'desc').limit(24).get();
    if(!snapshot.empty){
      let newTasks = [];
      setLastDoc(snapshot.docs[snapshot.docs.length - 1]);

      for (let i = 0; i < snapshot.docs.length; i++) {
        let UserData = await GetPublicUser(snapshot.docs[i].data().uid)
        snapshot.docs[i].data().userData = UserData.data()
        newTasks.push(snapshot.docs[i].data())
      }
      setTasks(newTasks);
    } else {
      setLastDoc(null)
    }
    setIsLoading(false)
  }

  const getMore = async () => {
    if(lastDoc){
      setIsMoreLoading(true);
      setTimeout(async() => {
        let snapshot = await UserTasksRef.where('taskAssigned', '==', 'notAssigned').orderBy('dateAndTime', 'desc').startAfter(lastDoc.data().dateAndTime).limit(24).get();
  
        if (!snapshot.empty) {
          let newTasks = tasks;
  
          setLastDoc(snapshot.docs[snapshot.docs.length - 1]);
  
          for(let i = 0; i < snapshot.docs.length; i++) {
            let UserData = await GetPublicUser(snapshot.docs[i].data().uid)
            snapshot.docs[i].data().userData = UserData.data()
            newTasks.push(snapshot.docs[i].data());
          }
  
          setTasks(newTasks);
          if (snapshot.docs.length < 3) setLastDoc(null);
        } else {
          setLastDoc(null);
        }
  
        setIsMoreLoading(false);
      }, 1000);
    }
    onEndReachedCalledDuringMomentum = true;
  }


  const onRefresh = () => {
    setTimeout(() => {
      getTasks();
    }, 1000);
  }

  const renderFooter = () => {
    if (!isMoreLoading) return true;
    
    return (
      <ActivityIndicator
          size='large'
          color={'#D83E64'}
          style={{ marginBottom: 10 }}
      />
    )
  }


  return(
    <View>
      {
      }
      <FlatList 
            data={tasks}
            keyExtractor={item => item.id.toString()}
            renderItem={({item}) => {
              return(
              <TaskCard
                key={item.id} 
                taskId={item.id} 
                uid={item.userData.uid} 
                avatar={item.userData.photoURL} 
                username={item.userData.displayName} 
                title={item.title} 
                description={item.description} 
                bounty={item.bounty} 
                tags={item.tags} 
                imageURL={item.images}
                navigation={navigation}
                />) 
            }}
            ListFooterComponent={renderFooter}
            refreshControl={
                <RefreshControl
                    refreshing={isLoading}
                    onRefresh={onRefresh}
                />
            }
            initialNumToRender={3}
            onEndReachedThreshold={0.1}
            onMomentumScrollBegin = {() => {onEndReachedCalledDuringMomentum = false;}}
            onEndReached = {() => {
                if (!onEndReachedCalledDuringMomentum && !isMoreLoading) {
                  getMore();
                }
              }
            }
          >
          </FlatList>
    </View>
  )
}


export default CurrentTasks
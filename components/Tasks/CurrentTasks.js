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

const tasksRef = firestore().collection('tasks');

export default class CurrentTasks extends Component{
    constructor(props){
        super(props)
        this.state={
            onEndReachedCalledDuringMomentum: false,
            isLoading: false,
            isMoreLoading: false,
            lastDoc: null,
            tasks: []
        }
        
    }
    


    async getTasks(){
        this.setState({isLoading : true})
        const snapshot = await restaurantsRef.orderBy('id').limit(3).get();
        if (!snapshot.empty) {
            let newTasks = [];
      
            this.setState({lastDoc : snapshot.docs[snapshot.docs.length - 1]});
      
            for (let i = 0; i < snapshot.docs.length; i++) {
              newTasks.push(snapshot.docs[i].data());
            }
      
            this.setState({tasks : newTasks});
          } else {
            this.setState({lastDoc : null});
          }
      
          this.setState({isLoading : false})
        }
    

    async getMore() {
        if (this.state.lastDoc) {
          this.setState({isMoreLoading : true})
    
          setTimeout(async function() {
          let snapshot = await tasksRef.orderBy('id').startAfter(this.state.lastDoc.data().id).limit(3).get();
    
          if (!snapshot.empty) {
            let newTasks = this.state.restaurants;
    
            this.setState({lastDoc : snapshot.docs[snapshot.docs.length - 1]});
    
            for(let i = 0; i < snapshot.docs.length; i++) {
              newTasks.push(snapshot.docs[i].data());
            }
    
            this.setState({tasks : newTasks});
            if (snapshot.docs.length < 3) this.setState({lastDoc : null});
          } else {
            this.setState({lastDoc : null});
          }
    
          this.setState({isMoreLoading : false})
        }, 1000);
        }
    
        this.setState({onEndReachedCalledDuringMomentum : true});
    }

    componentDidMount(){
        this.getTasks()
    } 
    componentDidUpdate(){
        this.getTasks()
    }   

    renderList({username, title, description, bounty, id, tags}){
        return(
            <ScrollView>
                <TaskCard key={id} username={username} title={title} description={description} wage={bounty} category={tags}></TaskCard>
            </ScrollView>
        )
    }
    onRefresh = () => {
        setTimeout(() => {
          getTasks();
        }, 1000);
    }
    renderFooter = () => {
        if (!this.state.isMoreLoading) return true;
        
        return (
          <ActivityIndicator
              size='large'
              color={'#D83E64'}
              style={{ marginBottom: 10 }}
          />
        )
      }
    render(){
        return(
            <View style={{ flex: 1 }}>
      <View>
        <Text>Tasks</Text>
        <FlatList 
          data={this.state.tasks}
          keyExtractor={item => item.id.toString()}
          renderItem={({item}) => renderList(item)}
          ListFooterComponent={this.renderFooter()}
          refreshControl={
              <RefreshControl
                  refreshing={this.state.isLoading}
                  onRefresh={this.onRefresh()}
              />
          }
          initialNumToRender={3}
          onEndReachedThreshold={0.1}
          onMomentumScrollBegin = {() => {this.setState({onEndReachedCalledDuringMomentum : false})}}
          onEndReached = {() => {
              if (!this.state.onEndReachedCalledDuringMomentum && !this.state.isMoreLoading) {
                this.getMore();
              }
            }
          }
        />
      </View>
    </View>
        )
    }
      
}


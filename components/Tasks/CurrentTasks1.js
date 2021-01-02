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
    let onEndReachedCalledDuringMomentum = false;
  
    const [isLoading, setIsLoading] = useState(false);
    const [isMoreLoading, setIsMoreLoading] = useState(false);
    const [lastDoc, setLastDoc] = useState(null);
    const [restaurants, setRestaurants] = useState([]);
  
    const restaurantsRef = firestore().collectionGroup('UserTasks');
  
    useEffect(() => {
      getRestaurants();
    }, []);
  
    const getRestaurants = async () => {
      setIsLoading(true);
  
      const snapshot = await restaurantsRef.orderBy('id').limit(3).get();
  
      if (!snapshot.empty) {
        let newRestaurants = [];
  
        setLastDoc(snapshot.docs[snapshot.docs.length - 1]);
  
        for (let i = 0; i < snapshot.docs.length; i++) {
          newRestaurants.push(snapshot.docs[i].data());
        }
  
        setRestaurants(newRestaurants);
      } else {
        setLastDoc(null);
      }
  
      setIsLoading(false);
    }
  
    const getMore = async () => {
      if (lastDoc) {
        setIsMoreLoading(true);
  
        setTimeout(async() => {
        let snapshot = await restaurantsRef.orderBy('id').startAfter(lastDoc.data().id).limit(3).get();
  
        if (!snapshot.empty) {
          let newRestaurants = restaurants;
  
          setLastDoc(snapshot.docs[snapshot.docs.length - 1]);
  
          for(let i = 0; i < snapshot.docs.length; i++) {
            newRestaurants.push(snapshot.docs[i].data());
          }
  
          setRestaurants(newRestaurants);
          if (snapshot.docs.length < 3) setLastDoc(null);
        } else {
          setLastDoc(null);
        }
  
        setIsMoreLoading(false);
      }, 1000);
      }
  
      onEndReachedCalledDuringMomentum = true;
    }
  
    const renderList = ({username, title, description, bounty, id, tags}) => {
      return (
        <ScrollView>
            <TaskCard key={id} username={username} title={title} description={description} wage={bounty} category={tags}></TaskCard>
            <Text>ALOBRE</Text>
        </ScrollView>
      )
    }
  
    const onRefresh = () => {
      setTimeout(() => {
        getRestaurants();
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
  
    return (
      <View style={{ flex: 1 }}>
        <View style={styles.header}>
          <Text style={styles.headerText}>Bounty</Text>
        </View>
        <View style={{ flex: 1 }}>
          <Text style={styles.title}>Popular restaurants</Text>
          <FlatList 
            data={restaurants}
            keyExtractor={item => item.id.toString()}
            renderItem={({item}) => {renderList(item); console.log(item)}}
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
          />
        </View>
      </View>
    );
  };
  
  const styles = StyleSheet.create({
    header: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      height: 70,
      paddingTop: 20
    },
    headerLogo: {
      width: 30,
      height: 30,
      marginRight: 10
    },
    headerText: {
      fontSize: 28,
      fontWeight: '600',
      color: '#D83E64'
    },
    title: {
      fontWeight: '300',
      fontSize: 26,
      marginVertical: 10,
      marginLeft: 10,
      color: '#333333'
    },
    list: {
      width: '100%',
      flexDirection: 'column',
      paddingHorizontal: 10,
      marginBottom: 20
    },
    listImage: {
      width: '100%',
      height: 200
    },
    listingRatingContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginTop: 10
    },
    name: {
      fontWeight: '500',
      fontSize: 17, 
      color: '#333333'
    },
    rating: {
      fontSize: 13,
      fontWeight: '100',
      color: '#333333'
    },
    budgetTagsContainer: {
      width: '100%',
      flexDirection: 'row',
      alignItems: 'center'
    },
    budgetTagsText: {
      fontWeight: '100',
      color: '#333333',
      fontSize: 15
    },
    newContainer: {
      position: 'absolute',
      top: 20,
      left: 10,
      backgroundColor: '#D83E64',
      paddingHorizontal: 20,
      paddingVertical: 10
    },
    newText: {
      color: '#FFFFFF',
      fontWeight: '500'
    }
  });
  
  export default CurrentTasks;
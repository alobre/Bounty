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
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import ConversationCard from './ConversationCard';



const Conversations = ({navigation}) => {

  let onEndReachedCalledDuringMomentum = false;
  
  const [isLoading, setIsLoading] = useState(false);
  const [isMoreLoading, setIsMoreLoading] = useState(false);
  const [lastDoc, setLastDoc] = useState(null);
  const [conversations, setConversations] = useState([
  //   {chatPartnerAvatar: "https://lh4.googleusercontent.com/-twOwKprx0MA/AAAAAAAAAAI/AAAAAAAAAAA/AMZuucmB6JqLCSucIOch1qeBE532iSrg8w/s96-c/photo.jpg",
  //   chatPartnerName: "alo bre",
  //   chatPartnerUid: "NaQ5Rbn3JCgsDAEouAsVtzqmyVL2",
  //   lastMessage: "Yooo",
  //   lastUpdateDate: "25.01.2021",
  //   lastUpdateDateAndTime: "2021.01.25 21:00:16",
  //   lastUpdateTime: "21:00:16",
  //   lastWhoWrote:
  //   {displayName: "alo bre",
  //   photoURL: "https://lh4.googleusercontent.com/-twOwKprx0MA/AAAAAAAAAAI/AAAAAAAAAAA/AMZuucmB6JqLCSucIOch1qeBE532iSrg8w/s96-c/photo.jpg",
  //   uid: "NaQ5Rbn3JCgsDAEouAsVtzqmyVL2"}
  // },
  ]);

  const UserConversationsRef = firestore().collection('users').doc(auth().currentUser.uid).collection('Conversations');

  useEffect(() => {
    getConversations();
  }, []);

  const getConversations = async () => {
    setIsLoading(true);
    const snapshot = await UserConversationsRef.orderBy('lastUpdateDateAndTime', 'desc').limit(24).get();
    console.log(snapshot);
    if(!snapshot.empty){
      let newConversations = [];
      setLastDoc(snapshot.docs[snapshot.docs.length - 1]);

      for (let i = 0; i < snapshot.docs.length; i++) {
        newConversations.push(snapshot.docs[i].data())
      }
      setConversations(newConversations);
    } else {
      console.log("inside false");
      setLastDoc(null)
    }
    setIsLoading(false)
  }

  const getMore = async () => {
    if(lastDoc){
      setIsMoreLoading(true);
      setTimeout(async() => {
        let snapshot = await UserConversationsRef.orderBy('dateAndTime', 'desc').startAfter(lastDoc.data().dateAndTime).limit(24).get();
  
        if (!snapshot.empty) {
          let newConversations = conversations;
  
          setLastDoc(snapshot.docs[snapshot.docs.length - 1]);
  
          for(let i = 0; i < snapshot.docs.length; i++) {
            newConversations.push(snapshot.docs[i].data());
          }
  
          setConversations(newConversations);
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
      getConversations();
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
      <FlatList 
            data={conversations}
            keyExtractor={item => item.chatPartnerUid}
            renderItem={({item}) => {
                return(
                    <ConversationCard navigation={navigation} conversation={item}/>
                ) 
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


export default Conversations
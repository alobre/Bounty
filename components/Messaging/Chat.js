import React, { useState, useCallback, useEffect } from 'react';
import { StyleSheet, View, FlatList } from 'react-native';
import { Button } from 'react-native-paper'
import { GiftedChat } from 'react-native-gifted-chat';
import ChatBubble from './ChatUI/ChatBubble'
import GetMessages from '../Firestore/GetMessages'
import StoreMessage from '../Firestore/StoreMessage'
import auth from '@react-native-firebase/auth';
import moment from 'moment'
import de from 'dayjs/locale/de'


function Chat({route}) {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    console.log([moment.locale(),'data']);
    GetMessages(auth().currentUser.uid, route.params.task.uid, docs => {
      docs._changes.map( doc =>  {
        console.log(doc.doc.data());
        // doc.doc.data()._id
        let alreadyContains = messages.filter(message => message._id.includes(doc.doc.data()._id))
        console.log(alreadyContains);
        alreadyContains.length > 0? true : 
        setMessages(previousMessages => GiftedChat.append(previousMessages, doc.doc.data()))
      })
    });
  }, [])

  const onSend = useCallback((messages = []) => {
    console.log(route.params.task);
    StoreMessage(route.params.task, messages[0])
  }, [])

  return (
    <View style={styles.container}>
    {/* <GiftedChat
      messages={messages}
      locale={'de'}
      // timeFormat={''}
      showUserAvatar
      renderUsernameOnMessage
      onSend={messages => onSend(messages)}
      user={{
        _id: auth().currentUser.uid,
      }}
      /> */}
    
    <FlatList
    data={messages}
    keyExtractor={item => item._id}
    renderItem={({item}) => 
      {
        return( 
        <ChatBubble
        avatar={item.user.avatar}
        username={item.user.name}
        message={item.text}
        messageId={item._id}
        createdAt={item.createdAt}
        >

        </ChatBubble>
      )
    }
    }
    ></FlatList>
    </View>
    )
}

  const styles = StyleSheet.create({
    container:{
      height: "100%"
    }
  });

  export default Chat;
import React, { useState, useCallback, useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { Button } from 'react-native-paper'
import { GiftedChat } from 'react-native-gifted-chat';
import GetMessages from '../Firestore/GetMessages'
import StoreMessage from '../Firestore/StoreMessage'
import auth from '@react-native-firebase/auth';


function Chat({route}) {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    GetMessages(auth().currentUser.uid, route.params.task.uid, docs => {
      docs._changes.map( doc =>  {
        console.log(doc.doc.data());
        setMessages(previousMessages => GiftedChat.append(previousMessages, doc.doc.data()))
      })
    });
  }, [])

  const onSend = useCallback((messages = []) => {
    // GetMessages(auth().currentUser.uid, route.params.task.uid)
    StoreMessage(route.params.task, messages[0])

    // setMessages(previousMessages => GiftedChat.append(previousMessages, messages))
  }, [])

  return (
    <View style={styles.container}>
    <Button onPress={() => GetMessages(auth().currentUser.uid, route.params.task.uid)}>alobre</Button>
    <GiftedChat
      messages={messages} 
      showUserAvatar
      renderUsernameOnMessage
      onSend={messages => onSend(messages)}
      user={{
        _id: auth().currentUser.uid,
      }}
      />
    </View>
    )
}

  const styles = StyleSheet.create({
    container:{
      height: "100%"
    }
  });

  export default Chat;
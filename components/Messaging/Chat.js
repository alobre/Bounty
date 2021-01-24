import React, { useState, useCallback, useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { Button } from 'react-native-paper'
import { GiftedChat } from 'react-native-gifted-chat';
import PostMessage from '../Firestore/PostMessage'
import auth from '@react-native-firebase/auth';

function Chat({route}) {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    setMessages([
      {
        _id: 1,
        text: 'Hello developer',
        createdAt: new Date(),
        user: {
          _id: 2,
          uid:'NaQ5Rbn3JCgsDAEouAsVtzqmyVL2',
          name: 'React Native',
          avatar: 'https://placeimg.com/140/140/any',
        },
      },
    ])
  }, [])

  const onSend = useCallback((messages = []) => {
     
    PostMessage(route.params.task, messages[0])

    setMessages(previousMessages => GiftedChat.append(previousMessages, messages))
  }, [])

  return (
    <View style={styles.container}>
    <Button onPress={() => console.log(route)}>alobre</Button>
    <GiftedChat
      messages={messages} 
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
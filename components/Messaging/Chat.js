import React, { useState, useCallback, useEffect } from 'react';
import { StyleSheet, View, FlatList, Text, ScrollView, Keyboard } from 'react-native';
import { Button, Card, Avatar, FAB } from 'react-native-paper'
import { GiftedChat } from 'react-native-gifted-chat';
import { Col, Row, Grid } from "react-native-easy-grid";
import ChatBubble from './ChatUI/ChatBubble'
import ChatInput from './ChatUI/ChatInput'
import GetMessages from '../Firestore/GetMessages'
import StoreMessage from '../Firestore/StoreMessage'
import auth from '@react-native-firebase/auth';
import moment from 'moment'
import de from 'dayjs/locale/de'


function Chat({route}) {
  const [messages, setMessages] = useState([]);
  let flatList = React.createRef();
  const [keyboardState, setKeyboardState] = useState(1)

  useEffect(() => {
    GetMessages(auth().currentUser.uid, route.params.task.uid, docs => {
      docs._changes.map( doc =>  {
        messages.find(el => el.mid == doc.doc.data().mid) ? true : setMessages(prev => [doc.doc.data(), ...prev])
      })
    });
    Keyboard.addListener('keyboardDidShow', () => setKeyboardState(2))
    Keyboard.addListener('keyboardDidHide', () => setKeyboardState(1))
    return () => {
      Keyboard.removeListener("keyboardDidShow", () => setKeyboardState(2));
      Keyboard.removeListener("keyboardDidHide", () => setKeyboardState(1));
    };
  }, [])



  return (
    <Grid style={styles.container}>
      <Row size={9}>
        <FlatList
            ref={flatList}
            style={styles.flatList}
            inverted
            data={messages}
            keyExtractor={item => item.mid}
            renderItem={({item}) => 
              {
                return( 
                <ChatBubble
                avatar={item.user.avatar}
                username={item.user.name}
                message={item.text}
                messageId={item.mid}
                createdAt={item.createdAt}
                dateAndTime={item.dateAndTime}
                uid={item.user.uid}
                >
                </ChatBubble>
              )
            }
            }
            ></FlatList>
      </Row>

      <Row size={keyboardState} style={styles.textInputParent}>
        <ChatInput
        task={route.params.task}
        style={styles.textInput}>
        </ChatInput>
      </Row>

    </Grid>
    
    
    )
}

  const styles = StyleSheet.create({
    textInputParent:{
      backgroundColor: 'rgba(52, 52, 52, 0)'
    },
    textInput: {
      zIndex: 1,
    },
    flatList: {
      zIndex: -1,
    },
    container:{
      height: "100%"
    }
  });

  export default Chat;
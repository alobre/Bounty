import React, {useCallback, useState} from 'react';
import { StyleSheet, View, TextInput } from 'react-native';
import { Provider } from 'react-native-paper';
import { v4 as uuidv4 } from 'uuid';
import StoreMessage from '../../Firestore/StoreMessage'
import auth from '@react-native-firebase/auth';

export default function ChatInput({task}){
    const [messages, setMessages] = useState([]);
    let currentMessage;

    const buildMessage = (messageText, callback) => {
        callback({
            mid: uuidv4(),
            createdAt: new Date(),
            text: messageText,
            user:{
                uid: auth().currentUser.uid
            }
        })
    }

    const onSend = (message) => {
        buildMessage(message, buildedMessage => {
            StoreMessage(task, buildedMessage) 
        })
      }

    return(
        <Provider style={styles.textInputParent}>
            <TextInput 
            onChangeText={ message =>
                currentMessage = message
            }
            onSubmitEditing={() => {
                onSend(currentMessage)
                // StoreMessage(task, currentMessage)
            }}
            style={styles.textInput}
            />
        </Provider>
    )
}

const styles = StyleSheet.create({
    textInputParent:{
        // height:500,
        // justifyContent: 'flex-end'
        alignContent:'flex-end',
    },
    textInput: {
        
        // alignItems: 'flex-end'
        // alignSelf: 'flex-end'
    }
})
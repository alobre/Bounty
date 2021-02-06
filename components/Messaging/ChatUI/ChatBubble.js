import React from 'react';
import { StyleSheet, TouchableNativeFeedback, View } from 'react-native';
import { Card, Avatar, Text, Container, PaperProvider, Provider } from 'react-native-paper';
import auth from '@react-native-firebase/auth';

function ChatBubble({uid, avatar, username, message, mid, createdAt, dateAndTime}){
    // console.log([avatar, message, messageId, username, createdAt]);
    
    
    return(
       uid == auth().currentUser.uid ? 
        <Provider>
            <View style={styles.yourMsgParent}>
                <Card style={styles.yourMsgCard}>
                    <Text>{message}</Text>
                    <Text>{dateAndTime.split(' ')[1]}</Text>
                    {/* <Text>{username}</Text>
                    <Text>{createdAt}</Text> */}
                </Card>
                <Avatar.Image size={42} source={{uri: avatar}} /> 
            </View>
        </Provider>
       :  
        <Provider>
            <View style={styles.partnerMsgParent}>
                <Avatar.Image size={42} source={{uri: avatar}} /> 
                <Card style={styles.partnerMsgCard}>
                    <Text>{message}</Text>
                    <Text>{dateAndTime.split(' ')[1]}</Text>
                    {/* <Text>{username}</Text>
                    <Text>{createdAt}</Text> */}
                </Card> 
            </View>
        </Provider>
    )
}

const styles = StyleSheet.create({
partnerMsgParent:{
    flexDirection: 'row',
    margin: 5
},
partnerMsgCard:{
    marginLeft: 3,
    padding: 5,
    borderRadius: 10
},
yourMsgParent:{
    justifyContent: 'flex-end',
    flexDirection: 'row',
    margin: 5
},
yourMsgCard:{
    marginRight: 3,
    padding: 5,
    borderRadius: 10
}
})

export default ChatBubble
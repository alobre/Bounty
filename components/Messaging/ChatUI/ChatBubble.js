import React from 'react';
import { StyleSheet, TouchableNativeFeedback, View, Dimensions } from 'react-native';
import { Card, Avatar, Text, Container, PaperProvider, Provider } from 'react-native-paper';
import auth from '@react-native-firebase/auth';

function ChatBubble({uid, avatar, username, message, mid, createdAt, dateAndTime}){
    
    return(
       uid == auth().currentUser.uid ? 
        <Provider>
            <View style={styles.yourMsgParent}>
                <Card style={styles.yourMsgCard}>
                    <Text>{message}</Text>
                    <Text style={styles.time}>{dateAndTime.split(' ')[1].slice(0,-3)}</Text>
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
                    <Text style={styles.time}>{dateAndTime.split(' ')[1].slice(0,-3)}</Text>
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
    maxWidth: Dimensions.get('window').width / 1.4,
    marginRight: 3,
    padding: 5,
    borderRadius: 10
},
time:{
    alignSelf: 'flex-end'
}
})

export default ChatBubble
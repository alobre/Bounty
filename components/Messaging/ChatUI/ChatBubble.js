import React from 'react';
import { StyleSheet } from 'react-native';
import { Card, View, Avatar, Text } from 'react-native-paper';

export default function ChatBubble({avatar, username, message, messageId, createdAt}){
    console.log([avatar, message, messageId, username, createdAt]);

    return(
        <View>
            
            <Card>
                <Text>{message}</Text>
                <Text>{username}</Text>
                <Text>{createdAt}</Text>
            </Card>
            <Avatar.Image size={24} source={{uri: avatar}} />
        </View>
    )
}
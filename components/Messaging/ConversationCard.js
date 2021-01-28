import React from 'react';
import { StyleSheet, View, TouchableNativeFeedback, Platform } from 'react-native';
import {Card, Text, Avatar, Divider, TouchableRipple} from 'react-native-paper';
import { Col, Row, Grid } from "react-native-easy-grid";

export default function ConversationCard({navigation, conversation}){

    let task = {
        uid: conversation.chatPartnerUid
    }
    return(
        // <View>
        <TouchableNativeFeedback
        // style={styles.ripple}
        // onPress={()=> console.log("object") }
        // rippleColor="rgba(0, 0, 0, .32)"
            onPress={()=>{
                console.log(conversation);
                navigation.navigate('Chat', {navigation: navigation, task: task})
            }}
            background={Platform.OS === 'android' ? TouchableNativeFeedback.SelectableBackground() : ''}
        >
            {/* <View style={styles.parent}> */}
            {/* <Divider></Divider> */}
            <Card style={styles.card}>
                
                <Grid>
                    <Row>
                <Col size={15}>
                <TouchableRipple onPress={ ()=> navigation.navigate('UserProfile', {navigation: navigation, uid: task.uid}) }
                rippleColor="rgba(0, 0, 0, .32)"
                >
                    <Avatar.Image size={42} source={{uri: conversation.chatPartnerAvatar}} />
                </TouchableRipple> 
                </Col>
                <Col size={85}>
                    {/* <Card.Title
                    title={conversation.chatPartnerName}
                    // subtitle={conversation.lastMessage}
                    // left={()=> <Avatar.Image size={24} source={{uri: conversation.chatPartnerAvatar}} />}
                    >
                    </Card.Title> */}
                    {/* <Col> */}
                    <Row>
                        <Text>{conversation.chatPartnerName}</Text>
                        
                    </Row>
                    <Row>
                       <Col><Text>{conversation.lastMessage}</Text></Col>
                    <Col style={styles.timeParent}>
                        <Text style={styles.time}>{conversation.lastUpdateTime}</Text>
                    </Col> 
                    </Row>
                </Col>
            </Row>
                </Grid>
            
            
            
            </Card>
            {/* </View> */}
        </TouchableNativeFeedback>
        // </View>
    )
}

const styles = StyleSheet.create({
    parent:{
        width:"100%",
        height:"100%"
    },
    ripple:{
        // zIndex: 1
        // width:"100%",
        // height:"100%"
        // height:"100%"
    },
    card:{
        zIndex: -1,
        padding:'2%',
        // backgroundColor: 'black',
        borderRadius: 0,
        borderBottomWidth: .3,
        borderBottomColor: 'black'
    },
    timeParent:{
        // width: "100%",
        display:'flex',
        justifyContent: 'flex-end',
        alignItems: 'flex-end'
    },
    time:{
        // alignSelf: 'flex-end'
    }
})
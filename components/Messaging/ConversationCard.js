import React from 'react';
import { StyleSheet, View } from 'react-native';
import {Card, Text, Avatar} from 'react-native-paper';
import { Col, Row, Grid } from "react-native-easy-grid";

export default function ConversationCard({conversation}){


    return(
        <View>
            <Card style={styles.card}>
                <Grid>
                    <Row>
                <Col size={15}>
                    <Avatar.Image size={42} source={{uri: conversation.chatPartnerAvatar}} />   
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
            
        </View>
    )
}

const styles = StyleSheet.create({
    card:{
        padding:'2%'
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
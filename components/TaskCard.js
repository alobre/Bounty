import React, { Component } from 'react';
import {StyleSheet, View} from 'react-native'
import globalStyles from './GlobalStyles.js'
import { Avatar, Button, Card, Title, Paragraph, Text, Subheading, Divider, TouchableRipple } from 'react-native-paper';
import { Row } from 'native-base';

// import { Left, Thumbnail, Container, Header, Text, Content, Card, CardItem, Body } from 'native-base';

const TaskCard = ({username, title, category, description, wage}) =>{
  return (
    <Card elevation={4}>
    <Card.Title title={title} subtitle={category}/>
    <Card.Content>
      <TouchableRipple onPress={()=> console.log('Profile')}>
        <View style={styles.profile}>
          <Avatar.Image size={24} source={require('../media/obama.jpg')} />
          <Subheading style={styles.username}>{username}</Subheading>
        </View>
      </TouchableRipple>
      <Divider/>
      <Paragraph style={globalStyles.fontSerif}>{description}</Paragraph>
    </Card.Content>
    <Card.Cover source={{ uri: 'https://picsum.photos/700' }} />
    <View style={styles.priceAndContact}>
    <Text style={styles.price}>{wage}</Text>
    <TouchableRipple rippleColor="rgba(0, 0, 0, .32)">
      <Card.Actions style={styles.buttonParent}>
        <Button style={styles.contactContractor} onPress={() => console.log('Auftraggeber Kontaktieren')}>Auftraggeber kontaktieren</Button>
      </Card.Actions>
    </TouchableRipple>
    </View>
  </Card>
    );
  }

  const styles = StyleSheet.create({
    card:{
      borderRadius: 1
    },
    title:{
      flex: 3,
      paddingBottom:0
    },
    profile:{
      flexDirection: "row",
    },
    username:{
      paddingLeft: 3,
      color: "#0a90c9"
    },
    buttonParent:{
      justifyContent: "flex-end"
    },
    priceAndContact:{
      flexDirection: "row"
    },
    price:{
      flex:1,
      color: "#5fd47e",
      fontSize: 40,
    },
    contactContractor:{
    }
  })

export default TaskCard;
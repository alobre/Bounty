import React, { Component } from 'react';
import {StyleSheet, View} from 'react-native'
import globalStyles from './GlobalStyles.js'
import { Avatar, Button, Card, Title, Paragraph, Text, Subheading, Divider, TouchableRipple } from 'react-native-paper';

// import { Left, Thumbnail, Container, Header, Text, Content, Card, CardItem, Body } from 'native-base';

const TaskCard = ({username, title, category, description, wage}) =>{
  return (
    <Card elevation={4}>
    <Card.Title title={title} subtitle={category}/>
    <Card.Content>
      <View style={styles.profile}>
        <Avatar.Image size={24} source={require('../media/obama.jpg')} />
        <Subheading style={styles.username}>{username}</Subheading>
      </View>
      <Divider/>
      <Paragraph style={globalStyles.fontSerif}>{description}</Paragraph>
    </Card.Content>
    <Card.Cover source={{ uri: 'https://picsum.photos/700' }} />
    <TouchableRipple rippleColor="rgba(0, 0, 0, .32)">
      <Card.Actions style={styles.buttonParent}>
        <Button onPress={() => console.log('Pressed')}>Auftraggeber kontaktieren</Button>
      </Card.Actions>
    </TouchableRipple>
  </Card>
      // <Container>
      //   <Header />
      //   <Content>
      //     <Card style={styles.card}>
      //       <CardItem style={styles.title}>
      //         <Text header style={globalStyles.fontSansBold}>{title}</Text>
  
      //       </CardItem>
      //     <CardItem style={styles.profile}>
      //       <Left>
      //         <Thumbnail small source={require('../media/obama.jpg')} />
      //         <Body>
      //           <Text>{username}</Text>
      //         </Body>
      //           </Left>
      //     </CardItem>
      //       <CardItem>
      //         <Text note>{category}</Text>
      //       </CardItem>
      //       <CardItem>
      //         <Body>
      //           <Text style={globalStyles.fontSerif}>
      //             {description}
      //           </Text>
      //         </Body>
      //       </CardItem>
      //       <CardItem footer bordered>
      //         <Text style={globalStyles.fontSans}>{wage}</Text>
      //       </CardItem>
      //    </Card>
      //   </Content>
      // </Container>
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
    }
  })

export default TaskCard;
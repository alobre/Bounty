import React, { Component } from 'react';
import {StyleSheet} from 'react-native'
import globalStyles from './GlobalStyles.js'
import { Left, Thumbnail, Container, Header, Text, Content, Card, CardItem, Body } from 'native-base';


const TaskCard = ({username, title, category, description, wage}) =>{
  return (
      <Container>
        <Header />
        <Content>
          <Card>
            <CardItem>
              <Text header style={globalStyles.fontSansBold}>{title}</Text>
            </CardItem>
          <CardItem>
              <Left>
                <Thumbnail small source={require('../media/obama.jpg')} />
                <Body>
                  <Text>{username}</Text>
                </Body>
              </Left>
            </CardItem>
            <CardItem>
              <Text note>{category}</Text>
            </CardItem>
            <CardItem>
              <Body>
                <Text style={globalStyles.fontSerif}>
                  {description}
                </Text>
              </Body>
            </CardItem>
            <CardItem footer bordered>
              <Text style={globalStyles.fontSans}>{wage}</Text>
            </CardItem>
         </Card>
        </Content>
      </Container>
    );
  }

  const styles = StyleSheet.create({
    font:{
      fontFamily: "Cochin",
      color: 'red'
    }
  })

export default TaskCard;
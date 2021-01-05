import React, { useState } from 'react';
import {StyleSheet, View, Modal } from 'react-native'
import globalStyles from '../GlobalComponents/GlobalStyles.js'
import { Avatar, Button, Card, Title, Paragraph, Text, Subheading, Divider, TouchableRipple, Badge, IconButton, Menu, Icon } from 'react-native-paper';
import { Col, Row, Grid } from "react-native-easy-grid";
import ImageGallery from "./ImageGallery";

const MORE_ICON = Platform.OS === 'ios' ? 'dots-horizontal' : 'dots-vertical';


const TaskCard = ({username, title, category, description, wage, imageURL}) =>{

  const [visible, setVisible] = useState(false);

  const openMenu = () => setVisible(true);

  const closeMenu = () => setVisible(false);

  let [imageVisible, setImageVisible] = useState(false)

  const items= [
    {
      url: 'https://picsum.photos/700',
      index: 0
    },
    {
      url: 'https://picsum.photos/800',
      index: 1
    },
    {
      url: 'https://picsum.photos/900',
      index: 2
    },
    {
      url: 'https://picsum.photos/600',
      index: 3
    },
    {
      url: 'https://picsum.photos/500',
      index: 4
    },
    {
      url: 'https://picsum.photos/400',
      index: 5
    },
    {
      url: 'https://picsum.photos/300',
      index: 6
    },
    {
      url: 'https://picsum.photos/200',
      index: 7
    },
    {
      url: 'https://picsum.photos/100',
      index: 8  
    },
  ]


  return (
    <Card style={styles.card} elevation={4}>
    <Grid>
    <Col>
      <Card.Title title={title} subtitle={category}/>
    </Col>
    <Col style={styles.colMoreButton}>
        <Menu
          visible={visible}
          onDismiss={closeMenu}
          anchor={<IconButton style={styles.moreButton} icon={MORE_ICON} size={20} onPress={openMenu}></IconButton>}>
          <Menu.Item icon="alert-octagon" onPress={() => {}} title="Report Task" /></Menu>
    </Col>
    </Grid>
    <Card.Content>
      <TouchableRipple>
        <View style={styles.profile}>
          <Avatar.Image size={24} source={require('../../media/obama.jpg')} />
          <Subheading style={styles.username}>{username}</Subheading>
        </View>
      </TouchableRipple>
      <Divider/>
      <Paragraph style={globalStyles.fontSerif}>{description}</Paragraph>
    </Card.Content>
    {/* {
      ((imageURL) ? true : false) &&
      <Card.Cover source={{ uri: imageURL }} />
    } */}

    {/* {((imageUrl) ? true : false) && */}
      <ImageGallery items={imageURL}></ImageGallery> 
    {/* } */}
    

    <View style={styles.priceAndContact}>
      <View style={styles.priceParent}>
        <Badge size={40} style={styles.price}>
          {wage}
        </Badge>
      </View>
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
      margin: 6
    },
    colMoreButton:{
      justifyContent: 'flex-start',
      alignContent: "center"
    },
    moreButton:{
      borderRadius: 30,
      alignContent: 'center',
      alignSelf: 'flex-end'
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
    priceParent:{
      flex:1
    },
    price:{
      backgroundColor: "#eddd2d",
      borderColor: '#968b0f',
      borderWidth: 1,
      margin: 10,
      alignSelf: "flex-start"
    },
    contactContractor:{
    }
  })

export default TaskCard;
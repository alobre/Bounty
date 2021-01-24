import React, { useState } from 'react';
import {StyleSheet, View, Modal } from 'react-native'
import globalStyles from '../GlobalComponents/GlobalStyles.js'
import { Avatar, Button, Card, Title, Paragraph, Text, Subheading, Divider, TouchableRipple, Badge, IconButton, Menu, Icon, Chip } from 'react-native-paper';
import { Col, Row, Grid } from "react-native-easy-grid";
import ImageGallery from "./ImageGallery";
import {connect} from "react-redux"
import {saveUserDetails} from "../../redux/Actions/saveUserDetailAction"

const MORE_ICON = Platform.OS === 'ios' ? 'dots-horizontal' : 'dots-vertical';


const TaskCard = ({reduxSaveUserDetail, userDetails, taskId, uid, username, avatar, title, tags, description, bounty, imageURL, navigation}) =>{

  const task = {
    taskId,
    uid,
  }

  const [visible, setVisible] = useState(false);

  const openMenu = () => setVisible(true);

  const closeMenu = () => setVisible(false);

  let [imageVisible, setImageVisible] = useState(false)

  let [chipSelected, setChipSelected] = useState(false)

  let user = {
    // uid: 1,
    // username: "Alobre",
    // email: "alobre@gmail.com",
    // imageURL: "www.google.at",
    // tags: ['alo', 'bre']
  }

  const addOrRemoveTag = (tag) => {
    // console.log(userDetails.tags.includes(tag));
    isInterested(tag) ? removeTagFromFavorite(tag) : addTagToFavorite(tag)
    // isInterested(tag) ? console.log("true") : console.log("false")
  }

  const addTagToFavorite = (tag) => {
    let newTags = userDetails.tags;
    newTags.push(tag)
    reduxSaveUserDetail({
      // uid: uid,
      // username: username,
      // email: email
      // imageURL: imageURL,
      tags: newTags
    });
    console.log(userDetails);
  }

  const removeTagFromFavorite = (chipTag) => {
    let currentUserTags = userDetails.tags.filter( tag => tag != chipTag )
    reduxSaveUserDetail({
      // uid: uid,
      // username: username,
      // email: email
      // imageURL: imageURL,
      tags: currentUserTags
    });
    console.log(userDetails);
  }

  const isInterested = (chipTag) => {
    let visible;
    userDetails.tags.includes(chipTag) ? visible = true : visible = false
    return visible
  }

  return (
    <Card style={styles.card} elevation={4}>
    <Grid>
    <Col>
      <Card.Title title={title}/>
      <Row style={styles.tagParent}>
        {
        ((tags) ? true : false) &&
        tags.map((tag) => <Chip key={tag + '-' + taskId } selected={isInterested(tag)} onPress={ ()=> addOrRemoveTag(tag) } mode="outlined">{tag}</Chip>)
        }
      </Row>
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
      <TouchableRipple onPress={()=>{navigation.navigate('UserProfile', {navigation: navigation, uid: uid})}}>
        <View style={styles.profile}>
          <Avatar.Image size={24} source={{uri: avatar}} />
          <Subheading style={styles.username}>{username}</Subheading>
        </View>
      </TouchableRipple>
      <Divider/>
      <Paragraph style={globalStyles.fontSerif}>{description}</Paragraph>
      <Divider/>
      <ImageGallery items={imageURL}></ImageGallery> 

    </Card.Content>
    {/* {
      ((imageURL) ? true : false) &&
      <Card.Cover source={{ uri: imageURL }} />
    } */}

    {/* {((imageUrl) ? true : false) && */}
      
    {/* } */}
    

    <View style={styles.priceAndContact}>
      <View style={styles.priceParent}>
        <Badge size={40} style={styles.price}>
          {bounty}
        </Badge>
      </View>
    <TouchableRipple rippleColor="rgba(0, 0, 0, .32)">
      <Card.Actions style={styles.buttonParent}>
        <Button icon="message-draw" style={styles.contactContractor} onPress={() => navigation.navigate('Chat', {navigation: navigation, task: task})}>Auftraggeber kontaktieren</Button>
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
    tagParent:{
      paddingLeft: 10
    },
    profile:{
      flexDirection: "row",
      paddingVertical: 10
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

  const mapStateToProps = (state) => {
    return{
    //   taskDetails: state.taskDetailReducer.taskDetails,
      userDetails: state.userDetailReducer.userDetails
    }
  }
  
  const mapDispatchToProps = (dispatch) => 
  {
      return{
      //  reduxSaveTaskDetail:(taskDetails) => dispatch(saveTaskDetails(taskDetails)),
       reduxSaveUserDetail:(userDetails) => dispatch(saveUserDetails(userDetails)),
           
      }
  }
  export default connect(
      mapStateToProps,
      mapDispatchToProps
    )(TaskCard); 

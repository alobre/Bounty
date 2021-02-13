import React, { useState } from 'react';
import {StyleSheet, View, Modal } from 'react-native'
import globalStyles from '../GlobalComponents/GlobalStyles.js'
import { Avatar, Button, Card, Title, Paragraph, Text, Subheading, Divider, TouchableRipple, Badge, IconButton, Menu, Icon, Chip, FAB, Portal, Dialog, TextInput } from 'react-native-paper';
import { Input } from 'native-base'
import { Col, Row, Grid } from "react-native-easy-grid";
import ImageGallery from "./ImageGallery";
import {connect} from "react-redux"
import {saveUserDetails} from "../../redux/Actions/saveUserDetailAction"
import auth from '@react-native-firebase/auth';
import StoreMessage from '../Firestore/StoreMessage'
import BuildMessage from '../Messaging/BuildMessage.js'

const MORE_ICON = Platform.OS === 'ios' ? 'dots-horizontal' : 'dots-vertical';


const TaskCard = ({reduxSaveUserDetail, userDetails, taskId, uid, username, avatar, title, tags, description, bounty, imageURL, navigation}) =>{

  const task = {
    taskId,
    uid,
    username,
    avatar,
    title,
    tags,
    description,
    bounty,
    imageURL
  }

  const [pilotMessage,setPilotMessage] = useState({})

  const [visible, setVisible] = useState(false);

  const openMenu = () => setVisible(true);

  const closeMenu = () => setVisible(false);

  let [imageVisible, setImageVisible] = useState(false)

  let [chipSelected, setChipSelected] = useState(false)

  const [contactContractorDialog, setContactContractorDialog] = useState(false)

  let user = {
    // uid: 1,
    // username: "Alobre",
    // email: "alobre@gmail.com",
    // imageURL: "www.google.at",
    // tags: ['alo', 'bre']
  }

  const addOrRemoveTag = (tag) => {
    isInterested(tag) ? removeTagFromFavorite(tag) : addTagToFavorite(tag)
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
  }

  const isInterested = (chipTag) => {
    let visible;
    
    userDetails.tags ?
      userDetails.tags.includes(chipTag) ? visible = true : visible = false
    : false
    return visible 
  }

  return (
    <Card style={styles.card} elevation={4}>
    <Grid>
    <Col size={90}>
      <Card.Title titleNumberOfLines={3} title={title}/>
      <Row style={styles.tagParent}>
        {
        ((tags) ? true : false) &&
        tags.map((tag) => <Chip key={tag + '-' + taskId } selected={isInterested(tag)} onPress={ ()=> addOrRemoveTag(tag) } mode="outlined">{tag}</Chip>)
        }
      </Row>
    </Col>
    <Col style={styles.colMoreButton} size={10}>
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
    {
      auth().currentUser ? 
      auth().currentUser.uid == uid ? true :  
      <TouchableRipple rippleColor="rgba(0, 0, 0, .32)">
      <Card.Actions style={styles.buttonParent}>
        <FAB 
        icon="message-draw"
        style={styles.contactContractor}
        small
        onPress={() =>
          // navigation.navigate('Chat', {navigation: navigation, task: task})
          setContactContractorDialog(true)
        }
        ></FAB>
      </Card.Actions>
    </TouchableRipple>
    :
    false
    }
    {/* <ContactContractorDialog dialogVisible={contactContractorDialog} taskDetails={task}></ContactContractorDialog> */}
    <Portal>
            <Dialog style={styles.contactContractorDialog} dismissable onDismiss={() => setContactContractorDialog(false)} visible={contactContractorDialog}>
                <Dialog.Title>Autraggeber kontaktieren?</Dialog.Title>
                <Dialog.Content style={styles.contactContractorDialogContent}>
                                        <Card>
                                          <Card.Title title={title}/>
                                          <Card.Content>
                                          <View style={styles.tagParentD}>
                                          {
                                          ((tags) ? true : false) &&
                                          tags.map((tag) => <Chip style={styles.tagD} key={tag + '-' + taskId } selected={isInterested(tag)} onPress={ ()=> addOrRemoveTag(tag) } mode="outlined">{tag}</Chip>)
                                          }
                                          </View>
                                          <TouchableRipple onPress={()=>{navigation.navigate('UserProfile', {navigation: navigation, uid: uid})}}>
                                            <View style={styles.profile}>
                                              <Avatar.Image size={24} source={{uri: avatar}} />
                                              <Subheading style={styles.username}>{username}</Subheading>
                                            </View>
                                        </TouchableRipple>
                                            <Paragraph>{description}</Paragraph>
                                            <Divider/>
                                            <ImageGallery items={imageURL}></ImageGallery> 
                                            <Divider/>
                                          <View style={styles.priceParentD}>
                                            <Badge size={40} style={styles.priceD}>
                                              {bounty}
                                            </Badge>
                                          </View>
                                          </Card.Content>
                                        </Card>
                </Dialog.Content>
                <Dialog.Content style={styles.inputDParent}>
                  <Input
                  onChangeText={ message =>
                    setPilotMessage({
                      text: message,
                      isPilotMessage: true,
                      requestedTaskId: taskId
                    })
                  }
                  style={styles.inputD}
                  />
                </Dialog.Content>
                <Dialog.Actions>
                    <Button onPress={() => setContactContractorDialog(false)}>Abbrechen</Button>
                    <Button onPress={() => {
                      setContactContractorDialog(false);
                      BuildMessage(pilotMessage, buildedMessage => {
                        StoreMessage(task, buildedMessage)
                        navigation.navigate('Chat', {navigation, task})
                      })
                      
                      }}>Senden</Button>
                </Dialog.Actions>
            </Dialog>
        </Portal>
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
    contactContractorDialog:{
      // height: 500,
    },
    contactContractorDialogContent:{
      // height: 300,
    },
    //Dialog
    cardD:{
      margin: 6
    },
    colMoreButtonD:{
      justifyContent: 'flex-start',
      alignContent: "center"
    },
    moreButtonD:{
      borderRadius: 30,
      alignContent: 'center',
      alignSelf: 'flex-end'
    },
    titleD:{
      fontSize: 20,
    },
    tagParentD:{
      // paddingLeft: 10
      // height: 10
      display: "flex",
      flexWrap: "wrap",
      flexDirection: "row"
    },
    tagD:{
      
    },
    profileD:{
      flexDirection: "row",
      paddingVertical: 10
    },
    usernameD:{
      paddingLeft: 3,
      color: "#0a90c9"
    },
    buttonParentD:{
      justifyContent: "flex-end"
    },
    priceAndContactD:{
      flexDirection: "row"
    },
    priceParentD:{
      // flex:1
    },
    priceD:{
      backgroundColor: "#eddd2d",
      borderColor: '#968b0f',
      borderWidth: 1,
      margin: 10,
      alignSelf: "flex-start"
    },
    inputDParent:{
      height: "12%",
      display: "flex",
      justifyContent: "center",
      alignContent: "center",
      alignItems: "center",
      // backgroundColor: "black"
    },
    inputD:{
      alignSelf: "center",
      width: "100%",
      borderRadius: 30,
      borderColor: 'lightgrey',
      borderWidth: 1
    },
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

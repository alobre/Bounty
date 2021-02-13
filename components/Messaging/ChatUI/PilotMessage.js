import React, { useEffect, useState } from 'react';
import { StyleSheet, TouchableNativeFeedback, View, Dimensions } from 'react-native';
import { Card, Avatar, Text, Container, PaperProvider, Provider, Chip, TouchableRipple, Badge, Subheading, Paragraph, Divider } from 'react-native-paper';
import ImageGallery from "../../Tasks/ImageGallery";
import auth from '@react-native-firebase/auth';
import GetTaskDetails from '../../Firestore/GetTaskDetails';

function PilotMessage({requestedTaskId, uid, avatar, username, message, mid, createdAt, dateAndTime}){
    
    const [taskDetails, setTaskDetails] = useState({})

    async function getTaskDetails(callback){
        const taskDetails = await GetTaskDetails(requestedTaskId)
        callback(taskDetails)
    }

    function readData(){
        console.log(taskDetails)
    }

    const isInterested = (chipTag) => {
        let visible;
        
        userDetails.tags ?
          userDetails.tags.includes(chipTag) ? visible = true : visible = false
        : false
        return visible 
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

    useEffect(() => {
        // getTaskDetails();
        getTaskDetails(data => setTaskDetails(data.docs[0].data()))
        readData()
      }, [])

    return(
       uid == auth().currentUser.uid ? 
        <Provider>
            
            <View style={styles.yourMsgParent}>
                <Card style={styles.yourMsgCard}>
                                        <Card>
                                          <Card.Title title={taskDetails.title}/>
                                          <Card.Content>
                                          <View style={styles.tagParent}>
                                          {/* {
                                          ((taskDetails.tags) ? true : false) &&
                                          taskDetails.tags.map((tag) => <Chip style={styles.tag} key={tag + '-' + taskDetails.taskId } selected={isInterested(tag)} onPress={ ()=> addOrRemoveTag(tag) } mode="outlined">{tag}</Chip>)
                                          } */}
                                          </View>
                                          <TouchableRipple onPress={()=>{navigation.navigate('UserProfile', {navigation: navigation, uid: uid})}}>
                                            <View style={styles.profile}>
                                              <Avatar.Image size={24} source={{uri: avatar}} />
                                              <Subheading style={styles.username}>{username}</Subheading>
                                            </View>
                                        </TouchableRipple>
                                            <Paragraph>{taskDetails.description}</Paragraph>
                                            <Divider/>
                                            <ImageGallery items={taskDetails.images}></ImageGallery> 
                                            <Divider/>
                                          <View style={styles.priceParent}>
                                            <Badge size={40} style={styles.price}>
                                              {taskDetails.bounty}
                                            </Badge>
                                          </View>
                                          </Card.Content>
                                        </Card>
                    <Text>Pilot: {message}</Text>
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
                                        <Card>
                                          <Card.Title title={taskDetails.title}/>
                                          <Card.Content>
                                          <View style={styles.tagParent}>
                                          {/* {
                                          ((taskDetails.tags) ? true : false) &&
                                          taskDetails.tags.map((tag) => <Chip style={styles.tag} key={tag + '-' + taskDetails.taskId } selected={isInterested(tag)} onPress={ ()=> addOrRemoveTag(tag) } mode="outlined">{tag}</Chip>)
                                          } */}
                                          </View>
                                          <TouchableRipple onPress={()=>{navigation.navigate('UserProfile', {navigation: navigation, uid: uid})}}>
                                            <View style={styles.profile}>
                                              <Avatar.Image size={24} source={{uri: avatar}} />
                                              <Subheading style={styles.username}>{username}</Subheading>
                                            </View>
                                        </TouchableRipple>
                                            <Paragraph>{taskDetails.description}</Paragraph>
                                            <Divider/>
                                            <ImageGallery items={taskDetails.images}></ImageGallery> 
                                            <Divider/>
                                          <View style={styles.priceParent}>
                                            <Badge size={40} style={styles.price}>
                                              {taskDetails.bounty}
                                            </Badge>
                                          </View>
                                          </Card.Content>
                                        </Card>
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
},
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
    fontSize: 20,
  },
  tagParent:{
    // paddingLeft: 10
    // height: 10
    display: "flex",
    flexWrap: "wrap",
    flexDirection: "row"
  },
  tag:{
    
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
    // flex:1
  },
  price:{
    backgroundColor: "#eddd2d",
    borderColor: '#968b0f',
    borderWidth: 1,
    margin: 10,
    alignSelf: "flex-start"
  },
})

export default PilotMessage
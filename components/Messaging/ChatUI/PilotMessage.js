import React, { useEffect, useState } from 'react';
import { StyleSheet, TouchableNativeFeedback, View, Dimensions, PixelRatio } from 'react-native';
import { Card, Avatar, Text, Container, PaperProvider, Provider, Dialog, Chip, TouchableRipple, Badge, Subheading, Paragraph, Divider, Button, Surface } from 'react-native-paper';
import { Col, Row, Grid } from "react-native-easy-grid";
import ImageGallery from "../../Tasks/ImageGallery";
import CompactTaskCard from '../../Tasks/CompactTaskCard'
import auth from '@react-native-firebase/auth';
import GetTaskDetails from '../../Firestore/GetTaskDetails';
import GetPublicUser from '../../Firestore/GetPublicUser'

function PilotMessage({requestedTaskId, uid, avatar, username, message, mid, createdAt, dateAndTime, OpenDialog, TaskInfo}){
    
    const [taskDetails, setTaskDetails] = useState({})
    const [taskOwnerDetails, setTaskOwnerDetails] = useState({})
    const [taskAssignedTo, setTaskAssignedTo] = useState({})
    // const [openDialog, setOpenDialog] = useState(false)

    async function getTaskDetails(callback){
        const taskDetails = await GetTaskDetails(requestedTaskId)
        const taskOwnerDetails = await GetPublicUser(taskDetails.docs[0].data().uid)
        let taskAssignedTo;
        taskDetails.docs[0]._data.taskAssigned == "notAssigned" ? true : 
        taskAssignedTo = await GetPublicUser(taskDetails.docs[0]._data.taskAssigned);
        callback(taskDetails, taskOwnerDetails, taskAssignedTo)
    }

    useEffect(() => {
        // getTaskDetails();
        getTaskDetails((taskDetails, taskOwnerDetails, taskAssignedTo) => {
          setTaskDetails(taskDetails.docs[0].data())
          setTaskOwnerDetails(taskOwnerDetails.data())
          setTaskAssignedTo(taskAssignedTo._data)
        })
      }, [])

    return(
      <View>
       {uid == auth().currentUser.uid ? 
        <Provider>
            <View style={styles.yourMsgParent}>
                <Card style={styles.yourMsgCard}>
                  <CompactTaskCard
                  title={taskDetails.title}
                  description={taskDetails.description}
                   images={taskDetails.images}
                   bounty={taskDetails.bounty}
                  //  navigation
                   uid={taskOwnerDetails.uid}
                   photoURL={taskOwnerDetails.photoURL}
                   displayName={taskOwnerDetails.displayName}
                  />
                                        {/* <Card>
                                          <Card.Title title={taskDetails.title}/>
                                          <Card.Content>
                                          <TouchableRipple onPress={()=>{navigation.navigate('UserProfile', {navigation: navigation, uid: uid})}}>
                                            <View style={styles.profile}>
                                              <Avatar.Image size={24} source={{uri: taskOwnerDetails.photoURL}} />
                                              <Subheading style={styles.username}>{taskOwnerDetails.displayName}</Subheading>
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
                                        </Card> */}
                    <Text>{message}</Text>
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
                <CompactTaskCard
                  title={taskDetails.title}
                  description={taskDetails.description}
                   images={taskDetails.images}
                   bounty={taskDetails.bounty}
                  //  navigation
                   uid={taskOwnerDetails.uid}
                   photoURL={taskOwnerDetails.photoURL}
                   displayName={taskOwnerDetails.displayName}
                  />
                  {
                    taskDetails.taskAssigned == 'notAssigned' ? 
                    <Grid>
                      <Col>
                        <Button onPress={ () => console.log(taskDetails)}>
                          <Text adjustsFontSizeToFit style={styles.declineButton}>Ablehnen</Text>
                          </Button>
                      </Col>
                      <Col>
                        <Button onPress={ () => {
                          TaskInfo(taskDetails);
                          OpenDialog(true)
                          }}>
                          <Text style={styles.acceptButton}>
                            Zuweisen
                          </Text>
                          </Button>
                      </Col>
                    </Grid>
                    :
                    <View>
                      <Divider/>
                        <Text>Auftrag zugewiesen an:</Text>
                        <View style={styles.profile}>
                            <Avatar.Image size={24} source={{uri: taskAssignedTo.photoURL}} />
                            <Subheading style={styles.username}>{taskAssignedTo.displayName}</Subheading>
                        </View>
                      <Divider/>
                    </View>
                  }
                    
                    <Text>{message}</Text>
                    <Text style={styles.time}>{dateAndTime.split(' ')[1].slice(0,-3)}</Text>
                </Card> 
            </View>
        </Provider>
        }
      </View>
    )
}

let btnFontSize = 12;

if (PixelRatio.get() <= 2) {
  btnFontSize = 14;
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
  declineButton:{
    fontSize: btnFontSize,
  },
  acceptButton:{
    fontSize: btnFontSize,
  },
  dialog:{
    zIndex: 1,
  },
})

export default PilotMessage
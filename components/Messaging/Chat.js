import React, { useState, useCallback, useEffect } from 'react';
import { StyleSheet, View, FlatList, Text, ScrollView, Keyboard, Dimensions, Animated } from 'react-native';
import { Button, Card, Avatar, FAB, Dialog, Provider, TouchableRipple, Badge, Paragraph, Divider, Subheading } from 'react-native-paper'
import ImageGallery from "../Tasks/ImageGallery";
import { GiftedChat } from 'react-native-gifted-chat';
import { Col, Row, Grid } from "react-native-easy-grid";
import CompactTaskCard from '../Tasks/CompactTaskCard'
import PilotMessage from './ChatUI/PilotMessage'
import ChatBubble from './ChatUI/ChatBubble'
import ChatInput from './ChatUI/ChatInput'
import GetMessages from '../Firestore/GetMessages'
import StoreMessage from '../Firestore/StoreMessage'
import ChatConversationBar from './ChatUI/ChatConversationBar'
import auth from '@react-native-firebase/auth';
import GetPublicUser from '../Firestore/GetPublicUser';
import AssignTask from '../Firestore/AssignTask';
import moment from 'moment'
import de from 'dayjs/locale/de'


function Chat({route}) {
  const [messages, setMessages] = useState([]);
  let flatList = React.createRef();
  const [keyboardState, setKeyboardState] = useState(10)
  const [openDialog, setOpenDialog] = useState(false)
  const [selectedTaskInfo, setSelectedTaskInfo] = useState({})
  const [taskOwnerInfo, setTaskOwnerInfo] = useState({})
  const [chatPartnerInfo, setChatPartnerInfo] = useState({});

  // const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);
  // const scrollY = useRef(new Animated.Value(0));
  // const handleScroll = Animated.event(e
  //   [
  //     {
  //       nativeEvent: {
  //         contentOffset: {y: scrollY.current},
  //       },
  //     },
  //   ],
  //   {
  //     useNativeDriver: true,
  //   },
  // );
  // const scrollYClamped = diffClamp(scrollY.current, 0, headerHeight);
  // const translateY = scrollYClamped.interpolate({
  //   inputRange: [0, headerHeight],
  //   outputRange: [0, -(headerHeight / 2)],
  //   });
  //  const translateYNumber = useRef();
  //  translateY.addListener(({value}) => {
  //    translateYNumber.current = value;
  //  });


  const OpenDialog = (state) => {
    setOpenDialog(state);
  }

  const TaskInfo = (state) => {
    TaskOwnerInfo(state.uid)
    setSelectedTaskInfo(state)
  }

  const TaskOwnerInfo = async (uid) => {
    const user = await GetPublicUser(uid)
    setTaskOwnerInfo(user._data)
  }

  const ChatPartnerInfo = async (uid) => {
    const user = await GetPublicUser(uid)
    setChatPartnerInfo(user._data)
    console.log(user._data)
  }

  useEffect(() => {
    GetMessages(auth().currentUser.uid, route.params.task.uid, docs => {
      docs._changes.map( doc =>  {
        messages.find(el => el.mid == doc.doc.data().mid) ? true : setMessages(prev => [doc.doc.data(), ...prev])
      })
    });
    ChatPartnerInfo(route.params.task.uid)
    Keyboard.addListener('keyboardDidShow', () => setKeyboardState(20))
    Keyboard.addListener('keyboardDidHide', () => setKeyboardState(10))
    return () => {
      Keyboard.removeListener("keyboardDidShow", () => setKeyboardState(20));
      Keyboard.removeListener("keyboardDidHide", () => setKeyboardState(10));
    };
  }, [])



  return (
    <Provider>
      {/* <ChatConversationBar avatar={chatPartnerInfo.photoURL} username={chatPartnerInfo.displayName}/> */}

      <Dialog style={styles.dialog} dismissable onDismiss={() => setOpenDialog(false)} visible={openDialog}>
        <Dialog.Title>Auftrag zuweisen?</Dialog.Title>
        <Dialog.Content>
          <CompactTaskCard
          title={selectedTaskInfo.title}
          description={selectedTaskInfo.description}
           images={selectedTaskInfo.images}
           bounty={selectedTaskInfo.bounty}
          //  navigation
           uid={taskOwnerInfo.uid}
           photoURL={taskOwnerInfo.photoURL}
           displayName={taskOwnerInfo.displayName}
          />
            <View style={styles.dBtnParent}>
              <Grid style={styles.dBtnGrid}>
                <Col>
                <Button style={styles.dBtnCancel} onPress={()=>setOpenDialog(false)}>
                <Text>Abbrechen</Text>
              </Button>
                </Col>
                <Col>
                <Button mode={'text'} style={styles.dBtnAccept} onPress={()=>{
                  AssignTask(selectedTaskInfo.id, route.params.task.uid)
                  }}>
                <Text>Akzeptieren</Text>
              </Button>
                </Col>
              </Grid>
              
              
            </View>
              
            
        </Dialog.Content>
      </Dialog>

      <Grid style={styles.container}>
        <Row size={5}>
        <ChatConversationBar style={[styles.header]} avatar={chatPartnerInfo.photoURL} username={chatPartnerInfo.displayName}/>
        </Row>
        <Row size={85}>
          <FlatList
              ref={flatList}
              style={styles.flatList}
              inverted
              data={messages}
              keyExtractor={item => item.mid}
              // ListFooterComponent={ () => <Animated.ChatConversationBar style={[styles.header, {transform: [{translateY}]}]} avatar={chatPartnerInfo.photoURL} username={chatPartnerInfo.displayName}/>}
              stickyFooterIndices={[0]}
              renderItem={({item}) => 
                {
                  return( 
                  item.isPilotMessage ? 
                  <PilotMessage
                  avatar={item.user.avatar}
                  username={item.user.name}
                  message={item.text}
                  messageId={item.mid}
                  createdAt={item.createdAt}
                  dateAndTime={item.dateAndTime}
                  uid={item.user.uid}
                  requestedTaskId={item.requestedTaskId}
                  OpenDialog={OpenDialog}
                  TaskInfo={TaskInfo}
                  >
                  </PilotMessage>
                  :
                  <ChatBubble
                  avatar={item.user.avatar}
                  username={item.user.name}
                  message={item.text}
                  messageId={item.mid}
                  createdAt={item.createdAt}
                  dateAndTime={item.dateAndTime}
                  uid={item.user.uid}
                  >
                  </ChatBubble>
                )
              }
              }
              ></FlatList>
        </Row>

        <Row size={keyboardState} style={styles.textInputParent}>
          <ChatInput
          task={route.params.task}
          style={styles.textInput}>
          </ChatInput>
        </Row>

      </Grid>     
    </Provider>
    )
}

  const styles = StyleSheet.create({
    header: {
    },
    dialog:{
      height: Dimensions.get("window").height * 0.6,
    },
    textInputParent:{
      backgroundColor: 'rgba(52, 52, 52, 0)'
    },
    textInput: {
      zIndex: 1,
    },
    flatList: {
      zIndex: -1,
    },
    container:{
      height: Dimensions.get("window").height
    },
    dBtnParent:{
      height:"100%",
      // flexDirection: 'row',
      justifyContent: 'flex-end'
    },
    dBtnGrid:{
      height:"100%",
      justifyContent: 'flex-end',
      // alignItems: 'flex-end'
    },
    dBtnCancel:{

      // alignSelf:"flex-end"
    },
    dBtnAccept:{
    },
  });

  export default Chat;
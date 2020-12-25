import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, Avatar, Card, Title, Subheading, Button } from "react-native-paper";
import { Col, Row, Grid } from "react-native-easy-grid";
import firestore from '@react-native-firebase/firestore';
import ProfileTab from './ProfileTab'
import Logout from '../Authentication/Logout'
import { ScrollView } from 'react-native-gesture-handler'
import Post from '../Firestore/Post'
import auth from '@react-native-firebase/auth';
import { GoogleSignin } from '@react-native-community/google-signin';

export default class User extends Component{
    constructor(props){
        super(props);
        this.state = {
          user: {
            name: '',
            photoURL: '',
            email:'',
          }
        }
      }
      
      componentDidMount(){
        this.subscriber = firestore().collection('users').doc(auth().currentUser.uid).onSnapshot( doc => {
          if(doc){
          this.setState({
            user: {
              name: doc.data().displayName,
              email: doc.data().email,
              photoURL: doc.data().photoURL,
            }
          })
        }
        })
      }

    render(){
          return(
            <ScrollView>
              <Card>
                <Card.Content>
                  <Avatar.Image size={128} style={styles.profilePic} source={{uri: this.state.user.photoURL}} />
                  <Title style={styles.username}>{this.state.user.name}</Title>
                  <Subheading style={styles.email}>{this.state.user.email}</Subheading>
                </Card.Content>
                <Card.Content style={styles.logoutButtonParent}>
                  {/* <Button onPress={async()=>{ const currentUser = await GoogleSignin.getCurrentUser(); Post(currentUser.user)}}>Post</Button> */}
                  {/* <Button onPress={async()=>{ const user = await auth().currentUser; Post(user) }}>Post</Button> */}
                  <Logout navigation={this.props.navigation} style={styles.logoutButton}/>
                </Card.Content>
              </Card>
              <ProfileTab/>
            </ScrollView>
          )
      }
}


const styles = StyleSheet.create({
  grid:{
    justifyContent: 'center'
  },
  card:{
  },
  profilePicParent:{
    justifyContent: 'center',
  },
  profilePic:{
    alignSelf: "center",
  },
  username:{
    alignSelf: 'center'
  },
  email:{
    alignSelf: 'center'
  },
  logoutButtonParent:{

  },

})
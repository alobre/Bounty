import React, { Component } from 'react';
import { StyleSheet, View   } from 'react-native';
import { Text, Avatar, Card, Title, Subheading, Button, Provider } from "react-native-paper";
import { ScrollView } from 'react-native-gesture-handler'
import GetPublicUser from '../Firestore/GetPublicUser'
import GetTaskByUserId from "../Firestore/GetTaskByUserId";
import UserProfileTab from "./UserProfileTab";
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

export default class UserProfile extends Component{
    constructor(props){
        super(props)
        this.state={
            userData: {}
        }
    }

    async getUserData(uid){
        const udata = await GetPublicUser(uid)
        this.setState({userData: udata.data()})
    }

    componentDidMount(){
        this.getUserData(this.props.route.params.uid)
    }

    render(){
        return(
            <Provider>
              <Card>
                <Card.Content>
                  <Avatar.Image size={128} style={styles.userPic} source={{uri: this.state.userData.photoURL}} />
                  <Title style={styles.username}>{this.state.userData.displayName}</Title>
                  <Subheading style={styles.email}>{this.state.userData.email}</Subheading>
                </Card.Content>
                </Card>
                <UserProfileTab navigation={this.props.route.params.navigation} uid={this.props.route.params.uid}/>
             </Provider>
        )
    }
}


const styles = StyleSheet.create({
    grid:{
      justifyContent: 'center'
    },
    card:{
    },
    userPic:{
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
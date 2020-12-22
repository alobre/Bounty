import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, Avatar, Card, Title, Subheading, Button } from "react-native-paper";
import { Col, Row, Grid } from "react-native-easy-grid";
import firestore from '@react-native-firebase/firestore';
import ProfileTab from './Profile/ProfileTab'
import Logout from './Logout'
import { ScrollView } from 'react-native-gesture-handler'
import auth from '@react-native-firebase/auth';

export default class User extends Component{
    constructor(props){
        super(props);
        this.getUser();
        // this.subscriber = firestore().collection('users').doc('lE5CQoYZdLfWJimgYQHj').onSnapshot( doc => {
        //   this.setState({
        //     user: {
        //       name: doc.data().name,
        //       email: doc.data().email,
        //       photoURL: doc.data().photoURL,
        //     }
        //   })
        // })
        this.state = {
          user: {
            name: '',
            photoURL: '',
            email:'',
          }
        }
      }

      getUser = async () => {
        const userDocument = firestore()
      .collection('lE5CQoYZdLfWJimgYQHj')
      .get();
      console.log(userDocument)
      }
      
      componentDidMount(){
        this.subscriber = firestore().collection('users').doc('lE5CQoYZdLfWJimgYQHj').onSnapshot( doc => {
          if(doc){
          this.setState({
            user: {
              name: doc.data().name,
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
                  <Button onPress={()=> console.log(this.props.navigation.navigate('Home'))}></Button>
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
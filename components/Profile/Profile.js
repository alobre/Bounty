import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, Avatar, Card, Title, Subheading, Button } from "react-native-paper";
import { Col, Row, Grid } from "react-native-easy-grid";
import firestore from '@react-native-firebase/firestore';
import ProfileTab from './ProfileTab'
import GetUser from '../Firestore/GetUser'
import Logout from '../Authentication/Logout'
import { ScrollView } from 'react-native-gesture-handler'
import auth from '@react-native-firebase/auth';

export default class User extends Component{
    constructor(props){
        super(props);
        this.state = {
          user: {
            name: '',
            photoURL: '',
            email:'',
          },
          userData: ""
        }
      }

      async getProfileData(){
        const ProfileData = await GetUser(auth().currentUser.uid)
        console.log(ProfileData.data());
        this.setState({
          user: {
            name: ProfileData.data().displayName,
            email: ProfileData.data().email,
            photoURL: ProfileData.data().photoURL,
          }
        })
      }
      
      componentDidMount(){
        this.getProfileData()    
      }

      // componentWillUnmount() {
      //   if (this._asyncRequest) {
      //     this._asyncRequest.cancel();
      //   }
      // }

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
                  <Logout navigation={this.props.navigation} style={styles.logoutButton}/>
                </Card.Content>
              </Card>
               <ProfileTab/>
            </ScrollView>
          )
      }
}

// const Profile = () => {

//   return(
//     <View>
//       <Text>Profile</Text>
//     </View>
//   )
// }

// export default Profile

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
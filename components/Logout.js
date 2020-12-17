import React, { Component, useState, useEffect } from 'react';
import { View, StyleSheet  } from 'react-native';
import { Button, Paragraph, Dialog, Portal, Avatar, TouchableRipple, IconButton, TextInput, Divider, Text } from 'react-native-paper';
import auth from '@react-native-firebase/auth';

export default class Login extends Component<props>{
    constructor(props){
        super(props);
        this.state = {

        }
      }
    LogOut = () => {
        auth()
        .signOut()
        .then(() => console.log('User signed out!'));
        }
    render(){
    return(
        <View>
            <TouchableRipple style={styles.avatarParent} onPress={this.LogOut} borderless={true} rippleColor="rgba(0, 0, 0, .32)">
                <Avatar.Image style={styles.profile} size={32} source={{uri: this.props.user.photoURL}} />
                {/* <IconButton icon="logout" size={24}></IconButton> */}
            </TouchableRipple>
        </View>
    )
}
}
const styles = StyleSheet.create({
    profile:{
        alignSelf: 'center'
    },
    avatarParent:{
        borderRadius:50
    }
})
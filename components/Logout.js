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
        this.props.navigation.navigate('Home')
        auth()
        .signOut()
        .then(() => 'Logged Out');
        }
    navigateHome = () => {
        this.props.navigation
    }
    render(){
    return(
        <View style={styles.logoutButtonParent}>
            <Button style={styles.logoutButton} color="#fc1f1c" icon="logout" mode="text" onPress={this.LogOut}>
                Logout
            </Button>
        </View>
    )
}
}
const styles = StyleSheet.create({
    logoutButton:{
        justifyContent: 'center'
    },
    logoutButton:{
        marginHorizontal: 120
    }
})
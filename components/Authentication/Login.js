import React, { Component } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { Button, Paragraph, Dialog, Portal, Avatar, TouchableRipple, IconButton, TextInput, Divider, Text } from 'react-native-paper';
import auth from '@react-native-firebase/auth';
import { GoogleSignin } from '@react-native-community/google-signin';
import StoreUser from '../Firestore/StoreUser'


GoogleSignin.configure({
  webClientId: '823936420532-4ne8kstai80ctb5orvp2ovlesuef5tna.apps.googleusercontent.com',
});

async function onGoogleButtonPress() {

  GoogleSignin.signIn()
  .then((data) => {
    // Create a new Firebase credential with the token
    const credential = auth.GoogleAuthProvider.credential(data.idToken, data.accessToken);
    // Login with the credential
    return auth().signInWithCredential(credential);
  })
  .then((user)=>{
    StoreUser('google')
  })
  .catch((error) => {
    const { code, message } = error;
    // For details of error codes, see the docs
    // The message contains the default Firebase string
    // representation of the error
  });
}

export default class Login extends Component{
// const Login = () =>{
constructor(props){
  super(props);
  this.state = {
    user:'',
    initializing: '',
    visible: false,
    email: '',
    password: '',
  }
}

  createUser = () =>{
    auth()
    .signInWithEmailAndPassword(this.state.email, this.state.password)
    .then(() => {
    })
    .catch(error => {
      if (error.code === 'auth/email-already-in-use') {
      }
  
      if (error.code === 'auth/invalid-email') {
      }
  
      console.error(error);
    });
  }


  render(){
    return (  
    <View>
        <TouchableRipple borderless={true} style={styles.avatarParent} onPress={() => this.setState({ visible: true })} rippleColor="rgba(0, 0, 0, .32)">
        <IconButton icon="login" size={24}></IconButton>
      </TouchableRipple>
      <Portal>
        <Dialog visible={this.state.visible} onDismiss={ () => this.setState({ visible: false })}>
          <Dialog.Title>Login</Dialog.Title>
          <Dialog.Content>
            <TextInput onChangeText={ text => this.setState({ email: text })} label="Email" mode="outlined"></TextInput>
            <TextInput onChangeText={ text => this.setState({ password: text })} label="Password" mode="outlined"></TextInput>
            <Button style={styles.loginButton} icon="login" mode="outlined" uppercase={false} onPress={this.createUser}>Login</Button>

            <Divider style={styles.divider}></Divider>
            <Text>Not Registered yet?</Text>
            <Button style={styles.registerButton} icon="account-plus" mode="outlined" uppercase={false} onPress={() => {this.props.navigation.navigate('Register', this.props.navigation); this.setState({ visible: false })}}>Register</Button>

            <Divider style={styles.divider}></Divider>
            <Button style={styles.loginGoogle} icon="gmail" mode="outlined" uppercase={false} onPress={() => onGoogleButtonPress()}>Login with Google</Button>
            <Button style={styles.loginFacebook} icon="facebook" mode="outlined" uppercase={false} onPress={() => console.log('Pressed')}>Login with Facebook</Button>

          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={() => this.setState({ visible: false })}>Done</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </View>
  );
  }
};


// export default Login
const styles = StyleSheet.create({
    profile:{
        alignSelf: 'center'
    },
    avatarParent:{
        borderRadius:50
    },
    loginButton:{
      marginTop: Dimensions.get('window').height/50
    },
    divider:{
      marginVertical: Dimensions.get('window').height/50
    },
    loginGoogle:{
      marginBottom: Dimensions.get('window').height/100
    },
    loginFacebook:{
      marginBottom: Dimensions.get('window').height/50
    },
})
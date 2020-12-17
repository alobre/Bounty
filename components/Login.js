import React, { Component, useState, useEffect } from 'react';
import { View, StyleSheet  } from 'react-native';
import { Button, Paragraph, Dialog, Portal, Avatar, TouchableRipple, IconButton, TextInput, Divider, Text } from 'react-native-paper';
import auth from '@react-native-firebase/auth';
import { GoogleSignin } from '@react-native-community/google-signin';

// function LoginApp() {
//   // Set an initializing state whilst Firebase connects
//   const [initializing, setInitializing] = useState(true);
//   const [user, setUser] = useState();

//   // Handle user state changes
//   function onAuthStateChanged(user) {
//     setUser(user);
//     if (initializing) setInitializing(false);
//   }

//   useEffect(() => {
//     const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
//     return subscriber; // unsubscribe on unmount
//   }, []);

//   if (initializing) return null;
//   if (!user) {
//     return (
//       <View>

//       </View>
//     );
//   }

//   return (
//     <View>
//       <Text>Welcome {user.email}</Text>
//     </View>
//   );
//   // return(<View></View>)
// }

GoogleSignin.configure({
  webClientId: '823936420532-4ne8kstai80ctb5orvp2ovlesuef5tna.apps.googleusercontent.com',
});

async function onGoogleButtonPress() {
  // Get the users ID token
  const { idToken } = await GoogleSignin.signIn();

  // Create a Google credential with the token
  const googleCredential = auth.GoogleAuthProvider.credential(idToken);

  // Sign-in the user with the credential
  return auth().signInWithCredential(googleCredential);
}

export default class Login extends Component<Props>{
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
    .createUserWithEmailAndPassword(this.state.email, this.state.password)
    .then(() => {
      console.log('User account created & signed in!');
    })
    .catch(error => {
      if (error.code === 'auth/email-already-in-use') {
        console.log('That email address is already in use!');
      }
  
      if (error.code === 'auth/invalid-email') {
        console.log('That email address is invalid!');
      }
  
      console.error(error);
    });
  }

  // LogOut = () => {
  // auth()
  // .signOut()
  // .then(() => console.log('User signed out!'));
  // }
  // [visible, setVisible] = useState(false);



  render(){
  
//  const showDialog = () => this.setState({ visible: true })

//   const hideDialog = () => this.setState({ visible: false })
    return (  
    <View>
      {/* <LoginApp></LoginApp> */}
        <TouchableRipple borderless={true} style={styles.avatarParent} onPress={() => this.setState({ visible: true })} rippleColor="rgba(0, 0, 0, .32)">
        {/* <Avatar.Image style={styles.profile} size={42} source={require('../media/obama.jpg')} /> */}
        <IconButton icon="login" size={24}></IconButton>
      </TouchableRipple>
      <Portal>
        <Dialog visible={this.state.visible} onDismiss={ () => this.setState({ visible: false })}>
          <Dialog.Title>Login</Dialog.Title>
          <Dialog.Content>
            <TextInput onChangeText={ text => this.setState({ email: text })} label="Email" mode="outlined"></TextInput>
            <TextInput onChangeText={ text => this.setState({ password: text })} label="Password" mode="outlined"></TextInput>
            <Button icon="login" mode="outlined" uppercase={false} onPress={this.createUser}>Login</Button>
            <Button icon="gmail" mode="outlined" uppercase={false} onPress={() => onGoogleButtonPress().then(() => console.log('Signed in with Google!'))}>Login with Google</Button>
            <Button icon="facebook" mode="outlined" uppercase={false} onPress={() => console.log('Pressed')}>Login with Facebook</Button>
            <Divider></Divider>
            <Text>Not Registered yet?</Text>
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
    }
})
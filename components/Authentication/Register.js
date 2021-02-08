import React, { Component } from 'react';
import { StyleSheet, Dimensions, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { TextInput, Button, Dialog, Portal, Paragraph } from "react-native-paper";
import auth from '@react-native-firebase/auth';
import validate from 'validate.js'
import { constraintsRegister } from "../Validation/constraints";
import StoreUser from '../Firestore/StoreUser'

export default class Register extends Component {
    constructor(props){
        super(props)
        this.state={
            email: '',
            password: '',
            displayName: '',
            dialogVisible: false
        }
    }

    createUser(){
        auth()
        .createUserWithEmailAndPassword(this.state.email, this.state.password)
        .then((userCredential) => {
            console.log('User account created & signed in!');
            this.setState({dialogVisible: true})
            StoreUser('register', { displayName: this.state.displayName });
            userCredential.user.sendEmailVerification()
            this.Logout()
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
    
  Logout(){
    auth()
        .signOut()
        .then(() => 'Logged Out');
  }

    render() {
        return (
            <ScrollView>
                <Portal>
                <Dialog visible={this.state.dialogVisible}>
                    <Dialog.Title>Sie sind fast Fertig!</Dialog.Title>
                    <Dialog.Content>
                        <Paragraph>Sie sind nun erfolgreich Registriert!</Paragraph>
                        <Paragraph>Bitte öffnen Sie den Bestätigungslink den Sie auf Ihre Email({this.state.email}) erhalten haben!</Paragraph>
                    </Dialog.Content>
                    <Dialog.Actions>
                        <Button onPress={()=> {
                            this.setState({dialogVisible: false})
                            this.props.navigation.navigate('Home')
                            }}>Zum Login</Button>
                    </Dialog.Actions>
                </Dialog>
                </Portal>
                <TextInput onChangeText={text => this.setState(state=> {state.displayName = text})} placeholder="Benutzername"></TextInput>
                <TextInput onChangeText={text => this.setState(state=> {state.email = text})} placeholder="Email"></TextInput>
                <TextInput onChangeText={text => this.setState(state=>{state.password = text})} placeholder="Passwort"></TextInput>
                <TextInput placeholder="Passwort"></TextInput>
                <Button onPress={
                    () => {
                        this.createUser()
                    }
                }>Registrieren</Button>
            </ScrollView>
        );
    }
}
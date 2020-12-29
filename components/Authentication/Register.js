import React, { Component } from 'react';
import { StyleSheet, Dimensions, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { TextInput, Button } from "react-native-paper";
import auth from '@react-native-firebase/auth';
import validate from 'validate.js'
import { constraintsRegister } from "../Validation/constraints";

export default class Register extends Component {
    constructor(props){
        super(props)
        this.state={
            email: '',
            password: ''
        }
    }

    createUser(){
        auth()
        .createUserWithEmailAndPassword(this.state.email, this.state.password)
        .then((userCredential) => {
            console.log('User account created & signed in!');
            userCredential.user.sendEmailVerification()
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

    render() {
        return (
            <ScrollView>
                <TextInput onChangeText={text => this.setState(state=> {state.email = text})} placeholder="Email"></TextInput>
                <TextInput onChangeText={text => this.setState(state=>{state.password = text})} placeholder="Passwort"></TextInput>
                <TextInput placeholder="Passwort"></TextInput>
                <Button onPress={
                    () => {
                        // console.log(validate({email:'alobre@gmail.com', password:"passwort123"}, constraintsRegister, {format: "detailed"}));
                        // console.log(validate.contains("passwort123".split(''), RegExp("1"|"2")));
                        this.createUser()
                    }
                }>Registrieren</Button>
            </ScrollView>
        );
    }
}
import { View } from 'native-base';
import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import { Textarea, Form, Item, Input } from "native-base";
import firestore from '@react-native-firebase/firestore';
import { firebase } from '@react-native-firebase/auth';
import auth from '@react-native-firebase/auth';

function StoreTask(title, description){
    console.log(auth().currentUser.uid)
    firestore()
    .collection('tasks')
    .doc(auth().currentUser.uid)
    .set(
        {
            '1':{
                'title': title,
                'description': description
            }
        }
        )
    .then(() => {
        console.log('Task added!');
    }); 
}

export default class PostTask extends Component{
    constructor(props){
        super(props);
        this.state={
            title:'',
            description:''
        }
    }


    render(){
        return(
            <View>
                <Item>
                    <Input onChangeText={text=> this.state.title = text} placeholder="Titel" />
                </Item>
                <Form>
                    <Textarea onChangeText={text=> this.state.description = text} rowSpan={12} bordered placeholder="Beschreibung..." />
                </Form>
                <Button icon="send" mode="contained" onPress={()=> StoreTask(this.state.title, this.state.description)}>
                    Auftrag aufgeben
                </Button>
            </View>
        )
    }
}
import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import { Text, Button, TextInput } from 'react-native-paper';
import { ScrollView } from 'react-native-gesture-handler';
import auth from '@react-native-firebase/auth';
import TaskCard from './TaskCard';
import StoreTask from '../Firestore/StoreTask';
import moment from 'moment';

export default class SelectBounty extends Component{
    constructor(props){
        super(props);
        this.state={
            task:{
                "username": auth().currentUser.displayName,
                "title": this.props.route.params.title,
                "description": this.props.route.params.description,
                "tags": this.props.route.params.tags,
                "bounty": "€",
                "date": moment().format('DD.MM.YYYY'),
                "time": moment().format('HH:mm'),
                "dateAndTime": moment().format('YYYY.MM.DD HH:mm'),
                "images": this.props.route.params.images,
            },
            bounty: "5"
        }
    }


    render(){
        return(
            <ScrollView>
                <TaskCard username={auth().currentUser.displayName} title={this.props.route.params.title} category={this.props.route.params.tags} description={this.props.route.params.description} wage={this.state.task.bounty}></TaskCard>
                <TextInput onChangeText={(text) => this.setState(state => state.task.bounty = text) }></TextInput>
                <Button onPress={ () => {
                    this.setState(state => {
                        state.task.date = moment().format('DD.MM.YYYY');
                        state.task.time = moment().format('HH:mm');
                        state.task.dateAndTime = moment().format('YYYY.MM.DD HH:mm');
                    });
                    StoreTask(this.state.task)
                    } }>Submit</Button>
            </ScrollView>
        )
    }
}

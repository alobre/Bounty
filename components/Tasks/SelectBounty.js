import React, { Component } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import auth from '@react-native-firebase/auth';
import TaskCard from './TaskCard';

export default class SelectBounty extends Component{
    constructor(props){
        super(props);
        this.state={

        }
    }

    componentDidMount(){
        console.log(this.props)
    }

    render(){
        return(
            <ScrollView>
                <TaskCard username={auth().currentUser.displayName} title={this.props.route.params.title} category={this.props.route.params.tags} description={this.props.route.params.description} wage="5€"></TaskCard>
            </ScrollView>
        )
    }
}

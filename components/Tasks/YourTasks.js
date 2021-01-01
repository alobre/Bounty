import React, { Component } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { ActivityIndicator, Colors, Text } from 'react-native-paper';
import { TabView, SceneMap } from 'react-native-tab-view';
import { ScrollView } from 'react-native-gesture-handler';

import GetUserTasks from '../Firestore/GetUserTasks'


export default class YourTasks extends Component {
    constructor(props){
        super(props)
        this.state={
            tasks:{

            }
                
            
        }
    }

    render() {
        return (
            <ScrollView>
                <GetUserTasks></GetUserTasks>
            </ScrollView>
        );
    }
}
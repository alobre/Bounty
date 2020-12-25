import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, FAB, TouchableRipple, Portal } from "react-native-paper";


export default class PostTask extends Component{
    constructor(props){
        super(props);
        this.state={

        }
    }

    render(){
        return(
            // <TouchableRipple onPress={()=>this.props.navigation.push('PostTask')}>
            <Portal>
            <FAB
            style={styles.fab}
            large
            icon="plus"
            onPress={()=> this.props.navigation.push('PostTask')}
        /></Portal>
        // </TouchableRipple>
        )
    }
}

const styles = StyleSheet.create({
    fab: {
      backgroundColor: 'red',
      position: 'absolute',
      right: 10,
      bottom: 60,
    },
  })
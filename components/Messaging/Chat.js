import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import { GiftedChat } from 'react-native-gifted-chat';
 
class Chat extends Component {
    constructor(props){
        super(props)
        this.state = {
            messages:[]
        }
    }

    render() {
      return (
        <GiftedChat messages={this.state.messages} />
        )
    }
  }

  const styles = StyleSheet.create({

  });

  export default Chat;
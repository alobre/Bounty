import React, {Component} from "react";
import { TextInput } from 'react-native-paper';
import { StyleSheet, View, Card, Paragraph, Text } from "react-native"

import io from "socket.io-client"

export default class Messages extends Component{
    constructor(props){
        super(props)
        this.state = {
            chatMessage: "",
            chatMessages: []
        }
    }

    componentDidMount(){
        this.socket = io('http://192.168.178.158:3000');
        this.socket.on('chat message', msg =>{
            this.setState({chatMessages: [...this.state.chatMessages, msg]})
        })
    }

    submitChatMessage(){
        this.socket.emit('chat message', this.state.chatMessage)
        this.setState({chatMessage: ''})
    }

    render(){

        const chatMessages = this.state.chatMessages.map(chatMessage => (
            <Text key={chatMessage}>{chatMessage}</Text>
          ));

        return(
            <View style={styles.parentTextInput}>
                {chatMessages}
                <TextInput style={styles.textInput}
                value={this.state.chatMessage}
                onSubmitEditing={() => this.submitChatMessage()}
                onChangeText={chatMessage => {
                    this.setState({ chatMessage })
                }}
                >
                </TextInput>
                
            </View>
        );

    }

}
const styles = StyleSheet.create({
    parentTextInput:{
        flex: 1,
        justifyContent:"flex-end"
    },
    textInput:{
    }
}) 
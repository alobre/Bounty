import React, {Component} from "react";
import {View, Text,StyleSheet, SafeAreaView,TouchableHighlight} from "react-native";
import { Button, TextInput } from "react-native-paper";
import {connect} from "react-redux"
import {saveTaskDetails} from "../redux/Actions/saveTaskDetailAction"
import AsyncStorage from '@react-native-community/async-storage';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

class TaskDetails extends Component
{
    constructor(props)
    {
        super(props)
        this.state = {
            taskDetails: {
                taskId: '312',
                uid: '213123213',
                username: 'AloBre',
                avatar: '',
                title: 'Test',
                tags: ['alo', 'bre'],
                description: 'Testing',
                bounty: '1',
                imageURL: ''
            },
            text:''
        }
    }

    render(){

        return(
           
            <View>
                <Button
                    onPress={async() => {          
                        if(this.state.text){
                            console.log(this.state.text);
                            await AsyncStorage.setItem('token',this.state.text)   
                            this.props.reduxSaveTaskDetail(this.state.taskDetails)
                        }
                        await firestore()
                        .collection('users')
                        .doc(auth().currentUser.uid)
                        .collection('PublicUserData')
                        .doc(auth().currentUser.uid)
                        .set(
                            {
                                'uid': auth().currentUser.uid
                            }
                            )
                        .then((res) => {
                            console.log(res);
                        });
                        this.props.navigation.navigate("ShowTaskDetail")
                        }
                    }
                >
                <Text>Submit</Text>
                </Button>
                <TextInput onChangeText={( text => {
                    this.setState({text : text})
                    this.setState(state=>{state.taskDetails.title = text})
                    } )}></TextInput>
            </View>
        )
    }
}
const mapDispatchToProps = (dispatch) => 
{
    return{
     reduxSaveTaskDetail:(taskDetails) => dispatch(saveTaskDetails(taskDetails))
         
    }
}
export default connect(
    null,
      mapDispatchToProps
  )(TaskDetails); 
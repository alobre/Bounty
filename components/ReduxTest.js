import React, {Component} from "react";
import {View, Text,StyleSheet, SafeAreaView,TextInput,TouchableHighlight} from "react-native";
import { Button } from "react-native-paper";
import {connect} from "react-redux"
import {saveTaskDetails} from "../redux/Actions/saveTaskDetailAction"


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
            }
        }
    }

    render(){

        return(
           
            <View>
                <Button
                    onPress={() => {          
                            this.props.reduxSaveTaskDetail(this.state.taskDetails)
                            this.props.navigation.navigate("ShowTaskDetail")
                            }}
                >
                <Text>Submit</Text>
                </Button>
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
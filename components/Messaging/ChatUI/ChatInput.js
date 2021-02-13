import React, {useCallback, useState} from 'react';
import { StyleSheet, View, TextInput } from 'react-native';
import { Provider, Card, FAB } from 'react-native-paper';
import { Input } from 'native-base';
import { Col, Row, Grid } from "react-native-easy-grid";
import BuildMessage from '../BuildMessage';
import StoreMessage from '../../Firestore/StoreMessage'
import auth from '@react-native-firebase/auth';

export default function ChatInput({task}){
    const [messages, setMessages] = useState([]);
    let currentMessage;
    let currentInput = React.createRef();

    const onSend = (message) => {
        BuildMessage(message, buildedMessage => {
            StoreMessage(task, buildedMessage) 
        })
      }

    return(
        <Provider style={styles.provider}>
            <Card style={styles.textInputCard}>
                <Grid>
                    <Col size={80} style={styles.textInputParent}>
                    <Row>
                        <Input
                        ref={currentInput}
                        onChangeText={ message =>
                            currentMessage = message
                        }
                        // onSubmitEditing={() => {
                        //     onSend(currentMessage);
                        //     currentInput.current._root.clear()
                        // }}
                        style={styles.textInput}
                        borderRadius={100}
                        multiline
                        />
                        </Row>
                    </Col>
                    <Col style={styles.fabParent} size={20}>
                    <FAB
                    style={styles.fab}
                    small
                    icon="send"
                    onPress={() => {
                                onSend(currentMessage);
                                currentInput.current._root.clear()
                            }
                        }
                    />
                    </Col>
                </Grid>
            </Card>
        </Provider>
    )
}

const styles = StyleSheet.create({
    fabParent:{
        justifyContent: 'center',
      },
      fab: {
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: "10%",
      },
      textInputCard:{
        
        margin: "2%",
        borderRadius: 100,
        padding: "2%",
        // width: '100%',
        height: '90%'
      },
      textInputParent:{
        paddingLeft: "2%"
      },
      textInput: {
        zIndex: 1,
        borderWidth: .5,
        borderColor: 'lightgrey',
      },
    provider:{
        backgroundColor: 'transparent'
        // height:500,
        // justifyContent: 'flex-end'
    },
})
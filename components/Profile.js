import React, { Component } from 'react';
import { View, StyleSheet, Text  } from 'react-native';
import { Col, Row, Grid } from "react-native-easy-grid";
import firestore from '@react-native-firebase/firestore';

export default class User extends Component<props>{
    constructor(props){
        super(props);
        this.getUser();
        this.subscriber = firestore().collection('users').doc('lE5CQoYZdLfWJimgYQHj').onSnapshot( doc => {
          this.setState({
            user: {
              name: doc.data().name
            }
          })
        })
        this.state = {
          user: {
            name: ''
          }
        }
      }

      getUser = async () => {
        const userDocument = firestore()
      .collection('lE5CQoYZdLfWJimgYQHj')
      .get();
      console.log(userDocument)
      }

      componentDidMount(){
      }

      render(){
          return(
            <View>
                  <Grid>
                    <Col>
                    <Text>Name: {this.state.user.name}</Text>
                    </Col>
                  </Grid>
              </View>
          )
      }
}

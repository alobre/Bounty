import React from 'react';
import { StyleSheet, Dimensions } from 'react-native';
import { Text, Appbar, Avatar } from 'react-native-paper';
import { Col, Row, Grid } from "react-native-easy-grid";

const ChatConversationBar = ({avatar, username}) => {
    return(
        <Appbar style={styles.appbar}>
            {/* <Grid style={styles.grid}> */}
                {/* <Col style={styles.avatarParent}> */}
                    <Avatar.Image style={styles.avatar} size={22} source={{uri: avatar}} />
                {/* </Col> */}
                {/* <Col style={styles.usernameParent}> */}
                    <Text style={styles.username}>{username}</Text>
                {/* </Col> */}
            {/* </Grid> */}
        </Appbar>
    )
}

const styles = StyleSheet.create({
appbar:{
    // backgroundColor: "#d6b85f",
    marginTop: 0,
    elevation: 10,
    shadowOffset:{
        width:10,
        height:10
    },
    shadowOpacity: 1,
    shadowColor: 'black',
    shadowRadius: 100,
    height: Dimensions.get('window').height * 0.05,
    width:'55%',
    borderBottomLeftRadius: 100,
    borderBottomRightRadius: 100,
    alignSelf:'center',
    justifyContent:'center',
},
grid:{
},
avatarParent:{
    // width:'100%',
    // justifyContent:'center',
    // alignContent:'flex-end'
},
avatar:{
    // justifyContent:'flex-end',
},
usernameParent:{
    justifyContent:'center',
},
username:{
    // alignSelf:'center',
    marginLeft: 10,
    color: 'white',
    fontSize: 18
}
})

export default ChatConversationBar;
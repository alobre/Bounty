import React from 'react';
import { StyleSheet } from 'react-native';
import { Text, Appbar, Avatar } from 'react-native-paper';
import { Col, Row, Grid } from "react-native-easy-grid";

const ChatConversationBar = ({avatar, username}) => {
    return(
        <Appbar style={styles.appbar}>
            {/* <Grid style={styles.grid}> */}
                {/* <Col style={styles.avatarParent}> */}
                    <Avatar.Image style={styles.avatar} size={32} source={{uri: avatar}} />
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
    shadowOffset:{
        width:0,
        height:0
    },
    shadowRadius: 0,
    height: '7%',
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
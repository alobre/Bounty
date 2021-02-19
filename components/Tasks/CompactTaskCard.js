import React from 'react';
import { StyleSheet, TouchableNativeFeedback, View, Dimensions, PixelRatio } from 'react-native';
import { Card, Avatar, Text, Container, PaperProvider, Provider, Dialog, Chip, TouchableRipple, Badge, Subheading, Paragraph, Divider, Button } from 'react-native-paper';
import { Col, Row, Grid } from "react-native-easy-grid";
import ImageGallery from './ImageGallery'

const CompactTaskCard = ({title, description, images, bounty, navigation, uid, photoURL, displayName}) => {

    return(
        <Card>
            <Card.Title title={title}/>
            <Card.Content>

            <TouchableRipple onPress={()=>{navigation.navigate('UserProfile', {navigation: navigation, uid: uid})}}>
            <View style={styles.profile}>
                <Avatar.Image size={24} source={{uri: photoURL}} />
                <Subheading style={styles.username}>{displayName}</Subheading>
            </View>
        </TouchableRipple>
            <Paragraph>{description}</Paragraph>
            <Divider/>
            <ImageGallery items={images}></ImageGallery> 
            <Divider/>
            <View style={styles.priceParent}>
            <Badge size={40} style={styles.price}>
                {bounty}
            </Badge>
            </View>
            </Card.Content>
        </Card>
    )
}

const styles = StyleSheet.create({
    partnerMsgParent:{
        flexDirection: 'row',
        margin: 5
    },
    partnerMsgCard:{
        marginLeft: 3,
        padding: 5,
        borderRadius: 10
    },
    yourMsgParent:{
        justifyContent: 'flex-end',
        flexDirection: 'row',
        margin: 5
    },
    yourMsgCard:{
        maxWidth: Dimensions.get('window').width / 1.4,
        marginRight: 3,
        padding: 5,
        borderRadius: 10
    },
    time:{
        alignSelf: 'flex-end'
    },
    card:{
        margin: 6
      },
      colMoreButton:{
        justifyContent: 'flex-start',
        alignContent: "center"
      },
      moreButton:{
        borderRadius: 30,
        alignContent: 'center',
        alignSelf: 'flex-end'
      },
      title:{
        fontSize: 20,
      },
      tagParent:{
        // paddingLeft: 10
        // height: 10
        display: "flex",
        flexWrap: "wrap",
        flexDirection: "row"
      },
      tag:{
        
      },
      profile:{
        flexDirection: "row",
        paddingVertical: 10
      },
      username:{
        paddingLeft: 3,
        color: "#0a90c9"
      },
      buttonParent:{
        justifyContent: "flex-end"
      },
      priceAndContact:{
        flexDirection: "row"
      },
      priceParent:{
        // flex:1
      },
      price:{
        backgroundColor: "#eddd2d",
        borderColor: '#968b0f',
        borderWidth: 1,
        margin: 10,
        alignSelf: "flex-start"
      },

      dialog:{
        zIndex: 1,
      },
    })

export default CompactTaskCard
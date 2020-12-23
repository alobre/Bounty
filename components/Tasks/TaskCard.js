import React from 'react';
import {StyleSheet, View} from 'react-native'
import globalStyles from '../GlobalComponents/GlobalStyles.js'
import { Avatar, Button, Card, Title, Paragraph, Text, Subheading, Divider, TouchableRipple, Badge, IconButton, Menu } from 'react-native-paper';
import { Col, Row, Grid } from "react-native-easy-grid";

// import { Left, Thumbnail, Container, Header, Text, Content, Card, CardItem, Body } from 'native-base';
const MORE_ICON = Platform.OS === 'ios' ? 'dots-horizontal' : 'dots-vertical';


const TaskCard = ({username, title, category, description, wage}) =>{

  const [visible, setVisible] = React.useState(false);

  const openMenu = () => setVisible(true);

  const closeMenu = () => setVisible(false);

  return (
    <Card style={styles.card} elevation={4}>
    <Grid>
    <Col>
      <Card.Title title={title} subtitle={category}/>
    </Col>
    <Col style={styles.colMoreButton}>
        <Menu
          visible={visible}
          onDismiss={closeMenu}
          anchor={<IconButton style={styles.moreButton} icon={MORE_ICON} size={20} onPress={openMenu}></IconButton>}>
          <Menu.Item icon="alert-octagon" onPress={() => {}} title="Report Task" /></Menu>
    </Col>
    </Grid>
    <Card.Content>
      <TouchableRipple onPress={()=> console.log('Profile')}>
        <View style={styles.profile}>
          <Avatar.Image size={24} source={require('../../media/obama.jpg')} />
          <Subheading style={styles.username}>{username}</Subheading>
        </View>
      </TouchableRipple>
      <Divider/>
      <Paragraph style={globalStyles.fontSerif}>{description}</Paragraph>
    </Card.Content>
    <Card.Cover source={{ uri: 'https://picsum.photos/700' }} />
    <View style={styles.priceAndContact}>
      <View style={styles.priceParent}>
        <Badge size={40} style={styles.price}>
          {wage}
        </Badge>
      </View>
    <TouchableRipple rippleColor="rgba(0, 0, 0, .32)">
      <Card.Actions style={styles.buttonParent}>
        <Button style={styles.contactContractor} onPress={() => console.log('Auftraggeber Kontaktieren')}>Auftraggeber kontaktieren</Button>
      </Card.Actions>
    </TouchableRipple>
    </View>
  </Card>
    );
  }

  const styles = StyleSheet.create({
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
      flex: 3,
      paddingBottom:0
    },
    profile:{
      flexDirection: "row",
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
      flex:1
    },
    price:{
      backgroundColor: "#eddd2d",
      borderColor: '#968b0f',
      borderWidth: 1,
      margin: 10,
      alignSelf: "flex-start"
    },
    contactContractor:{
    }
  })

export default TaskCard;
import * as React from 'react';
import { View, StyleSheet  } from 'react-native';
import { Button, Paragraph, Dialog, Portal, Avatar, TouchableRipple } from 'react-native-paper';

const MyComponent = () => {
  const [visible, setVisible] = React.useState(false);

  const showDialog = () => setVisible(true);

  const hideDialog = () => setVisible(false);

  return (  
    <View>
        <TouchableRipple borderless={true} style={styles.avatarParent} onPress={showDialog} rippleColor="rgba(0, 0, 0, .32)">
      <Avatar.Image style={styles.profile} size={42} source={require('../media/obama.jpg')} />
      </TouchableRipple>
      <Portal>
        <Dialog visible={visible} onDismiss={hideDialog}>
          <Dialog.Title>Alert</Dialog.Title>
          <Dialog.Content>
            <Paragraph>This is simple dialog</Paragraph>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={hideDialog}>Done</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </View>
  );
};

const styles = StyleSheet.create({
    profile:{
        alignSelf: 'center'
    },
    avatarParent:{
        borderRadius:50
    }
})

export default MyComponent;
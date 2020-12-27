import { View } from 'native-base';
import React, { Component, setState } from 'react';
import { StyleSheet } from 'react-native';
import { TextInput, Button, Chip, Text, Snackbar } from 'react-native-paper';
import { Textarea, Form, Item, Input } from "native-base";
import firestore from '@react-native-firebase/firestore';
import { firebase } from '@react-native-firebase/auth';
import auth from '@react-native-firebase/auth';

function StoreTask(title, description, tags){
    console.log(auth().currentUser.uid)
    firestore()
    .collection('tasks')
    .doc(auth().currentUser.uid)
    .set(
        {
            '1':{
                'title': title,
                'description': description,
                'tags': tags
            }
        }
        )
    .then(() => {
        console.log('Task added!');
    }); 
}



export default class PostTask extends Component{
    constructor(props){
        super(props);
        this.addTagToTags = this.addTagToTags.bind(this)
        this.removeTagFromTags = this.removeTagFromTags.bind(this)
        this.state={
            title:'',
            description:'',
            currentTag: '',
            tags:[],
            chipWarning: false
        }
    }

    addTagToTags(tag){
        if(this.state.tags.length < 3){
            this.setState({tags: [...this.state.tags, tag]})
        } else {
            this.toggleChipWarning()
        }
        
    }
    removeTagFromTags(tag){
        let newList = this.state.tags.filter(el => el != tag)
        this.setState({tags: newList})
    }

    toggleChipWarning = () => this.setState({chipWarning: true});

    dismissChipWarning = () => this.setState({chipWarning: false});

    render(){
        return(
            <View>
                <Item>
                    <Input onChangeText={text=> this.state.title = text} placeholder="Titel" />
                </Item>
                <Form>
                    <Textarea onChangeText={text=> this.state.description = text} rowSpan={12} bordered placeholder="Beschreibung..." />
                </Form>
                <View style={styles.tagParent}>
                    <Button onPress={()=> console.log(this.state.tags)}>press</Button>
                    {this.state.tags.map(tag => <Chip key={tag}  onClose={ ()=> this.removeTagFromTags(tag) } closeIconAccessibilityLabel="close" mode="outlined">{tag}</Chip>)}
                    <Snackbar
                    visible={this.state.chipWarning}
                    onDismiss={this.dismissChipWarning}
                    action={{
                    label: 'Ok',
                    }}>
                    Es sind leider nur maximal 3 Schlagwörter erla  ubt.
                </Snackbar>
                </View>
                <Item>
                    <Input onChangeText={text=> this.state.currentTag = text} onSubmitEditing={ ()=> this.addTagToTags(this.state.currentTag)} placeholder="Schlagwörter" />
                </Item>
                <Button icon="send" mode="contained" onPress={()=> StoreTask(this.state.title, this.state.description, this.state.tags)}>
                    Auftrag aufgeben
                </Button>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    tagParent:{
        justifyContent: 'flex-start',
        flexDirection: 'row',
    },
    tag:{
        // width: this.state.chipWidth
    }
})
import { View } from 'native-base';
import React, { Component, setState } from 'react';
import { StyleSheet } from 'react-native';
import { TextInput, Button, Chip, Text, Snackbar } from 'react-native-paper';
import { Textarea, Form, Item, Input, Toast } from "native-base";
import StoreTask from '../Firestore/StoreTask';

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
            chipWarning: false,
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
                    {this.state.tags.map(tag => <Chip key={tag}  onClose={ ()=> this.removeTagFromTags(tag) } closeIconAccessibilityLabel="close" mode="outlined">{tag}</Chip>)}
                    <Snackbar
                    visible={this.state.chipWarning}
                    onDismiss={this.dismissChipWarning}
                    action={{
                    onPress:() => console.log('Ok'),
                    label: 'Ok',
                    }}>
                    Es sind leider nur maximal 3 Schlagwörter erlaubt.
                </Snackbar>
                </View>
                <Item>
                    <Input onChangeText={text=> this.state.currentTag = text} onSubmitEditing={ ()=> this.addTagToTags(this.state.currentTag)} placeholder="Schlagwörter" />
                </Item>
                <Button icon="send" mode="contained" onPress={()=> 
                this.props.navigation.push('SelectBounty', { "title": this.state.title , "description": this.state.description, "tags": this.state.tags })
                }>
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
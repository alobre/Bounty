import { View } from 'native-base';
import React, { Component, setState } from 'react';
import { StyleSheet, Dimensions } from 'react-native';
import { TextInput, Button, Chip, Text, Snackbar, HelperText } from 'react-native-paper';
import { Textarea, Form, Item, Input } from "native-base"; 
import ImagePicker from 'react-native-image-crop-picker';
import Toast from 'react-native-tiny-toast'
import StoreTask from '../Firestore/StoreTask';
import storage from '@react-native-firebase/storage';
import auth from '@react-native-firebase/auth';
import validate from 'validate.js'
import { constraintsTask } from '../Validation/constraints'

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
            titleError: true,
            tagsError: true,
            chipWarning: false,
            errorMsg: {
                title: "",
                tags: ""
            },
            images: []
        }
    }

    addTagToTags(tag){
        if(this.state.tags.length < 3){
            this.setState({tags: [...this.state.tags, tag]})
        } else {
            this.toggleChipWarning()
        }
        
    }

    addPhoto(){
        ImagePicker.openPicker({
            multiple: true
        }).then(images => {
        // for (let i = 0; i < images.length; i++) {
        //     const image = images[i];
        //     console.log(image);
        //     let ref = storage().ref('/tasks/' + auth().currentUser.uid + '/123321/' + i + '-TaskImage.jpg' )
        //     let task = ref.putFile(image.path)
        //     task.on('state_changed', taskSnapshot => {
        //         console.log(`${taskSnapshot.bytesTransferred} transferred out of ${taskSnapshot.totalBytes}`);
        //     });
            
        //     task.then(() => {
        //         console.log('Image uploaded to the bucket!');
        //     });
        // }
            this.setState({images: images})
        });
    }

    removeTagFromTags(tag){
        let newList = this.state.tags.filter(el => el != tag)
        this.setState({tags: newList})
    }

    validateTitleAndTags(){
        return validate({"title": this.state.title, "tags": this.state.tags}, constraintsTask, {format: "detailed"})
    }
    async proceedOrError(){
        let Validation = await this.validateTitleAndTags()
        if(Validation == undefined){
            this.props.navigation.navigate('SelectBounty', { "title": this.state.title , "description": this.state.description, "tags": this.state.tags, "images": this.state.images })
        } else {
            Validation.filter(err => {
                this.setState(state=>{
                    let attr = err.attribute
                    if(attr == 'title') {
                        state.errorMsg.title = err.error
                        this.titleError()
                    }
                    if(attr == 'tags') {
                        state.errorMsg.tags = err.error
                        this.tagsError()
                    }
                })
            })
        
        }
    }


    titleError = () =>  this.setState({titleError: true});

    tagsError = () =>  this.setState({titleError: true});

    toggleChipWarning = () => this.setState({chipWarning: true});

    dismissChipWarning = () => this.setState({chipWarning: false});

    render(){
        return(
            <View>
                
                {/* <Text> {this.state.errorMsg.title}</Text> */}
                
                <Item>                
                    <TextInput style={styles.titleInput} onChangeText={text=> this.state.title = text} placeholder="Titel" />  
                </Item>
                <HelperText type="error" visible={this.state.titleError}>
                        {this.state.errorMsg.title}
                </HelperText>
                <Form>
                    <TextInput multiline numberOfLines={12} onChangeText={text=> this.state.description = text} placeholder="Beschreibung..." />
                </Form>
                <View style={styles.tagParent}>
                <HelperText type="error" visible={this.state.tagsError}>
                        {this.state.errorMsg.tags}
                </HelperText>
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
                <Button onPress={()=> this.addPhoto()}>Pictures</Button>
                <Button icon="send" mode="contained" onPress={()=>  this.proceedOrError()}>
                    Weiter
                </Button>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    titleInput:{
        width: Dimensions.get('window').width
    },
    tagParent:{
        justifyContent: 'flex-start',
        flexDirection: 'row',
    },
    tag:{
        // width: this.state.chipWidth
    }
})
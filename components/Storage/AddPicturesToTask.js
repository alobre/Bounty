import React, { Component } from 'react';
import storage from '@react-native-firebase/storage';
import auth from '@react-native-firebase/auth';

function AddPicturesToTask(images, callback){
    let allImagesPath = []
    for (let i = 0; i < images.length; i++) {
        const image = images[i];
        // console.log(image);
        let imageName = i + '-TaskImage.jpg'
        let ref = storage().ref('/tasks/' + auth().currentUser.uid + '/123321/' + imageName )
        let task = ref.putFile(image.path)
        task.on('state_changed', taskSnapshot => {
            // console.log(`${taskSnapshot.bytesTransferred} transferred out of ${taskSnapshot.totalBytes}`);
            // console.log(taskSnapshot);
        });
        
        task.then((image) => {
            // console.log('Image uploaded to the bucket!');
            allImagesPath.push(
                imageName = image.metadata
            )
            if(allImagesPath.length == i){
                callback(allImagesPath)
            }
        });
    }
}

export default AddPicturesToTask
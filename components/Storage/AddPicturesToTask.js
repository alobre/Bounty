import React, { Component } from 'react';
import storage from '@react-native-firebase/storage';
import auth from '@react-native-firebase/auth';

function AddPicturesToTask(images, taskId,callback){
    let allImagesPath = []
    for (let i = 0; i < images.length; i++) {
        const image = images[i];
        let imageName = i + '-TaskImage.jpg'
        let ref = storage().ref('/tasks/' + auth().currentUser.uid + '/' + taskId + '/' + imageName )
        let task = ref.putFile(image.path)
        task.on('state_changed', taskSnapshot => {
        });
        
        task.then(async(image) => {
            let downloadUrl = await storage().ref(image.metadata.fullPath).getDownloadURL()
            allImagesPath.push(
                {url : downloadUrl}
            )
            if(images.length - 1 == i){
                callback(allImagesPath)
            }
        });
    }
}

export default AddPicturesToTask
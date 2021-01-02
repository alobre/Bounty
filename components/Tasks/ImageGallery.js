import React, { Component, useState } from 'react';
import { Modal, FlatList, View, Dimensions, Image, StyleSheet, Text } from 'react-native';
import { TouchableRipple } from "react-native-paper";
import ReactNativeZoomableView from '@dudigital/react-native-zoomable-view/src/ReactNativeZoomableView';

function logOutZoomState(event, gestureState, zoomableViewEventObject){
    console.log('');
    console.log('');
    console.log('-------------');
    console.log('Event: ', event);
    console.log('GestureState: ', gestureState);
    console.log('ZoomableEventObject: ', zoomableViewEventObject);
    console.log('');
    console.log(`Zoomed from ${zoomableViewEventObject.lastZoomLevel} to  ${zoomableViewEventObject.zoomLevel}`);
  }

const ImageGallery = ({items}) => {

    const [modal, setModal] = useState(null)
    return(
        <View>
            <FlatList
                data={items}
                renderItem={({item, index}) =>{
                    return(
                    <TouchableRipple rippleColor="rgba(0, 0, 0, .32)" borderless={true} onPress={()=>setModal(index)}>
                        <Image source={{uri: item.url}} style={styles.image}/>
                    </TouchableRipple>
                    )
                    }
                }
                horizontal
                keyExtractor={item => item.url}
                style={styles.imageContainer}
            />
            <Modal visible={modal !== null} animated>
                {/* <View style={styles.zoomWrapper}> */}
                    <ReactNativeZoomableView
                zoomEnabled={true}
                maxZoom={2.0}
                minZoom={1.0}
                zoomStep={0.5}
                initialZoom={1}
                bindToBorders={true}
                onZoomAfter={logOutZoomState}
                zoomEnabled={true}
                style={styles.zoomedImageParent}
                captureEvent={true}
                >
                    <Image
                    source={modal !== null ? {uri: items[modal].url} : null }
                    style={styles.zoomedImage}
                    resizeMode="contain"
                    />
                </ReactNativeZoomableView>
                {/* </View> */}
                
                    
            </Modal>
        </View>
    )
}

const styles = StyleSheet.create({
    image:{
        height: 100,
        width: 100
    },
    imageContainer:{

    },
    zoomedImageParent:{
        backgroundColor: 'black'
    },
    zoomedImage:{
        // height: Dimensions.get('window').width,
        // width: Dimensions.get('window').width
        flex: 1, width: null, height: '100%'
    },
    zoomWrapper:{
        flex: 1,
        overflow: 'hidden',
    }

})

export default ImageGallery;
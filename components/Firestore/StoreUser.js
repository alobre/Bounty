import React, { Component } from 'react';
import { View, StyleSheet  } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import { InputGroup } from 'native-base';
//Redux
import {connect} from "react-redux"


export default function StoreUser(signInMethod, userProps){
    if(signInMethod == 'register'){
      let user = auth().currentUser
      // firestore()
      // .collection('users')
      // .doc(user.uid)
      // .add(
      //   {
      //       'displayName': userProps.displayName,
      //       'email': user.email,
      //       'emailVeryfied': user.emailVeryfied,
      //       'phoneNumber': user.phoneNumber,
      //       'photoURL': user.photoURL,
      //       'uid': user.uid

      //   }
      //   )
      // .then(() => {
      // });
      firestore()
      .collection('users')
      .doc(user.uid)
      .collection('PrivateUserData')
      .doc(user.uid)
      .set(
        {
            'displayName': userProps.displayName,
            'email': user.email,
            'emailVeryfied': user.emailVeryfied,
            'phoneNumber': user.phoneNumber,
            'photoURL': user.photoURL,
            'uid': user.uid

        }
        )
      .then(() => {
        console.log('PrivateUserData added!');
      });
      firestore()
      .collection('users')
      .doc(user.uid)
      .collection('PublicUserData')
      .doc(user.uid)
      .set(
        {
            'displayName': user.displayName,
            'photoURL': user.photoURL,
            'uid': user.uid

        }
        )
      .then(() => {
        console.log('PublicUserData added!');
      });  
    }
    if(signInMethod == 'google'){
      console.log("storing google");
       let user = auth().currentUser
      //  this.props.reduxSaveTaskDetail(
      //   {
      //     'username': user.displayName,
      //     'email': user.email,
      //     'photoURL': user.photoURL,
      //     'uid': user.uid,
      //     'interestedIn': []
      //   }
      // )
      firestore()
      .collection('users')
      .doc(auth().currentUser.uid)
      .collection('PrivateUserData')
      .doc(user.uid)
      .set(
        {
            'displayName': user.displayName,
            'email': user.email,
            'emailVeryfied': user.emailVeryfied,
            'phoneNumber': user.phoneNumber,
            'photoURL': user.photoURL,
            'uid': user.uid

        }
        )
      .then(() => {
        console.log('PrivateUserData added!');
      });
      firestore()
      .collection('users')
      .doc(user.uid)
      .collection('PublicUserData')
      .doc(user.uid)
      .set(
        {
            'displayName': user.displayName,
            'photoURL': user.photoURL,
            'uid': user.uid

        }
        )
      .then(() => {
        console.log('PublicUserData added!');
      }); 
    }
}

// const mapDispatchToProps = (dispatch) => 
// {
//     return{
//      reduxSaveUserDetail:(userDetails) => dispatch(saveUserDetails(userDetails))
         
//     }
// }
// export default connect(
//     null,
//       mapDispatchToProps
//   )(StoreUser); 
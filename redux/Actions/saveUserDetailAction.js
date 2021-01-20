export const saveUserDetails = (userDetails) =>(
    {
        type:"SAVE_USER_DETAIL",
        userDetails:{
            uid: userDetails.uid,
            username: userDetails.username,
            email: userDetails.email,
            imageURL: userDetails.imageURL,
            tags: userDetails.tags
        }
    });
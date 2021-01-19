import React from "react";
import {View, Text,SafeAreaView,StyleSheet} from "react-native";
import {connect} from "react-redux";
import AsyncStorage from '@react-native-community/async-storage';

class ShowUserDetail extends React.Component{

    async componentDidMount(){
        console.log(this.props.userDetails);
    }
render()
{
    return(
<SafeAreaView>
        {/* <Text>Title: {this.props.taskDetails.title}</Text> */}
</SafeAreaView>
    )
}
}

const mapStateToProps = (state) => {
    return{
    //   taskDetails: state.taskDetailReducer.taskDetails,
      userDetails: state.userDetailReducer.userDetails
    }
  }
  
  export default connect(mapStateToProps,null)(ShowUserDetail)
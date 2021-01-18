import React from "react";
import {View, Text,SafeAreaView,StyleSheet} from "react-native";
import {connect} from "react-redux";

class ShowTaskDetail extends React.Component{

    componentDidMount(){
        console.log(this.props.taskDetails);
    }
render()
{
    return(
<SafeAreaView>

</SafeAreaView>
    )
}
}

const mapStateToProps = (state) => {
    return{
      taskDetails: state.taskDetailReducer.taskDetails
    }
  }
  
  export default connect(mapStateToProps,null)(ShowTaskDetail)
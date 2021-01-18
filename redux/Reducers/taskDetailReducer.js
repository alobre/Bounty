const initialState = {
    taskDetails: {
        taskId: '',
        uid: '',
        username: '',
        avatar: '',
        title: '',
        tags: [],
        description: '',
        bounty: '',
        imageURL: ''
    }
};
const taskDetailReducer = (state = initialState , action) => {
    switch(action.type){
        case "SAVE_EMPLOYEE_DETAIL" :{
            return{
            ...state,
            employeeDetails : action.employeeDetails
            }
        }
        default:{
            return state;
        }
    }
}
export default taskDetailReducer;
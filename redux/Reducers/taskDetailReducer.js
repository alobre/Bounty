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
        case "SAVE_TASK_DETAIL" :{
            return{
            ...state,
            taskDetails : action.taskDetails
            }
        }
        default:{
            return state;
        }
    }
}
export default taskDetailReducer;
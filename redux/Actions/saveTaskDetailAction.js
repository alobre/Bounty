export const saveTaskDetails = (taskDetails) =>(
{
    type:"SAVE_TASK_DETAIL",
    taskDetails:{
        taskId: taskDetails.TaskId,
        uid: taskDetails.uid,
        username: taskDetails.username,
        avatar: taskDetails.avatar,
        title: taskDetails.title,
        tags: taskDetails.tags,
        description: taskDetails.description,
        bounty: taskDetails.bounty,
        imageURL: taskDetails.imageURL
    }
});
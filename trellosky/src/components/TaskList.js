import React from "react";
import Task from "./Task";

const TaskList = ({tasks, onEdit}) => {

    const renderTaskList = () => {
        return tasks.map((task) => {
            return <Task task={task} key={task.id} onEdit = {onEdit}/>
        })
    }
    return(
        <>
            {renderTaskList()}
        </>
    );
}

export default TaskList;
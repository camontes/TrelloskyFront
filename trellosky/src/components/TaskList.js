import React from "react";
import Task from "./Task";

const TaskList = ({tasks}) => {

    const renderTaskList = () => {
        return tasks.map((task) => {
            return <Task task={task} key={task.id}/>
        })
    }
    return(
        <>
            {renderTaskList()}
        </>
    );
}

export default TaskList;
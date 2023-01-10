import React from "react";

const TaskCreate = ({type}) => {

    console.log(type);
    return (
        <input type="text" className="form-control" placeholder="Enter a task"/>
    );
}

export default TaskCreate;
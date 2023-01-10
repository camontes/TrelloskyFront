import React from "react";

const Task = ({task}) => {
    return (
        <>
            {task.description}
            <hr></hr>
        </>
    );
}

export default Task;
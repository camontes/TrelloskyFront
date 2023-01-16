import {useState} from "react";
import TaskEdit from "./TaskEdit";
import { BsXCircleFill, BsFillChatSquareTextFill, BsFillArrowLeftCircleFill, BsFillArrowRightCircleFill } from 'react-icons/bs';
import  '../trellosky.css'
import { toDo, inProgress, finished, next, prev } from "../utils/typeTasks";
const Task = ({task, onEdit, onDelete, onHandleClick}) => {
    const [isEditing, setisEditing] = useState(false);


    const handleClick = (action) => {
        onHandleClick(task.id, action, task.typeTaskId);
    } 

    const handleSubmitEdit = (task, description) => {
        onEdit(task, description);
        setisEditing(false);
    }

    const renderIconsLeft = () => {
        if(task.typeTaskId === inProgress || task.typeTaskId === finished){
            return <BsFillArrowLeftCircleFill onClick={() => handleClick(prev)} className="iconsNextPrev"/>
        }
    }

    const renderIconsRight = () => {
        if(task.typeTaskId === toDo || task.typeTaskId === inProgress){
            return <BsFillArrowRightCircleFill onClick={() => handleClick(next)} className="iconsNextPrev"/>
        }
    }
    const renderTask = () => {
        if(isEditing){
            return <TaskEdit task={task} onhandleSubmitEdit={handleSubmitEdit}/>
        }
        else{
            return(
                <>
                    <div style={{float:'right'}}>
                        <BsXCircleFill className="iconsDU" onClick={() => onDelete(task.id)}/>
                        <BsFillChatSquareTextFill className="iconsDU" onClick={() => setisEditing(true)}/>
                    </div>
                    <div>
                        {task.description}
                    </div>
                    <div className="row d-flex justify-content-center" style={{width: '100%'}}>
                        <div className="col-4">
                            {renderIconsLeft()}
                        </div>
                        <div className="col-4">
                            {renderIconsRight()}
                        </div>
                    </div>

                </>
            );
        }
    }
    return (
        <>
            {renderTask()}
            <hr></hr>
        </>
    );
}

export default Task;
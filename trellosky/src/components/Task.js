import {useState} from "react";
import TaskEdit from "./TaskEdit";
import { BsXCircleFill, BsFillChatSquareTextFill } from 'react-icons/bs';
import  '../trellosky.css'

const Task = ({task, onEdit}) => {
    const [isEditing, setisEditing] = useState(false);


    const handleSubmitEdit = (task, description) => {
        onEdit(task, description);
        setisEditing(false);
    }

    const renderTask = () => {
        if(isEditing){
            return <TaskEdit task={task} onhandleSubmitEdit={handleSubmitEdit}/>
        }
        else{
            return(
                <>
                    <div style={{float:'right'}}>
                        <BsXCircleFill className="iconsDU"/>
                        <BsFillChatSquareTextFill className="iconsDU" onClick={() => setisEditing(true)}/>
                    </div>
                    <div>
                        {task.description}
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
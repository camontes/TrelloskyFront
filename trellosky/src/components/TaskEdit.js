import { useState } from "react";


const TaskEdit = ({task, onhandleSubmitEdit}) => {
    const[description,setDescription] = useState(task.description);

    const  handleSubmitEdit = () => {
        onhandleSubmitEdit(task, description);
    }

    return(
        <>
            <form onSubmit={handleSubmitEdit}>
                <input type={'text'}  value={description} className="form-control" onChange={(e) => setDescription(e.target.value)}/>
            </form>
        </>
    );
}

export default TaskEdit;
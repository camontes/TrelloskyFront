import { useState } from "react";

const TaskCreate = ({type, onCrete}) => {

    const[term, setTerm] = useState('');

    const handleSubmit = (e) =>{
        e.preventDefault();
        onCrete(term, type);
        setTerm('');

    }
    return (
        <>
        <form onSubmit={handleSubmit}>
        <input type="text" value={term} className="form-control" placeholder="Enter a task" onChange={(e) => setTerm(e.target.value)}/>
        </form>
        </>
    );
}

export default TaskCreate;
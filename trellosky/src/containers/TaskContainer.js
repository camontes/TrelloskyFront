import {useEffect, useState} from "react";
import trello from '../apis/trello.js'
import TaskList from "../components/TaskList";
import { typeTasks } from "../utils/typeTasks.js";
import TaskCreate from "../components/TaskCreate.js";
import { Card, CardText, CardFooter,CardHeader,CardBody} from "reactstrap";

const TaskContainer = () => {

    const [tasks, setTasks] = useState([]);

    useEffect(() => {

        const fetchTasks = async() =>{
            const data = await trello.get(`/GetAll`);
            setTasks(data.data);
        }

        fetchTasks();
    },[])

    const randomNumer = () => {
        return Math.floor(Math.random() * 255);
    }
    const getTasksFromType = (type) => {

        const tasksFilter = tasks.filter(x => x.typeTaskId === type)

        return tasksFilter;
    }

    const renderTaskList = typeTasks.map((type) => {
        return(
            <div className="col-md-3 col-s-4 col-xs-8" key={type.Id}>
                <Card>
                    <CardHeader style={{backgroundColor:`rgb(${randomNumer()}, ${randomNumer()}, ${randomNumer()})`,color:'white'}}>
                        {type.Description}
                    </CardHeader>
                    <CardBody>
                        <CardText>
                            <TaskList tasks = {getTasksFromType(type.Id)}/>
                        </CardText>
                    </CardBody>
                    <CardFooter style={{backgroundColor:`rgb(${randomNumer()}, ${randomNumer()}, ${randomNumer()})`}}>
                        <TaskCreate type = {type.Id}/>
                    </CardFooter>
                </Card>
            </div>
        );
    })
    return (
        <div className="row">
            {renderTaskList}
        </div>
    );
}

export default TaskContainer;
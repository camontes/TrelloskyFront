import {useEffect, useState} from "react";
import trello from '../apis/trello.js'
import TaskList from "../components/TaskList";
import { typeTasks } from "../utils/typeTasks.js";
import TaskCreate from "../components/TaskCreate.js";
import { Card, CardText, CardFooter,CardHeader,CardBody} from "reactstrap";
import Swal from 'sweetalert2'
import { next} from "../utils/typeTasks.js";

const TaskContainer = () => {

    const [tasks, setTasks] = useState([]);

    useEffect(() => {

        const fetchTasks = async() =>{
            const data = await trello.get(`/GetAll`);
            setTasks(data.data);
        }

        fetchTasks();
    },[])

    const randomNumber = () => {
        return Math.floor(Math.random() * 255);
    }

    const getTasksFromType = (type) => {

        const tasksFilter = tasks.filter(x => x.typeTaskId === type)

        return tasksFilter;
    }

    const handleClickChangeTypeTask = (id, action, typeTask) => {

        const newTypeTask = action === next? (typeTask + 1) : (typeTask - 1);
        
        const updatedTasks = tasks.map((task) => {

            if(task.id === id){
                return {...task, typeTaskId: newTypeTask}
            }

            return task;
        });

        setTasks(updatedTasks);
    }

    const handleSubmit = (description, type) => {

        const createTask = async() => {
            const newTask = {id:0, description:description, typeTaskId:type}

            const newTaskBack = await trello.post('/CreateTask',{...newTask});

            const tasksCreted = [
                ...tasks,
                newTaskBack.data
            ];

            setTasks(tasksCreted);
        }

        createTask();
    }

    const editTaskById = (task, description) => {
        const editedTask = {id:task.id, description:description, typeTaskId: task.typeTaskId};

        const editTask = async() => {
            const editedTaskBack = await trello.put('/UpdateTask',{...editedTask});

            const editedTasks = tasks.map(t => {
                if(t.id === task.id){
                    return {...t, ...editedTaskBack.data}
                }

                return t;
            });

            setTasks(editedTasks);
        }
        editTask();
    }

    const deleteTaskById = (id) =>{

        const deleteTask = async() => {

            const swalWithBootstrapButtons = Swal.mixin({
                customClass: {
                  confirmButton: 'btn btn-success',
                  cancelButton: 'btn btn-danger'
                },
                buttonsStyling: false
              })
              
              swalWithBootstrapButtons.fire({
                title: 'Are you sure?',
                text: "You won't be able to revert this!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonText: 'Yes, delete it!',
                cancelButtonText: 'No, cancel!',
                reverseButtons: true
              }).then(async(result) => {
                if (result.isConfirmed) {
                    const idTaskBack = await trello.delete(`/DeleteTask/${id}`);
                    const tasksUpdated = tasks.filter(x => x.id !== idTaskBack.data);

                    setTasks(tasksUpdated);
                }
              })
        }

        deleteTask();

    }

    const renderTaskList = typeTasks.map((type) => {
        return(
            <div className="col-md-3 col-s-4 col-xs-8" key={type.Id}>
                <Card>
                    <CardHeader style={{backgroundColor:`rgb(${randomNumber()}, ${randomNumber()}, ${randomNumber()})`,color:'white'}}>
                        {type.Description}
                    </CardHeader>
                    <CardBody>
                        <CardText>
                            <TaskList tasks = {getTasksFromType(type.Id)} onEdit={editTaskById} onDelete = {deleteTaskById} handleClickChangeTypeTask= {handleClickChangeTypeTask}/>
                        </CardText>
                    </CardBody>
                    <CardFooter style={{backgroundColor:`rgb(${randomNumber()}, ${randomNumber()}, ${randomNumber()})`}}>
                        <TaskCreate type = {type.Id} onCrete={handleSubmit}/>
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
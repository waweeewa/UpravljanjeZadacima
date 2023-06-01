import axios from "axios";
import { useState, useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from '../Header.jsx';
import {Link} from 'react-router-dom';

export default function TaskTable()
{
    const [tasks, setTasks] = useState([]);
    useEffect(() => {
        getTasks();
    }, []);

    async function getTasks() {
        try {
            const response = await axios.get('http://localhost/Upravljanje/src/components/functions/ReadTasks.php');
            setTasks(response.data)
        } catch (error) {
            console.error(error);
        }
    }

    function deleteConfirm(id){
        if(window.confirm("Are you sure?")){
            deleteTask(id);
        }
    }

    async function deleteTask(id){
        try{
            await axios.post(`http://localhost/Upravljanje/src/components/functions/DeleteTask.php`, {
                id: id,
            });

            setTasks([]);
            getTasks();

        }catch (error) {throw error}
    }

    var number = 1;

    return (
        <>
        <Header/>
        <table className="table table-striped">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Status</th>
                    <th>Deadline</th>
                    <th>Username</th>
                    <th>Delete</th>
                </tr>
            </thead>
            <tbody>
                {tasks.map((task) => {
                    return (<tr key={task.task_id.toString()}>
                                <td>{number++}</td>
                                <td>{task.name}</td>
                                <td>{task.solved}</td>
                                <td>{task.deadline}</td>
                                <td>{task.username}</td>
                                <td><button className="btn btn-outline-danger" onClick={() => deleteConfirm(task.id)}> Delete </button></td>
                            </tr>)
                })}
            </tbody>
        </table>
        </>
    )
}
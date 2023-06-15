import axios from "axios";
import { useState, useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from '../Header.jsx';
import { Link } from 'react-router-dom';
import CommentTable from "./CommentTable.jsx";

import "../css/TaskTable.css";

export default function TaskTable() {
  const [tasks, setTasks] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [newTask, setNewTask] = useState({
    name: "",
    description: "",
    solved: "Nije zapoceto",
    deadline: "",
    username: ""
  });

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

  function deleteConfirm(id) {
    if (window.confirm("Are you sure?")) {
      deleteTask(id);
    }
  }

  async function deleteTask(id) {
    try {
      await axios.post(`http://localhost/Upravljanje/src/components/functions/DeleteTask.php`, {
        id: id,
      });

      setTasks([]);
      getTasks();

    } catch (error) {
      throw error
    }
  }
  

  async function handleCreateTask(event) {
    event.preventDefault();
    try {
      await axios.post('http://localhost/Upravljanje/src/components/functions/CreateTask.php', newTask);
      setNewTask({
        name: "",
        description: "",
        solved: "Nije zapoceto",
        deadline: "",
        username: ""
      });
      setShowModal(false);
      setTasks([]);
      getTasks();
    } catch (error) {
      console.error(error);
    }
  }

  var number = 1;

  return (
    <>
      <Header />
      <div className="mt-5">
        <table className="table table-striped task-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Status</th>
              <th>Deadline</th>
              <th>Username</th>
              <th>Comment</th>
              <th>Delete</th>
              <th><button className="btn btn-primary create-task-btn" onClick={() => setShowModal(true)}>Create Task</button></th>
            </tr>
          </thead>
          <tbody>
            {tasks.map((task) => {
              if (task.username == localStorage.getItem('username')) {
              } else {
                return (
                  <tr key={task.task_id.toString()}>
                    <td>{number++}</td>
                    <td>{task.name}</td>
                    <td>{task.solved}</td>
                    <td>{task.deadline}</td>
                    <td>{task.username}</td>
                    <td><Link to={`/comments/${task.task_id}`} className="btn btn-outline-success">Comment</Link></td>
                    <td><button className="btn btn-outline-danger"onClick={() => deleteConfirm(task.task_id)}> Delete </button></td>
                  </tr>
                )
              }
            })}
          </tbody>
        </table>
      </div>
      {showModal && (
        <div className="modal-backdrop fade show"></div>
      )}
      <div className={`modal ${showModal ? 'show' : ''}`} style={{ display: showModal ? 'block' : 'none' }} tabIndex="-1" role="dialog">
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Create Task</h5>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={() => setShowModal(false)}>
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <form onSubmit={handleCreateTask}>
                <div className="form-group">
                  <label htmlFor="name">Name</label>
                  <input type="text" className="form-control" id="name" value={newTask.name} onChange={(e) => setNewTask({ ...newTask, name: e.target.value })} required />
                </div>
                <div className="form-group">
                  <label htmlFor="description">Description</label>
                  <textarea className="form-control" id="description" value={newTask.description} onChange={(e) => setNewTask({ ...newTask, description: e.target.value })} required></textarea>
                </div>
                <div className="form-group">
                  <label htmlFor="solved">Solved</label>
                  <select className="form-control" id="solved" value="Nije zapoceto" disabled>
                  <option value="Nije zapoceto">Nije zapoceto</option>
                  </select>
                </div>
                <div className="form-group">
                  <label htmlFor="deadline">Deadline</label>
                  <input type="date" className="form-control" id="deadline" value={newTask.deadline} onChange={(e) => setNewTask({ ...newTask, deadline: e.target.value })} required />
                </div>
                <div className="form-group">
                  <label htmlFor="username">Username</label>
                  <select className="form-control" id="username" value={newTask.username} onChange={(e) => setNewTask({ ...newTask, username: e.target.value })} required>
                    <option value="user1">User 1</option>
                    <option value="user2">User 2</option>
                  </select>
                </div>
                <button type="submit" className="btn btn-primary">Create</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}





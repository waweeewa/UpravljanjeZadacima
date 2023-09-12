import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from '../Header.jsx';
import { Link } from 'react-router-dom';
import CommentTable from './CommentTable.jsx';

import '../css/TaskTable.css';

import { format } from 'date-fns';

export default function TaskTable() {
  const [tasks, setTasks] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [users, setUsers] = useState([]);
  const [statusFilter, setStatusFilter] = useState('All');
  const [userFilter, setUserFilter] = useState('');
  const [importanceFilter, setImportanceFilter] = useState('All');
  const [notification, setNotification] = useState(null);
  const [newTask, setNewTask] = useState({
    name: '',
    description: '',
    solved: 'Not started',
    deadline: '',
    user_id: '',
    importance: ''
  });

  useEffect(() => {
    getTasks();
    getUsers();
  }, []);

  async function getUsers() {
    try {
      const response = await axios.get('http://localhost/Upravljanje/src/components/functions/GetUsers.php');
      if (Array.isArray(response.data)) {
        //const filteredUsers = response.data.filter((user) => user.username !== localStorage.getItem('username'));
        const filteredUsers = response.data;
        setUsers(filteredUsers);
      } else {
        console.error('Response data is not an array:', response.data);
      }
    } catch (error) {
      console.error(error);
    }
  }

  async function getTasks() {
    try {
      const response = await axios.get('http://localhost/Upravljanje/src/components/functions/ReadTasks.php');
      setTasks(response.data);
    } catch (error) {
      console.error(error);
    }
  }

  function deleteConfirm(id) {
    if (window.confirm("Are you sure, you're gonna delete this task and all of the comments inside it")) {
      deleteTask(id);
    }
  }

  async function deleteTask(id) {
    try {
      console.log(id);
      const response = await axios.post(`http://localhost/Upravljanje/src/components/functions/DeleteTask.php?task_id=${id}`);
      console.log(response.data);
      setTasks([]);
      getTasks();
      showSuccessNotification('Task deleted successfully.')
    } catch (error) {
      console.error(error);
    }
  }

  async function handleCreateTask(event) {
    event.preventDefault();
    console.log(newTask);
    try {
      const response = await axios.get(`http://localhost/Upravljanje/src/components/functions/CreateTask.php?user_id=${newTask.user_id}&name=${newTask.name}&description=${newTask.description}&solved=${newTask.solved}&deadline=${newTask.deadline}&importance=${newTask.importance}`);
      console.log(response.data);
      setNewTask({
        name: '',
        description: '',
        solved: 'Not started',
        deadline: '',
        user_id: '',
        importance: ''
      });
      setShowModal(false);
      setTasks([]);
      getTasks();
      showSuccessNotification('Task created successfully.')
    } catch (error) {
      console.error(error);
    }
  }

  async function handleOptionChange(taskId, value) {
    try {
      const response = await axios.get(`http://localhost/Upravljanje/src/components/functions/UpdateTask.php?taskid=${taskId}&solved=${value}`);
      setTasks([]);
      getTasks();
      showSuccessNotification('Task updated successfully.')
    } catch (error) {
      throw error;
    }
  }

  function showSuccessNotification(message) {
    setNotification({ type: 'success', message });
    setTimeout(() => {
      setNotification(null);
    }, 3000);
  }

  var number = 1;

  const statusOptions = ['All', 'Not Started', 'In Process', 'Finished'];
  const importanceOptions = ['All', 'Low', 'Medium', 'High'];

  const currentUser = localStorage.getItem('username');

  return (
    <>
      <Header />
      <div className="mt-5 alert-container">
        {notification && notification.type === 'success' && (
          <div className="alert alert-success" role="alert">
            {notification.message}
          </div>
        )}
        <h1>Task management</h1>
        <div className="mb-3">
          <div className="d-flex">
            <select
              id="statusFilter"
              className="form-control me-2"
              style={{ width: '150px' }}
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              {statusOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
            <select
              id="userFilter"
              className="form-control me-2"
              style={{ width: '150px' }}
              value={userFilter}
              onChange={(e) => setUserFilter(e.target.value)}
            >
              <option value="">All Users</option>
              {users.map((user) => (
                <option key={user.user_id} value={user.user_id}>
                  {user.username}
                </option>
              ))}
            </select>
            <select
              id="importanceFilter"
              className="form-control"
              style={{ width: '150px' }}
              value={importanceFilter}
              onChange={(e) => setImportanceFilter(e.target.value)}
            >
              {importanceOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
        </div>
        <table className="table table-striped task-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Status</th>
              <th>Deadline</th>
              <th>Username</th>
              <th>Description</th>
              <th>Importance</th>
              <th>Comment</th>
              <th>Delete</th>
              <th>
                <button className="btn btn-primary create-task-btn" onClick={() => setShowModal(true)}>
                  Create Task
                </button>
              </th>
            </tr>
          </thead>
          <tbody>
            {tasks.map((task) => {
              let statusClass = '';
              if (task.solved === 'Not Started') {
                statusClass = 'table-warning';
              } else if (task.solved === 'In Process') {
                statusClass = 'table-primary';
              } else if (task.solved === 'Finished') {
                statusClass = 'table-success';
              }

              const deadlineDate = new Date(task.deadline);
              const currentDate = new Date();

              if ((deadlineDate < currentDate) && (task.solved === 'In Process' || task.solved === 'Not Started')) {
                statusClass = 'table-danger';
              }

              if (
                (statusFilter === 'All' || task.solved === statusFilter) &&
                (userFilter === '' || task.user_id === userFilter) &&
                (importanceFilter === 'All' || task.importance === importanceFilter)
              ) {
                if (task.username === currentUser) {
                  return (
                    <tr key={task.task_id.toString()} className={statusClass}>
                      <td>{number++}</td>
                      <td>{task.name}</td>
                      <td>
                        <select
                          value={task.solved}
                          onChange={(e) => {
                            console.log('Dropdown value:', e.target.value);
                            handleOptionChange(task.task_id, e.target.value);
                          }}
                        >
                          <option value="Not Started">Not Started</option>
                          <option value="In Process">In Process</option>
                          <option value="Finished">Finished</option>
                        </select>
                      </td>
                      <td>{format(new Date(task.deadline), 'dd/MM/yyyy')}</td>
                      <td>
                        <Link to={`/profile/${task.user_id}`}>{task.username}</Link>
                      </td>
                      <td>{task.description}</td>
                      <td>{task.importance}</td>
                      <td>
                        <Link to={`/comments/${task.task_id}`} className="btn btn-outline-success">
                          Comment
                        </Link>
                      </td>
                      <td>
                        <button className="btn btn-outline-danger" onClick={() => deleteConfirm(task.task_id)}>
                          Delete
                        </button>
                      </td>
                    </tr>
                  );
                } else {
                  return (
                    <tr key={task.task_id.toString()} className={statusClass}>
                      <td>{number++}</td>
                      <td>{task.name}</td>
                      <td>{task.solved}</td>
                      <td>{format(new Date(task.deadline), 'dd/MM/yyyy')}</td>
                      <td>
                        <Link to={`/profile/${task.user_id}`}>{task.username}</Link>
                      </td>
                      <td>{task.description}</td>
                      <td>{task.importance}</td>
                      <td>
                        <Link to={`/comments/${task.task_id}`} className="btn btn-outline-success">
                          Comment
                        </Link>
                      </td>
                      <td className="delete-cell">
                        <button className="btn btn-outline-danger" onClick={() => deleteConfirm(task.task_id)}>
                          Delete
                        </button>
                      </td>
                    </tr>
                  );
                }
              } else {
                return null;
              }
            })}
          </tbody>
        </table>
      </div>
      {/* Modal code */}
      {showModal && <div className="modal-backdrop fade show"></div>}
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
                  <input type="text" className="form-control" id="solved" value="Not Started" readOnly />
                </div>
                <div className="form-group">
                  <label htmlFor="deadline">Deadline</label>
                  <input
                    type="date"
                    className="form-control"
                    id="deadline"
                    value={newTask.deadline}
                    onChange={(e) => setNewTask({ ...newTask, deadline: e.target.value })}
                    min={new Date().toISOString().split('T')[0]}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="username">Username</label>
                  <select
                    className="form-control"
                    id="username"
                    value={newTask.user_id}
                    onChange={(e) => setNewTask({ ...newTask, user_id: e.target.value })}
                    required
                  >
                    <option value="">Select User</option>
                    {users.map((user) => (
                      <option key={user.user_id} value={user.user_id}>
                        {user.username}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="form-group">
                  <label htmlFor="importance">Importance</label>
                  <select
                    className="form-control"
                    id="importance"
                    value={newTask.importance}
                    onChange={(e) => setNewTask({ ...newTask, importance: e.target.value })}
                    required
                  >
                    <option value="">Select Importance</option>
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                  </select>
                </div>
                <button type="submit" className="btn btn-primary">
                  Create
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
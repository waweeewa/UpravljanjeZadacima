import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from '../Header.jsx';
import { Link } from 'react-router-dom';
import CommentTable from './CommentTable.jsx';
import 'font-awesome/css/font-awesome.min.css';


import '../css/TaskTable.css';

import { format } from 'date-fns';

export default function TaskTable() {
  const [tasks, setTasks] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [users, setUsers] = useState([]);
  const [statusFilter, setStatusFilter] = useState('All');
  const [userFilter, setUserFilter] = useState('');
  const [giverFilter, setGiverFilter] = useState('');
  const [importanceFilter, setImportanceFilter] = useState('All');
  const [archivedFilter, setArchivedFilter] = useState('Not Archived');
  const [notification, setNotification] = useState(null);
  const [newTask, setNewTask] = useState({
    name: '',
    description: '',
    solved: 'Not started',
    deadline: '',
    user_id: '',
    importance: ''
  });

  const [sortColumn, setSortColumn] = useState(null);
  const [sortDirection, setSortDirection] = useState('asc');

  useEffect(() => {
    getTasks();
    getUsers();
    setSortColumn('Importance');
    setSortDirection('desc');
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
      const useras = localStorage.getItem('username');
      console.log(useras)
      const response = await axios.get(`http://localhost/Upravljanje/src/components/functions/CreateTask.php?user_id=${newTask.user_id}&name=${newTask.name}&description=${newTask.description}&solved=${newTask.solved}&deadline=${newTask.deadline}&importance=${newTask.importance}&giver=${useras}`);
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

  const handleSort = (columnName) => {
    if (sortColumn === columnName) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortColumn(columnName);
      setSortDirection('asc');
    }
  };

  const sortedTasks = [...tasks].sort((a, b) => {
    if (sortColumn === 'ID') {
      return sortDirection === 'asc' ? a.task_id - b.task_id : b.task_id - a.task_id;
    }
    if (sortColumn === 'Name') {
      return sortDirection === 'asc' ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name);
    }
    if (sortColumn === 'Status') {
      return sortDirection === 'asc' ? a.solved.localeCompare(b.solved) : b.solved.localeCompare(a.solved);
    }
    if (sortColumn === 'Deadline') {
      return sortDirection === 'asc' ? new Date(a.deadline) - new Date(b.deadline) : new Date(b.deadline) - new Date(a.deadline);
    }
    if (sortColumn === 'Username') {
      return sortDirection === 'asc' ? a.username.localeCompare(b.username) : b.username.localeCompare(a.username);
    }
    if (sortColumn === 'Description') {
      return sortDirection === 'asc' ? a.description.localeCompare(b.description) : b.description.localeCompare(a.description);
    }
    if (sortColumn === 'Importance') {
      const importanceOrder = ['Low', 'Medium', 'High'];
      return sortDirection === 'asc' ? importanceOrder.indexOf(a.importance) - importanceOrder.indexOf(b.importance) : importanceOrder.indexOf(b.importance) - importanceOrder.indexOf(a.importance);
    }
    return 0;
  });

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
        <h1 >Task management</h1>
        <div className="mb-3" style={{ marginTop: '50px' }}>
          <div className="d-flex">
            <div className="select-container">
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
              <div className="arrow-down" style={{ marginRight: '10px' }}></div>
            </div>
            <div className="select-container">
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
              <div className="arrow-down" style={{ marginRight: '10px' }}></div>
            </div>
            <div className="select-container">
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
              <div className="arrow-down"></div>
            </div>

            <div className="select-container">
              <select
                id="archivedFilter"
                className="form-control me-2"
                style={{ width: '150px', marginLeft: '10px' }}
                value={archivedFilter}
                onChange={(e) => setArchivedFilter(e.target.value)}
              >
                <option value="Not Archived">Not Archived</option>
                <option value="Archived">Archived</option>
              </select>
              <div className="arrow-down" style={{ marginRight: '10px' }}></div>
            </div>
            <div className="select-container">
              <select
                id="giverFilter"
                className="form-control me-2"
                style={{ width: '150px' }}
                value={giverFilter}
                onChange={(e) => setGiverFilter(e.target.value)}
              >
                <option value="">All Users</option>
                {users.map((user) => (
                  <option key={user.user_id} value={user.username}>
                    {user.username}
                  </option>
                ))}
              </select>
              <div className="arrow-down" style={{ marginRight: '10px' }}></div>
            </div>
          </div>
        </div>
        <table className="table table-striped task-table justify-content">
          <thead>
            <tr>
              <th onClick={() => handleSort('Name')}>
                Task Name
                {sortColumn === 'Name' && (
                  <span className={`sort-icon ${sortDirection === 'asc' ? 'asc' : 'desc'}`}>
                    <i className={`fa ${sortDirection === 'asc' ? 'fa-sort-asc' : 'fa-sort-desc'}`}></i>
                  </span>
                )}
              </th>
              <th style={{ minWidth: '90px' }} onClick={() => handleSort('Status')}>
                Status
                {sortColumn === 'Status' && (
                  <span className={`sort-icon ${sortDirection === 'asc' ? 'asc' : 'desc'}`}>
                    <i className={`fa ${sortDirection === 'asc' ? 'fa-sort-asc' : 'fa-sort-desc'}`}></i>
                  </span>
                )}
              </th>
              <th onClick={() => handleSort('Deadline')}>
                Deadline
                {sortColumn === 'Deadline' && (
                  <span className={`sort-icon ${sortDirection === 'asc' ? 'asc' : 'desc'}`}>
                    <i className={`fa ${sortDirection === 'asc' ? 'fa-sort-asc' : 'fa-sort-desc'}`}></i>
                  </span>
                )}
              </th>
              <th style={{ minWidth: '150px' }} onClick={() => handleSort('Username')}>
                Username
                {sortColumn === 'Username' && (
                  <span className={`sort-icon ${sortDirection === 'asc' ? 'asc' : 'desc'}`}>
                    <i className={`fa ${sortDirection === 'asc' ? 'fa-sort-asc' : 'fa-sort-desc'}`}></i>
                  </span>
                )}
              </th>
              <th onClick={() => handleSort('Description')}>
                Description
                {sortColumn === 'Description' && (
                  <span className={`sort-icon ${sortDirection === 'asc' ? 'asc' : 'desc'}`}>
                    <i className={`fa ${sortDirection === 'asc' ? 'fa-sort-asc' : 'fa-sort-desc'}`}></i>
                  </span>
                )}
              </th>
              <th style={{ minWidth: '100px' }} onClick={() => handleSort('Importance')}>
                Priority
                {sortColumn === 'Importance' && (
                  <span className={`sort-icon ${sortDirection === 'asc' ? 'asc' : 'desc'}`}>
                    <i className={`fa ${sortDirection === 'asc' ? 'fa-sort-asc' : 'fa-sort-desc'}`}></i>
                  </span>
                )}
              </th>
              <th>Giver</th>

              <th>Comment</th>
              <th>Delete</th>
              <th>
                <button className="btn btn-primary create-task-btn" onClick={() => setShowModal(true)}>
                  Create
                </button>
              </th>
            </tr>
          </thead>
          <tbody>
            {sortedTasks.map((task) => {
              const isArchived = 1;
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
                (importanceFilter === 'All' || task.importance === importanceFilter) &&
                ((archivedFilter === 'Archived' && task.archived == 1) || (archivedFilter === 'Not Archived' && task.archived == null)) &&
                (giverFilter == '' || task.giver == giverFilter) &&
                (task.username === currentUser || task.giver === currentUser)
              ) {
                if (task.username === currentUser) {
                  return (
                    <tr key={task.task_id.toString()} className={statusClass}>
                      <td>{task.name}</td>
                      <td style={{ minWidth: '140px' }}>
                        {task.solved === 'Finished' || task.archived == 1 ? (
                          task.solved
                        ) : (
                          <div className="select-wrapper">
                            <select
                              className="form-control"
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
                            <div className="arrow"></div>
                          </div>
                        )}
                      </td>
                      <td>{format(new Date(task.deadline), 'dd/MM/yyyy')}</td>
                      <td>
                        <Link to={`/profile/${task.user_id}`}>{task.username}</Link>
                      </td>
                      <td>{task.description}</td>
                      <td>{task.importance}</td>
                      <td>{task.giver}</td>
                      <td>
                        <Link to={`/comments/${task.task_id}`} className="btn btn-outline-success">
                          Comment
                        </Link>
                      </td>
                      {
                        isArchived != task.archived ? (
                          <td>
                            <button className="btn btn-outline-danger" onClick={() => deleteConfirm(task.task_id)}>
                              Delete
                            </button>
                          </td>
                        ) : (
                          <td>
                            <button className="btn btn-danger" disabled>
                              Delete
                            </button>
                          </td>
                        )}
                    </tr>
                  );
                } else {
                  return (
                    <tr key={task.task_id.toString()} className={statusClass}>
                      <td>{task.name}</td>
                      <td>{task.solved}</td>
                      <td>{format(new Date(task.deadline), 'dd/MM/yyyy')}</td>
                      <td>
                        <Link to={`/profile/${task.user_id}`}>{task.username}</Link>
                      </td>
                      <td>{task.description}</td>
                      <td>{task.importance}</td>
                      <td>{task.giver}</td>
                      <td>
                        <Link to={`/comments/${task.task_id}`} className="btn btn-outline-success">
                          Comment
                        </Link>
                      </td>
                      {
                        isArchived != task.archived ? (
                          <td>
                            <button className="btn btn-outline-danger" onClick={() => deleteConfirm(task.task_id)}>
                              Delete
                            </button>
                          </td>
                        ) : (
                          <td>
                            <button className="btn btn-danger" disabled>
                              Delete
                            </button>
                          </td>
                        )}
                    </tr>
                  );
                }
              } else {
                return null;
              }
            })}
          </tbody>
        </table>
      </div >
      {/* Modal code */}
      {showModal && <div class="modal fade" className="modal-backdrop fade show"></div>}
      <div className={`modal ${showModal ? 'show' : ''}`} style={{ display: showModal ? 'block' : 'none' }} tabIndex="-1" role="dialog">
        <div className="modal-dialog" role="document">
          <div className="modal-content p-1">
            <div className="modal-header">
              <h5 className="modal-title">Create Task</h5>
              <button
                type="button"
                class="btn-close"
                data-mdb-dismiss="modal"
                aria-label="Close"
                onClick={() => setShowModal(false)}></button>
            </div>
            <div className="modal-body">
              <form onSubmit={handleCreateTask}>
                <div className="form-group text-start mb-2">
                  <label htmlFor="name" style={{ fontSize: '1.2em' }}>Name:</label>
                  <input type="text" className="form-control" id="name" value={newTask.name} onChange={(e) => setNewTask({ ...newTask, name: e.target.value })} required />
                </div>
                <div className="form-group text-start mb-2">
                  <label htmlFor="description" style={{ fontSize: '1.2em' }}>Description:</label>
                  <textarea className="form-control" id="description" value={newTask.description} onChange={(e) => setNewTask({ ...newTask, description: e.target.value })} required></textarea>
                </div>
                <div className="form-group text-start mb-2">
                  <label htmlFor="solved" style={{ fontSize: '1.2em' }}>Solved:</label>
                  <input type="text" className="form-control" id="solved" value="Not Started" readOnly />
                </div>
                <div className="form-group text-start mb-2">
                  <label htmlFor="deadline" style={{ fontSize: '1.2em' }}>Deadline:</label>
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
                <div className="form-group text-start mb-2">
                  <label htmlFor="username" style={{ fontSize: '1.2em' }}>Username:</label>
                  <div className="select-container">
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
                    <div className="arrow-down"></div>
                  </div>
                </div>
                <div className="form-group text-start mb-2">
                  <label htmlFor="importance" style={{ fontSize: '1.2em' }}>Priority:</label>
                  <div className="select-container">
                    <select
                      className="form-control"
                      id="importance"
                      value={newTask.importance}
                      onChange={(e) => setNewTask({ ...newTask, importance: e.target.value })}
                      required
                    >
                      <option value="">Select Priority</option>
                      <option value="Low">Low</option>
                      <option value="Medium">Medium</option>
                      <option value="High">High</option>
                    </select>
                    <div className="arrow-down"></div>
                  </div>
                </div>
                <div className="d-flex justify-content-between">
                  <button type="submit" className="btn btn-success my-2" style={{ fontSize: '1.2em' }}>
                    Submit
                  </button>
                  <button
                    type="button"
                    className="btn btn-cancel my-2"
                    onClick={() => setShowModal(false)}
                    style={{ fontSize: '1.2em' }}>
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
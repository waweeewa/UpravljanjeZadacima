import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from '../Header.jsx';
import { useParams } from 'react-router-dom';
import '../css/CommentTable.css';
import { format } from 'date-fns';
import 'font-awesome/css/font-awesome.min.css';


const UserProfile = () => {
  const [commentData, setCommentData] = useState([]);
  const { commentid } = useParams();

  const [userTasks, setUserTasks] = useState([]);
  const [username, setUsername] = useState('');
  const [sortColumnTasks, setSortColumnTasks] = useState(null);
  const [sortDirectionTasks, setSortDirectionTasks] = useState('asc');
  const [sortColumnComments, setSortColumnComments] = useState(null);
  const [sortDirectionComments, setSortDirectionComments] = useState('asc');

  useEffect(() => {
    getUserID();
    getUserTasks();
    getUsername();
  }, [commentid]);

  const handleSortTasks = (columnName) => {
    if (sortColumnTasks === columnName) {
      setSortDirectionTasks(sortDirectionTasks === 'asc' ? 'desc' : 'asc');
    } else {
      setSortColumnTasks(columnName);
      setSortDirectionTasks('asc');
    }
  };

  const handleSortComments = (columnName) => {
    if (sortColumnComments === columnName) {
      setSortDirectionComments(sortDirectionComments === 'asc' ? 'desc' : 'asc');
    } else {
      setSortColumnComments(columnName);
      setSortDirectionComments('asc');
    }
  };

  async function getUserTasks() {
    try {
      const response = await axios.get(
        `http://localhost/Upravljanje/src/components/functions/ReadTasksID.php?id=${commentid}`
      );
      setUserTasks(response.data);
    } catch (error) {
      console.error(error);
    }
  }
  async function getUsername() {
    try {
      const response = await axios.get(
        `http://localhost/Upravljanje/src/components/functions/ReadPerson.php?id=${commentid}`
      );
      setUsername(response.data[0] ? response.data[0].username : '');
    } catch (error) {
      console.error(error);
    }
  }
  async function getUserID() {
    try {
      const response = await axios.get(
        `http://localhost/Upravljanje/src/components/functions/ReadCommentsID.php?id=${commentid}`
      );
      setCommentData(response.data);
    } catch (error) {
      console.error(error);
    }
  }

  const getStatusClass = (status) => {
    switch (status) {
      case 'Not Started':
        return 'table-warning';
      case 'In Process':
        return 'table-primary';
      case 'Finished':
        return 'table-success';
      default:
        return '';
    }
  };

  const getSortedTasks = () => {
    return [...userTasks].sort((a, b) => {
      if (sortColumnTasks === 'Name') {
        return sortDirectionTasks === 'asc' ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name);
      }
      if (sortColumnTasks === 'Description') {
        return sortDirectionTasks === 'asc' ? a.description.localeCompare(b.description) : b.description.localeCompare(a.description);
      }
      if (sortColumnTasks === 'Status') {
        return sortDirectionTasks === 'asc' ? a.solved.localeCompare(b.solved) : b.solved.localeCompare(a.solved);
      }
      if (sortColumnTasks === 'Deadline') {
        return sortDirectionTasks === 'asc' ? new Date(a.deadline) - new Date(b.deadline) : new Date(b.deadline) - new Date(a.deadline);
      }
      if (sortColumnTasks === 'Importance') {
        return sortDirectionTasks === 'asc' ? a.importance.localeCompare(b.importance) : b.importance.localeCompare(a.importance);
      }
      return 0;
    });
  };
  
  const getSortedComments = () => {
    return [...commentData].sort((a, b) => {
      if (sortColumnComments === 'Comment') {
        return sortDirectionComments === 'asc' ? a.commentary.localeCompare(b.commentary) : b.commentary.localeCompare(a.commentary);
      }
      if (sortColumnComments === 'Comment Date') {
        return sortDirectionComments === 'asc' ? new Date(a.comment_date) - new Date(b.comment_date) : new Date(b.comment_date) - new Date(a.comment_date);
      }
      return 0;
    });
  };

  return (
    <div>
      <Header />
      <div className="mt-5">
        <h1 className="text-center mb-4">{username}</h1>
        {userTasks.length > 0 ? (
          <table className="table table-striped task-table">
            <thead>
              <tr>
                <th onClick={() => handleSortTasks('Name')}>
                  Task Name
                  {sortColumnTasks === 'Name' && (
                    <span className={`sort-icon ${sortDirectionTasks === 'asc' ? 'asc' : 'desc'}`}>
                      <i className={`fa ${sortDirectionTasks === 'asc' ? 'fa-sort-asc' : 'fa-sort-desc'}`}></i>
                    </span>
                  )}
                </th>
                <th onClick={() => handleSortTasks('Description')}>
                  Description
                  {sortColumnTasks === 'Description' && (
                    <span className={`sort-icon ${sortDirectionTasks === 'asc' ? 'asc' : 'desc'}`}>
                      <i className={`fa ${sortDirectionTasks === 'asc' ? 'fa-sort-asc' : 'fa-sort-desc'}`}></i>
                    </span>
                  )}
                </th>
                <th style={{ minWidth: '100px' }} onClick={() => handleSortTasks('Status')}>
                  Status
                  {sortColumnTasks === 'Status' && (
                    <span className={`sort-icon ${sortDirectionTasks === 'asc' ? 'asc' : 'desc'}`}>
                      <i className={`fa ${sortDirectionTasks === 'asc' ? 'fa-sort-asc' : 'fa-sort-desc'}`}></i>
                    </span>
                  )}
                </th>
                <th onClick={() => handleSortTasks('Deadline')}>
                  Deadline
                  {sortColumnTasks === 'Deadline' && (
                    <span className={`sort-icon ${sortDirectionTasks === 'asc' ? 'asc' : 'desc'}`}>
                      <i className={`fa ${sortDirectionTasks === 'asc' ? 'fa-sort-asc' : 'fa-sort-desc'}`}></i>
                    </span>
                  )}
                </th>
                <th style={{ minWidth: '100px' }} onClick={() => handleSortTasks('Importance')}>
                  Priority
                  {sortColumnTasks === 'Importance' && (
                    <span className={`sort-icon ${sortDirectionTasks === 'asc' ? 'asc' : 'desc'}`}>
                      <i className={`fa ${sortDirectionTasks === 'asc' ? 'fa-sort-asc' : 'fa-sort-desc'}`}></i>
                    </span>
                  )}
                </th>
              </tr>
            </thead>
            <tbody>
              {getSortedTasks().map((task, index) => (
                <tr key={task.task_id.toString()} className={getStatusClass(task.solved)}>
                  <td className="comment-cell">{task.name}</td>
                  <td>{task.description}</td>
                  <td>{task.solved}</td>
                  <td>{format(new Date(task.deadline), 'dd/MM/yyyy')}</td>
                  <td>{task.importance}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>This user hasn't received any tasks yet.</p>
        )}
        {commentData.length > 0 ? (
          <table className="table task-table">
            <thead>
              <tr>
                <th onClick={() => handleSortComments('Comment')}>
                  Comment
                  {sortColumnComments === 'Comment' && (
                    <span className={`sort-icon ${sortDirectionComments === 'asc' ? 'asc' : 'desc'}`}>
                      <i className={`fa ${sortDirectionComments === 'asc' ? 'fa-sort-asc' : 'fa-sort-desc'}`}></i>
                    </span>
                  )}
                </th>
                <th onClick={() => handleSortComments('Comment Date')}>
                  Comment Date
                  {sortColumnComments === 'Comment Date' && (
                    <span className={`sort-icon ${sortDirectionComments === 'asc' ? 'asc' : 'desc'}`}>
                      <i className={`fa ${sortDirectionComments === 'asc' ? 'fa-sort-asc' : 'fa-sort-desc'}`}></i>
                    </span>
                  )}
                </th>
              </tr>
            </thead>
            <tbody>
              {getSortedComments().map((comment, index) => (
                <tr key={comment.comment_id.toString()}>
                  <td className="comment-cell">{comment.commentary}</td>
                  <td>{format(new Date(comment.comment_date), 'dd/MM/yyyy')}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>This user hasn't commented anything yet.</p>
        )}
      </div>
    </div>
  );}

export default UserProfile;
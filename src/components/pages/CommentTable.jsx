import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from '../Header.jsx';
import { useParams } from 'react-router-dom';
import 'font-awesome/css/font-awesome.min.css';
import '../css/CommentTable.css';
import '../css/TaskTable.css';

import { format } from 'date-fns';

const CommentTable = () => {
  const [comments, setComments] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [commentData, setCommentData] = useState({
    comment: '',
  });
  const [taskData, setTaskData] = useState({
    comment: '',
  });
  const [users, setUsers] = useState([]);
  const [usernameFilter, setUsernameFilter] = useState('');
  const [notification, setNotification] = useState(null);
  const [sortColumn, setSortColumn] = useState(null);
  const [sortDirection, setSortDirection] = useState('asc');
  const [isDisabled, setIsDisabled] = useState(false);

  const { commentid } = useParams();

  useEffect(() => {
    getComments();
    getUsers();
    getTask();
  }, []);

  async function getUsers() {
    try {
      const response = await axios.get('http://localhost/Upravljanje/src/components/functions/GetUsers.php');
      if (Array.isArray(response.data)) {
        const filteredUsers = response.data;
        setUsers(filteredUsers);
      } else {
        console.error('Response data is not an array:', response.data);
      }
    } catch (error) {
      console.error(error);
    }
  }

  async function getComments() {
    try {
      const response = await axios.get(
        `http://localhost/Upravljanje/src/components/functions/ReadComments.php?id=${commentid}`
      );
      console.log(response.data);
      setComments(response.data);

    } catch (error) {
      console.error(error);
    }
  }
  async function getTask() {
    try {
      const response = await axios.get(
        `http://localhost/Upravljanje/src/components/functions/ReadTaskID.php?task_id=${commentid}`
      );
      console.log(response.data);

      const hasArchivedComment = response.data.some(taskData => taskData.archived == 1);
      setIsDisabled(hasArchivedComment);

      console.log(hasArchivedComment)
    } catch (error) {
      console.error(error);
    }
  }

  async function submitComment(event) {
    event.preventDefault();

    try {
      const today = new Date();
      const year = today.getFullYear();
      const month = String(today.getMonth() + 1).padStart(2, '0');
      const day = String(today.getDate()).padStart(2, '0');
      const currentDate = `${year}-${month}-${day}`;

      const commentPayload = {
        task_id: commentid,
        user_id: localStorage.getItem('user_id'),
        commentary: commentData.comment,
        comment_date: currentDate,
      };

      const response = await axios.get(`http://localhost/Upravljanje/src/components/functions/CreateComment.php?task_id=${commentPayload.task_id}&user_id=${commentPayload.user_id}&commentary=${commentPayload.commentary}&comment_date=${commentPayload.comment_date}`);

      console.log(response.data);
      setShowModal(false);
      getComments();
      showSuccessNotification('Comment created successfully.')
    } catch (error) {
      console.error(error);
    }
  }

  async function deleteCommentConfirm(id) {
    if (window.confirm('Are you sure?')) {
      deleteComment(id);
    }
  }

  async function deleteComment(id) {
    try {
      await axios.post('http://localhost/Upravljanje/src/components/functions/DeleteComment.php', {
        id: id,
      });

      setComments(comments.filter((comment) => comment.comment_id !== id));
      showSuccessNotification('Comment deleted successfully.'); // Show success notification
    } catch (error) {
      console.error(error);
    }
  }

  function showSuccessNotification(message) {
    setNotification({ type: 'success', message });
    setTimeout(() => {
      setNotification(null);
    }, 3000); // Hide notification after 3 seconds
  }

  const [filteredComments, setFilteredComments] = useState([]);

  useEffect(() => {
    applyFilters();
  }, [comments, usernameFilter]);

  function applyFilters() {
    let filteredComments = comments;

    if (usernameFilter) {
      filteredComments = comments.filter((comment) => comment.username === usernameFilter);
    }

    setFilteredComments(filteredComments);
  }

  const handleSort = (columnName) => {
    if (sortColumn === columnName) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortColumn(columnName);
      setSortDirection('asc');
    }
  };

  const sortedComments = [...filteredComments].sort((a, b) => {
    if (sortColumn === 'Comment') {
      return sortDirection === 'asc' ? a.commentary.localeCompare(b.commentary) : b.commentary.localeCompare(a.commentary);
    }
    if (sortColumn === 'Comment Date') {
      return sortDirection === 'asc' ? new Date(a.comment_date) - new Date(b.comment_date) : new Date(b.comment_date) - new Date(a.comment_date);
    }
    if (sortColumn === 'Username') {
      return sortDirection === 'asc' ? a.username.localeCompare(b.username) : b.username.localeCompare(a.username);
    }
    return 0;
  });

  return (
    <div>
      <Header />

      <div className="mt-5 alert-container">
        {notification && notification.type === 'success' && (
          <div className="alert alert-success" role="alert">
            {notification.message}
          </div>
        )}

        <h1>Comments</h1>
        <div>
          <div className="d-flex justify-content-end mb-3">
            <button
              className="btn btn-primary"
              onClick={() => setShowModal(true)}
              disabled={isDisabled}
            >
              Add Comment
            </button>
          </div>
          <div className="mb-3">
            <div className="d-flex">
              <div className="select-container">
                <select
                  id="userFilter"
                  className="form-control me-2"
                  style={{ width: '150px' }}
                  value={usernameFilter}
                  onChange={(e) => setUsernameFilter(e.target.value)}
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
        </div>

        {sortedComments.length > 0 ? (
          <table className="table task-table">
            <thead>
              <tr>
                <th onClick={() => handleSort('Comment')}>
                  Comment
                  {sortColumn === 'Comment' && (
                    <span className={`sort-icon ${sortDirection === 'asc' ? 'asc' : 'desc'}`}>
                      <i className={`fa ${sortDirection === 'asc' ? 'fa-sort-asc' : 'fa-sort-desc'}`}></i>
                    </span>
                  )}
                </th>
                <th onClick={() => handleSort('Comment Date')}>
                  Comment Date
                  {sortColumn === 'Comment Date' && (
                    <span className={`sort-icon ${sortDirection === 'asc' ? 'asc' : 'desc'}`}>
                      <i className={`fa ${sortDirection === 'asc' ? 'fa-sort-asc' : 'fa-sort-desc'}`}></i>
                    </span>
                  )}
                </th>
                <th onClick={() => handleSort('Username')}>
                  Username
                  {sortColumn === 'Username' && (
                    <span className={`sort-icon ${sortDirection === 'asc' ? 'asc' : 'desc'}`}>
                      <i className={`fa ${sortDirection === 'asc' ? 'fa-sort-asc' : 'fa-sort-desc'}`}></i>
                    </span>
                  )}
                </th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {sortedComments.map((comment) => (
                <tr key={comment.comment_id.toString()}>
                  <td className="comment-cell">{comment.commentary}</td>
                  <td>{format(new Date(comment.comment_date), 'dd/MM/yyyy')}</td>
                  <td>{comment.username}</td>
                  {
                    comment.archived != 1 ? (
                      <td>
                        <button className="btn btn-outline-danger" onClick={() => deleteCommentConfirm(comment.comment_id)}>
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
              ))}
            </tbody>
          </table>
        ) : (
          <p>No comments available.</p>
        )}
      </div>

      {showModal && <div className="modal-backdrop fade show"></div>}

      <div
        className={`modal ${showModal ? 'show' : ''}`}
        style={{ display: showModal ? 'block' : 'none' }}
        tabIndex="-1"
        role="dialog"
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Add Comment</h5>
              <button
                type="button"
                class="btn-close"
                data-dismiss="modal"
                aria-label="Close"
                onClick={() => setShowModal(false)}
              >
              </button>
            </div>
            <div className="modal-body">
              <form onSubmit={submitComment}>
                <div className="form-group text-start mb-2">
                  <label htmlFor="comment" style={{ fontSize: '1.2em' }}>Comment:</label>
                  <textarea
                    type="text"
                    className="form-control"
                    id="comment"
                    style={{ height: '500px' }}
                    value={commentData.comment}
                    onChange={(e) => setCommentData({ comment: e.target.value })}
                    required
                  ></textarea>
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
    </div>
  );
};

export default CommentTable;



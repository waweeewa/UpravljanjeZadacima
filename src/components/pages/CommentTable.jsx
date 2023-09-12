import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from '../Header.jsx';
import { useParams } from 'react-router-dom';
import '../css/CommentTable.css';

import { format } from 'date-fns';

const CommentTable = () => {
  const [comments, setComments] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [commentData, setCommentData] = useState({
    comment: '',
  });
  const [users, setUsers] = useState([]);
  const [usernameFilter, setUsernameFilter] = useState('');
  const [notification, setNotification] = useState(null);

  const { commentid } = useParams();

  useEffect(() => {
    getComments();
    getUsers();
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
        <div className="d-flex justify-content-end mb-3">
          <button className="btn btn-primary" onClick={() => setShowModal(true)}>
            Add Comment
          </button>
        </div>
        <div className="mb-3">
          <div className="d-flex">
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
          </div>
        </div>

        {filteredComments.length > 0 ? (
          <table className="table task-table">
            <thead>
              <tr>
                <th>Comment</th>
                <th>Comment Date</th>
                <th>Username</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {filteredComments.map((comment) => (
                <tr key={comment.comment_id.toString()}>
                  <td className="comment-cell">{comment.commentary}</td>
                  <td>{format(new Date(comment.comment_date), 'dd/MM/yyyy')}</td>
                  <td>{comment.username}</td>
                  <td>
                    <button
                      className="btn btn-outline-danger"
                      onClick={() => deleteCommentConfirm(comment.comment_id)}
                    >
                      Delete
                    </button>
                  </td>
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
                className="close"
                data-dismiss="modal"
                aria-label="Close"
                onClick={() => setShowModal(false)}
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <form onSubmit={submitComment}>
                <div className="form-group">
                  <label htmlFor="comment">Comment</label>
                  <textarea
                    className="form-control textareawow"
                    id="comment"
                    value={commentData.comment}
                    onChange={(e) => setCommentData({ comment: e.target.value })}
                    required
                  ></textarea>
                </div>
                <button type="submit" className="btn btn-primary">
                  Submit
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};


export default CommentTable;
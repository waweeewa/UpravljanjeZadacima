import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from '../Header.jsx';
import { useParams } from 'react-router-dom';
import '../css/CommentTable.css';

const Workers = () => {
  const [comments, setComments] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [commentData, setCommentData] = useState({
    comment: '',
  });

  const { commentid } = useParams();

  useEffect(() => {
    getComments();
  }, []);

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
        commentary: commentData.comment,
        comment_date: currentDate,
        user_id: localStorage.getItem('user_id'),
      };

      await axios.get('http://localhost/Upravljanje/src/components/functions/CreateComment.php', {
        params: commentPayload,
      });

      setCommentData({ comment: '' });
      setShowModal(false);

      getComments();
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
    } catch (error) {
      console.error(error);
    }
  }

  var number = 1;

  return (
    <div>
      <Header />

      <div className="mt-5">
        <div className="d-flex justify-content-end mb-3">
          <button className="btn btn-primary" onClick={() => setShowModal(true)}>
            Add Comment
          </button>
        </div>

        {comments.length > 0 ? (
          <table className="table table-stripped">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Status</th>
                <th>Deadline</th>
                <th>Description</th>
              </tr>
            </thead>
            <tbody>
              {comments.map((comment) => (
                <tr key={comment.comment_id.toString()}>
                  <td>{number++}</td>
                  <td className="comment-cell">{comment.commentary}</td>
                  <td>{comment.comment_date}</td>
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
                    className="form-control"
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

export default Workers;
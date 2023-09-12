import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from '../Header.jsx';
import { useParams } from 'react-router-dom';
import '../css/CommentTable.css';
import { format } from 'date-fns';

const UserProfile = () => {
  const [commentData, setCommentData] = useState([]);
  const { commentid } = useParams();

  const [userTasks, setUserTasks] = useState([]);
  const [username, setUsername] = useState(''); // State to store comment.username

  useEffect(() => {
    getUserID();
    getUserTasks();
  }, [commentid]);

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
  
  async function getUserID() {
    try {
      const response = await axios.get(
        `http://localhost/Upravljanje/src/components/functions/ReadCommentsID.php?id=${commentid}`
      );
      setCommentData(response.data);
      // Assuming commentData[0] contains the username
      setUsername(response.data[0] ? response.data[0].username : '');
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

  return (
    <div>
      <Header />
      <div className="mt-5">
        <h1 className="text-center mb-4">{username}</h1> {/* Display the username in a big text */}
        {userTasks.length > 0 ? (
          <table className="table table-striped task-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Task Name</th>
                <th>Description</th>
                <th>Status</th>
                <th>Deadline</th>
                <th>Importance</th>
              </tr>
            </thead>
            <tbody>
              {userTasks.map((task, index) => (
                <tr key={task.task_id.toString()} className={getStatusClass(task.solved)}>
                  <td>{index + 1}</td>
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
                <th>ID</th>
                <th>Comment</th>
                <th>Comment Date</th>
              </tr>
            </thead>
            <tbody>
              {commentData.map((comment, index) => (
                <tr key={comment.comment_id.toString()}>
                  <td>{index + 1}</td>
                  <td className="comment-cell">{comment.commentary}</td>
                  <td>{format(new Date(comment.comment_date), 'dd/MM/yyyy')}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>This user hasn't received any tasks yet.</p>
        )}
      </div>
    </div>
  );
};

export default UserProfile;
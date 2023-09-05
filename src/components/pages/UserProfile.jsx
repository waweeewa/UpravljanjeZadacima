import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from '../Header.jsx';
import { useParams } from 'react-router-dom';
import '../css/CommentTable.css';

const UserProfile = () => {
  const [tasks, getTasks] = useState([]);
  const [commentData, setCommentData] = useState({
    comment: '',
  });

  const [userData, setUserData] = useState({});

  const { commentid } = useParams();

  useEffect(() => {
    getTasksUID();
    getUserID();
  }, []);

  async function getTasksUID() {
    try {
      const response = await axios.get(
        `http://localhost/Upravljanje/src/components/functions/ReadTasksID.php?id=${commentid}`
      );
      setCommentData(response.data);
    } catch (error) {
      console.error(error);
    }
  }

  async function getUserID() {
    try {
      const response = await axios.get(
        `http://localhost/Upravljanje/src/components/functions/ReadPerson.php?user_id=${commentid}`
      )
      setUserData(response.data);
      console.log(userData)
    } catch (error) {
      console.error(error);
    }
  }


  var number = 1;

  return (
    <div>
      <Header />
      
      <div className="mt-5">
        {commentData.length > 0 ? (
          <table className="table table-stripped">
            <thead>
              <tr>
                <th>ID</th>
                <th>Task</th>
                <th>Description</th>
                <th>Status</th>
                <th>Deadline</th>
              </tr>
            </thead>
            <tbody>
              {commentData.map((comment) => (
                <tr key={comment.task_id.toString()}>
                  <td>{number++}</td>
                  <td className="comment-cell">{comment.name}</td>
                  <td>{comment.description}</td>
                  <td>{comment.solved}</td>
                  <td>{comment.deadline}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>This user hasnt received any tasks yet.</p>
        )}
      </div>
    </div>
  );
};

export default UserProfile;
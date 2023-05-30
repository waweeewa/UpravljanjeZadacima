import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { useState, useEffect } from 'react'
import AddTask from './components/pages/AddTask.jsx'
import TaskTable from './components/pages/TaskTable.jsx'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import axios from 'axios'
import './App.css'

function App() {
  const [post, setPost] = useState(null);
  useEffect(() =>{
    axios.get("http://localhost/Upravljanje/src/components/functions/ReadTasks.php").then((res) => {setPost(res.data)});
  }, []);
  if(!post) return null;
  return (
    <>
    <div>
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<TaskTable/>}/>
        <Route path="addtask" element={<AddTask/>}/>
      </Routes>
      </BrowserRouter>
    </div>
    </>
  )
}

export default App

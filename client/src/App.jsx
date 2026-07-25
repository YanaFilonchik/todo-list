import { useEffect, useState } from 'react'
import axios from 'axios';
import style from './App.module.css'

function App() {
  const [tasks, setTasks] = useState([]);
  const [titleInput, setTitleInput] = useState('');
  const [discriptionInput, setDiscription] = useState('');


  async function getDate() {
    const result = await axios.get('http://localhost:3000/api/tasks');
    console.log(result);
    setTasks(result.data);
  }

  async function create() {
    const result = await axios.post('http://localhost:3000/api/tasks', {
      title: titleInput,
      description: discriptionInput,
      completed: 'false',
      createdAt: "2024-01-25T11:30:00.000Z",
    })

    console.log(result);
    getDate();

  }

  useEffect(() => {
    getDate();
  }, []);
  return (
    <>
      <p className={style.textH}>ToDo</p>
      <div className={style.divInput}>
        <input className={style.inpName} placeholder='Create note...' onChange={(e) => setTitleInput(e.target.value)}></input>
        <input className={style.inpDescription} onChange={(e) => setDiscription(e.target.value)}></input>
        <button className={style.btn} onClick={create}>create</button>
      </div>
      <div>
        {tasks.map((el) => <div><div className={style.divTask}><p className={style.titleText}>{el.title}</p><p className={style.descriptionText}>{el.description}</p></div><hr></hr></div>)}
      </div>
    </>
  )
}

export default App

import { useEffect, useState } from 'react'
import axios from 'axios';
import style from './App.module.css'
import imgDelete from './assets/imgDelete.svg'
import imgUpdate from './assets/imgUpdate.svg'

function App() {
  const [tasks, setTasks] = useState([]);
  const [titleInput, setTitleInput] = useState('');
  const [discriptionInput, setDiscription] = useState('');
  const [titleModalInput, setTitleModalInput] = useState('');
  const [discriptionModalInput, setDiscriptionModal] = useState('');


  async function getDate() {
    const result = await axios.get('http://localhost:3000/api/tasks');
    console.log(result);
    setTasks(result.data);
  }

  async function delDate(id) {
    const result = await axios.delete(`http://localhost:3000/api/tasks/${id}`);
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

  const [flag, setFlag] = useState(false);
  const [idM, setId] = useState();
  async function updateModal(id) {
    setFlag(true);
    setId(id);
  }

  async function updateDate() {
    const result = await axios.put(`http://localhost:3000/api/tasks/${idM}`, {
      title: titleModalInput,
      description: discriptionModalInput,
      completed: 'false',
      createdAt: "2024-01-25T11:30:00.000Z",
    })
    setFlag(false);
    console.log(result);
    getDate();
  }

  useEffect(() => {
    getDate();
  }, []);
  return (
    <>
      <div className={style.mainForm} >
        <div style={{ opacity: flag ? 0.1 : 1 }}>
          <p className={style.textH}>TODO LIST</p>
          <div className={style.divInput}>
            <input className={style.inpName} placeholder='Create note...' onChange={(e) => setTitleInput(e.target.value)}></input>
            <input className={style.inpDescription} placeholder='Create description note...' onChange={(e) => setDiscription(e.target.value)}></input>
            <button className={style.btn} onClick={create}>create</button>
          </div>
          <div className={style.styleMap}>
            {tasks.map((el) => <div>
              <div className={style.cardTask}>
                <div className={style.divTask}>
                  <p className={style.titleText}>{el.title}</p>
                  <p className={style.descriptionText}>{el.description}</p>
                </div>
                <div>
                  <img onClick={() => updateModal(el.id)} src={imgUpdate}></img>
                  <img onClick={() => delDate(el.id)} src={imgDelete}></img>
                </div>
              </div>
              <hr></hr>
            </div>)
            }
          </div >
        </div>

        <div className={style.modalForm} style={{ display: flag ? "block" : "none" }}>
          <h1>Update Note</h1>
          <div>
            <input className={style.inputNameTask} placeholder='Input your note...' onChange={(e) => setTitleModalInput(e.target.value)}></input>
          </div>
          <div>
            <input className={style.inputDescriptionTask} placeholder='Input your description note...' onChange={(e) => setDiscriptionModal(e.target.value)}></input>
          </div>
          <div className={style.styleBtn}>
            <button onClick={() => setFlag(false)}>Cancel</button>
            <button onClick={updateDate}>Apply</button>
          </div>
        </div>
      </div>

    </>
  )
}

export default App

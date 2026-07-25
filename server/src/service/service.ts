import { iTask } from '../interface/interface';
import { getAllTasksSQL, addTaskSQL, updateTaskSQL, deleteTaskSQL } from '../repository/repository';

async function getAllTasks() {
    const dateAllTask = await getAllTasksSQL();
    return dateAllTask;
}

async function addTask(body: iTask) {
    const dateAddTask = await addTaskSQL(body);
    return dateAddTask;
}

async function upDateTask(id: number, body: iTask) {
    const updateTask = await updateTaskSQL(id, body);
    return updateTask;
}

async function deleteTaskByID(id) {
  const result = await deleteTaskSQL(id);
  return result;
}

export { getAllTasks, addTask, upDateTask, deleteTaskByID }
import pool from '../../db';
import { iTask } from '../interface/interface';

async function getAllTasksSQL() {
    const connection = await pool.connect();
    const sql = 'SELECT * from tasks';
    const dataSql = (await connection.query(sql)).rows;
    return dataSql;
}

async function addTaskSQL(body: iTask) {
    const connection = await pool.connect();
    try {
        await connection.query('BEGIN');
        console.log(body);
        const sql = 'insert into tasks (title, description, completed, createdAt) values ($1, $2, $3, $4)';
        await connection.query(sql, [body.title, body.description, body.completed, body.createdAt]);
        const sqlSelect = 'SELECT * from tasks';
        const dataSQL = (await connection.query(sqlSelect)).rows;
        await connection.query('COMMIT');
        return dataSQL
    } catch (error: any) {
        await connection.query('ROLLBACK');
        console.log(error.message);
        throw new Error('error');
    }
}

async function updateTaskSQL(id: number, body: iTask) {
    const connection = await pool.connect();
    try {
        const sqlFindId = 'select * from tasks where id = $1';
        const findTaskByID = (await connection.query(sqlFindId, [id])).rows[0];

        if (!findTaskByID.id) throw new Error('not found ID');
        const obj = { ...findTaskByID, ...body };

        await connection.query('BEGIN');
        console.log(obj, id);

        const sql = 'update tasks set title = $1, description=$2, completed=$3, createdAt=$4 where id =$5';
        await connection.query(sql, [obj.title, obj.description, obj.completed, obj.createdAt, id]);
        const sqlSelect = 'SELECT * from tasks';
        const dataSQL = (await connection.query(sqlSelect)).rows;
        await connection.query('COMMIT');
        return dataSQL
    } catch (error: any) {
        await connection.query('ROLLBACK');
        console.log(error.message);
        throw new Error('error');
    }
}


async function deleteTaskSQL(id: number) {
  const connection = await pool.connect();
  try {
    await connection.query('BEGIN');
    const queryText = 'DELETE from tasks WHERE id = $1';
    await connection.query(queryText, [id]);
    const query = 'SELECT * from tasks';
    const data = (await connection.query(query)).rows;
    await connection.query('COMMIT');
    return data;
  } catch (error: any) {
    await connection.query('ROLLBACK');
    console.log(error.message);
    return null;
  }
}

export { getAllTasksSQL, addTaskSQL, updateTaskSQL,deleteTaskSQL };
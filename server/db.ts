import {Pool} from 'pg';

const pool = new Pool({
    user: 'postgres',
    password: '07042003',
    database: 'tasks',
    port: 5432,
    host: 'localhost'
})

export default pool;
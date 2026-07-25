import express, { Request, Response } from 'express';
import { getAllTasks, addTask, upDateTask, deleteTaskByID } from '../service/service'
import { iTask } from '../interface/interface';
import { checkBody } from '../middlewares/middlewares';

const router = express.Router();

router.get('/tasks', async (req: Request, res: Response) => {
    try {
        const resultDate = await getAllTasks();
        res.send(resultDate);
    } catch (error: any) {
        res.status(404).send(error.message);
    }
});

router.post('/tasks', checkBody, async (req: Request, res: Response) => {
    try {
        const body: iTask = req.body;
        const resultDate = await addTask(body);
        res.send(resultDate);
    } catch (error: any) {
        res.status(404).send(error.message);
    }
});

router.put('/tasks/:id', async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const body: iTask = req.body;
        const resultDate = await upDateTask(id, body);
        res.send(resultDate);
    } catch (error: any) {
        res.status(404).send(error.message);
    }
})


router.delete('/tasks/:id', async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await deleteTaskByID(id);
    res.send(result);
});

export default router;
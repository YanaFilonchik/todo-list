import { Request, Response, NextFunction } from 'express';
import { iTask } from '../interface/interface';

function checkBody(req: Request, res: Response, next: NextFunction) {
    const body: iTask = req.body;
    if (!body.title) throw new Error('title не заполнено');
    if (!body.description) throw new Error('description не заполнено');
    if (!body.completed) throw new Error('completed не заполнено');
    if (!body.createdAt) throw new Error('createdAt не заполнено');
    next();
}

export {checkBody}
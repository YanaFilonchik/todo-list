interface iTask {
    id?: number;
    title: string;
    description: string;
    completed: string;
    createdAt: Date|string;
}

export {iTask}
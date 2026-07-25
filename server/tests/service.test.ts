import { addTask, upDateTask } from '../src/service/service'
import * as rep from '../src/repository/repository'

describe('група добавления', () => {
    test('success addTask', async () => {
        const mock = jest.spyOn(rep, 'addTaskSQL');
        mock.mockResolvedValueOnce({
            "id": 1,
            "title": "title test",
            "description": "description test",
            "completed": true,
            "createdAt": "2024-01-25T11:30:00.000Z"
        });
        const res = await addTask({
            "id": 1,
            "title": "title test",
            "description": "description test",
            "completed": "true",
            "createdAt": new Date('2010-05-20')
        });
        expect(res).toEqual({
            "id": 1,
            "title": "title test",
            "description": "description test",
            "completed": true,
            "createdAt": "2024-01-25T11:30:00.000Z"
        });
    });

    test("error addTask", async () => {
        const mock = jest.spyOn(rep, 'addTaskSQL');
        mock.mockResolvedValueOnce({});
        try {
            await addTask({
                "id": 1,
                "title": "title test",
                "description": "description test",
                "completed": "true",
                "createdAt": new Date('2010-05-20')
            });
        } catch (error: any) {
            expect(error.message).toBe('error');
        }
    })

});



/* describe('група обновления', () => {
    test('success upDateTask', async () => {
        const mock = jest.spyOn(rep, 'updateTaskSQL');
        mock.mockResolvedValueOnce({
            "id": 1,
            "title": "title test update",
            "description": "description update",
            "completed": true,
            "createdAt": "2024-01-25T11:30:00.000Z"
        });
        const res = await upDateTask({
            "id": 1,
            "title": "title test",
            "description": "description test",
            "completed": "true",
            "createdAt": new Date('2010-05-20')
        });
        expect(res).toEqual({
            "id": 1,
            "title": "title test",
            "description": "description test",
            "completed": true,
            "createdAt": "2024-01-25T11:30:00.000Z"
        });
    });

    test("error upDateTask", async () => {
        const mock = jest.spyOn(rep, 'updateTaskSQL');
        mock.mockResolvedValueOnce({});
        try {
            await upDateTask({
                "id": 1,
                "title": "title test",
                "description": "description test",
                "completed": "true",
                "createdAt": new Date('2010-05-20')
            });
        } catch (error: any) {
            expect(error.message).toBe('error');
        }
    })

}) */
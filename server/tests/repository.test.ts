import { addTaskSQL, updateTaskSQL } from '../src/repository/repository'

const connection = {
    query: jest.fn()
}

jest.mock('pg', () => {
    return {
        Pool: jest.fn(() => {
            return {
                connect: jest.fn(() => connection)
            }

        })
    }
})

test('success addTask', async () => {
    connection.query.mockResolvedValue({
        rows: [{
            id: 1, title: "test",
            description: "test desk", completed: "true", createdAt: "2026-10-20"
        }]
    });
    const res = await addTaskSQL({
        title: "test",
        description: "test desk", completed: "true", createdAt: "2026-10-20"
    });
    expect(res).toEqual([{ id: 1, title: "test", description: "test desk", completed: "true", createdAt: "2026-10-20" }])
})

test("seccess updateTask", async () => {
    connection.query.mockResolvedValue({
        rows: [{
            id: 1, title: "test update",
            description: "test desk",
            completed: "true",
            createdAt: "2026-10-20"
        }]
    });
    const res = await updateTaskSQL(1, {
        title: "test update",
        description: "test desk",
        completed: "true",
        createdAt: "2026-10-20"
    });
    expect(res).toEqual([{
        id: 1,
        title: "test update",
        description: "test desk",
        completed: "true",
        createdAt: "2026-10-20"
    }])
})


test("error updateTask", async () => {
    connection.query.mockResolvedValue({
        rows: {}
    });
    try {
        await updateTaskSQL(10, {
            title: "test update",
            description: "test desk",
            completed: "true",
            createdAt: "2026-10-20"
        });
    } catch (error) {
        expect(connection.query).toHaveBeenCalledWith('ROLLBACK');
    }
})


import request from 'supertest';
import { testServer } from '../../test-server';
import { prisma } from '../../../src/data/postgres';

describe('Todo route testing', () => {
  beforeAll(async () => {
    await testServer.start();
  });

  afterAll(() => {
    testServer.close();
  });

  const todo1 = { text: 'Hola mundo 1' };
  const todo2 = { text: 'Hola mundo 2' };

  test('should return TODOs api/todos', async () => {
    await prisma.todo.deleteMany();
    await prisma.todo.createMany({
      data: [todo1, todo2],
    });

    const { body } = await request(testServer.app).get('/api/todos').expect(200);

    expect(body).toBeInstanceOf(Array);
    console.log(body);
    // expect(body.lenght).toBe(2);
  });
});

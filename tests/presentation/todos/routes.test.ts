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

  beforeEach(async () => {
    await prisma.todo.deleteMany();
  });

  const todo1 = { text: 'Hola mundo 1' };
  const todo2 = { text: 'Hola mundo 2' };

  test('should return TODOs api/todos', async () => {
    await prisma.todo.createMany({
      data: [todo1, todo2],
    });

    const { body } = await request(testServer.app).get('/api/todos').expect(200);

    expect(body).toBeInstanceOf(Array);
    expect(body.length).toBe(2);
    expect(body[0].text).toBe(todo1.text);
    expect(body[1].text).toBe(todo2.text);
    expect(body[0].completedAt).toBeNull();
  });

  test('should return TODOs api/todos/:id', async () => {
    const todo = await prisma.todo.create({ data: todo1 });

    const { body } = await request(testServer.app).get(`/api/todos/${todo.id}`).expect(200);

    expect(body).toEqual({
      id: todo.id,
      text: todo.text,
      completedAt: todo.completedAt,
    });
  });

  test('should return a 404 NotFound api/todos/:id', async () => {
    const todoId = 900;
    const { body } = await request(testServer.app).get(`/api/todos/${todoId}`).expect(400);

    expect(body).toEqual({ error: `Todo with id ${todoId} not found` });
  });

  test('should return a new Todo api/todos', async () => {
    const { body } = await request(testServer.app).post('/api/todos').send(todo1).expect(201);

    expect(body).toEqual({
      id: expect.any(Number),
      text: todo1.text,
      completedAt: null,
    });
  });

  test('should return an error if text is not present api/todos', async () => {
    const { body } = await request(testServer.app).post('/api/todos').send({}).expect(400);
    expect(body).toEqual({ error: 'Text property is required' });
  });

  test('should return an error if text is empty api/todos', async () => {
    const { body } = await request(testServer.app).post('/api/todos').send({ text: '' }).expect(400);
    expect(body).toEqual({ error: 'Text property is required' });
  });
});

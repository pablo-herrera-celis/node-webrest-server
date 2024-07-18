import { Request, Response } from 'express';
import { prisma } from '../../data/postgres';
import { CreateTodoDto, UpdateTodoDto } from '../../domain/dtos';
import { CreateTodo, DeleteTodo, GetTodo, TodoRepository, UpdateTodo } from '../../domain';
import { GetTodos } from '../../domain/use-cases/todo/get-todos';

export class TodosController {
  //* DI
  constructor(private readonly todoReposiroty: TodoRepository) {}

  public getTodos = (req: Request, res: Response) => {
    new GetTodos(this.todoReposiroty)
      .execute()
      .then((todos) => res.json(todos))
      .catch((error) => res.status(400).json({ error }));
  };

  public getTodoById = (req: Request, res: Response) => {
    const id = +req.params.id;

    new GetTodo(this.todoReposiroty)
      .execute(id)
      .then((todo) => res.json(todo))
      .catch((error) => res.status(400).json({ error }));
  };

  public createTodo = (req: Request, res: Response) => {
    const [error, createTodoDto] = CreateTodoDto.create(req.body);
    if (error) return res.status(400).json({ error });

    new CreateTodo(this.todoReposiroty)
      .execute(createTodoDto!)
      .then((todo) => res.status(201).json(todo))
      .catch((error) => res.status(400).json({ error }));
  };

  public updateTodo = (req: Request, res: Response) => {
    const id = +req.params.id;
    const [error, updateTodoDto] = UpdateTodoDto.create({ ...req.body, id });
    if (error) return res.status(400).json({ error });

    new UpdateTodo(this.todoReposiroty)
      .execute(updateTodoDto!)
      .then((todo) => res.json(todo))
      .catch((error) => res.status(400).json({ error }));
  };

  public deleteTodo = (req: Request, res: Response) => {
    const id = +req.params.id;

    new DeleteTodo(this.todoReposiroty)
      .execute(id)
      .then((todo) => res.json(todo))
      .catch((error) => res.status(400).json({ error }));
  };
}

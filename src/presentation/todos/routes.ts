import { Router } from 'express';
import { TodosController } from './controller';
import { TodoDataSourceImpl } from '../../infrastructure/datasource/todo.datasource.impl';
import { TodoRepositoryImpl } from '../../infrastructure/repositories/todo.repository.impl';

export class TodoRoutes {
  static get routes(): Router {
    const router = Router();

    const datasource = new TodoDataSourceImpl();
    const updateTodoDto = new TodoRepositoryImpl(datasource);
    const todoController = new TodosController(updateTodoDto);

    router.get('/', todoController.getTodos);
    router.get('/:id', todoController.getTodoById);

    router.post('/', todoController.createTodo);
    router.put('/:id', todoController.updateTodo);
    router.delete('/:id', todoController.deleteTodo);

    return router;
  }
}

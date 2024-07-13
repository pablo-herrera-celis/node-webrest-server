import { TodoEntity } from '../entities/todo.entity';
import { CreateTodoDto } from '../dtos/todos/create-todo.dto';
import { UpdateTodoDto } from '../dtos/todos/update-todo.dto';

export abstract class TodoRepository {
  abstract create(CreateTodoDto: CreateTodoDto): Promise<TodoEntity>;

  //todo: paginacion
  abstract getAll(): Promise<TodoEntity[]>;

  abstract findById(id: number): Promise<TodoEntity>;
  abstract updateById(UpdateTodoDto: UpdateTodoDto): Promise<TodoEntity>;
  abstract deleteById(id: number): Promise<TodoEntity>;
}

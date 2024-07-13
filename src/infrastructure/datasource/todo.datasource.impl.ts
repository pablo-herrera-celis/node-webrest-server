import { prisma } from '../../data/postgres';
import { CreateTodoDto, TodoDataSource, TodoEntity, UpdateTodoDto } from '../../domain';

export class TodoDataSourceImpl implements TodoDataSource {
  create(CreateTodoDto: CreateTodoDto): Promise<TodoEntity> {
    throw new Error('Method not implemented.');
  }
  async getAll(): Promise<TodoEntity[]> {
    const todos = await prisma.todo.findMany();
    return [];
  }
  findById(id: number): Promise<TodoEntity> {
    throw new Error('Method not implemented.');
  }
  updateById(UpdateTodoDto: UpdateTodoDto): Promise<TodoEntity> {
    throw new Error('Method not implemented.');
  }
  deleteById(id: number): Promise<TodoEntity> {
    throw new Error('Method not implemented.');
  }
}

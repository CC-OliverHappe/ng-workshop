import { Body, Controller, Delete, Get, NotFoundException, Param, Post, Put } from '@nestjs/common';
import { ApiCreatedResponse, ApiNoContentResponse, ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import * as uuid from 'uuid';
import { ApiDefaultResponses, ErrorResponseDto } from '../shared';
import { CreateTodoDto, TodoDetailsDto, TodoDto, TodosDto, UpdateTodoDto } from './dto';

@Controller('todos')
@ApiTags('todos')
@ApiDefaultResponses()
export class TodosController {
  private readonly todos: TodoDetailsDto[] = [
    new TodoDetailsDto({ id: uuid.v4(), text: 'Todo1', isCompleted: false }),
    new TodoDetailsDto({ id: uuid.v4(), text: 'Todo2', isCompleted: false }),
    new TodoDetailsDto({ id: uuid.v4(), text: 'Todo3', isCompleted: false }),
    new TodoDetailsDto({ id: uuid.v4(), text: 'Todo4', isCompleted: true, completedAt: new Date() }),
    new TodoDetailsDto({ id: uuid.v4(), text: 'Todo5', isCompleted: true, completedAt: new Date() }),
  ];

  @Get('')
  @ApiOperation({ operationId: 'getTodos', description: 'Returns all todos.' })
  @ApiOkResponse({ type: TodosDto })
  async getTodos() {
    const result = new TodosDto();
    result.items = [];
    result.items.push(...this.todos.map((x) => new TodoDto(x)));
    return result;
  }

  @Post('')
  @ApiOperation({ operationId: 'postTodo', description: 'Creates the todo.' })
  @ApiCreatedResponse({ type: TodoDto })
  async postTodo(@Body() body: CreateTodoDto) {
    const todo = new TodoDetailsDto({ id: uuid.v4(), completedAt: body.isCompleted ? new Date() : undefined, ...body });
    this.todos.push(todo);
    return todo;
  }

  @Put(':id')
  @ApiOperation({ operationId: 'putTodo', description: 'Updates the todo.' })
  @ApiOkResponse({ type: TodoDto })
  @ApiNotFoundResponse({ type: ErrorResponseDto, description: 'Todo not found.' })
  async putTodo(@Param('id') id: string, @Body() body: UpdateTodoDto) {
    const todo = this.todos.find((x) => x.id === id);
    if (!todo) {
      throw new NotFoundException(`Todo with id ${id} not found.`);
    }

    if (typeof body.isCompleted === 'boolean') {
      todo.isCompleted = body.isCompleted;
      todo.completedAt = new Date();
    }

    if (typeof body.text === 'string') {
      todo.text = body.text;
    }

    return todo;
  }

  @Delete(':id')
  @ApiOperation({ operationId: 'deleteTodo', description: 'Deletes the todo.' })
  @ApiNoContentResponse()
  @ApiNotFoundResponse({ type: ErrorResponseDto, description: 'Todo not found.' })
  async deleteTodo(@Param('id') id: string) {
    const todo = this.todos.find((x) => x.id === id);
    if (!todo) {
      throw new NotFoundException(`Todo with id ${id} not found.`);
    }

    this.todos.splice(this.todos.indexOf(todo), 1);
  }
}

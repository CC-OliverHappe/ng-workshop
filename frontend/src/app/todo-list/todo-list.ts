import {Component, inject, output } from '@angular/core';
import {TodoListItem} from '../todo-list-item/todo-list-item';
import {HttpClient} from '@angular/common/http';
import {AsyncPipe} from '@angular/common';
import {Todo} from '../types/Todo';
import { TodoStateService } from '../state/todo-state-service';

@Component({
  selector: 'app-todo-list',
  imports: [
    TodoListItem,
  ],
  templateUrl: './todo-list.html',
  styleUrl: './todo-list.css',
})
export class TodoList {
  private todoState = inject(TodoStateService)

  public todos = this.todoState.todos;

  onToggleComplete(todo: Todo) {
    this.todoState.toggleComplete(todo);
  }
}

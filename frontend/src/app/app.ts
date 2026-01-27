import {Component, inject, OnInit } from '@angular/core';
import {TodoList} from './todo-list/todo-list';
import { TodoStateService } from './state/todo-state-service';
import { TodoForm } from './todo-form/todo-form';
import { NewTodo, Todo } from './types/Todo';

@Component({
  selector: 'app-root',
  imports: [TodoList, TodoForm],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {
  private todoState = inject(TodoStateService)

  ngOnInit() {
    this.todoState.loadTodos();
  }

  onCreateTodo(newTodo: NewTodo)  {
    this.todoState.createTodo(newTodo);
  }
}

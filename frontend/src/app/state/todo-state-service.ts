import { computed, inject, Injectable, signal } from '@angular/core';
import { TodoHttpService } from '../http-services/todo-http-service';
import { NewTodo, Todo } from '../types/Todo';
import { map, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TodoStateService {
  private httpService = inject(TodoHttpService)

  public todos = computed(() => [...this.openTodos(), ...this.completedTodos()])
  private openTodos = signal<Todo[]>([]);
  private completedTodos = signal<Todo[]>([]);

  public loadTodos() {
    this.httpService.getTodos().pipe(
      tap(result => this.updateTodos(result.items))
    ).subscribe()
  }

  public createTodo(newTodo: NewTodo) {
    this.httpService.postTodo(newTodo).pipe(
      map(result => [result, ...this.todos()]),
      tap(newTodos => this.updateTodos(newTodos))
    ).subscribe()
  }

  public toggleComplete(todo: Todo) {
    this.httpService.putTodo(todo).pipe(
      map(result => [result, ...this.todos().filter(t => t.id !== todo.id)]),
      tap(newTodos => this.updateTodos(newTodos))
    ).subscribe()
  }

  private updateTodos(todos: Todo[]) {
    this.openTodos.set(todos.filter(t => !t.isCompleted));
    this.completedTodos.set(todos.filter(t => t.isCompleted));
  }
}

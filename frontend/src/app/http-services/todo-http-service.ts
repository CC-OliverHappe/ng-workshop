import { inject, Injectable } from '@angular/core';
import { NewTodo, Todo } from '../types/Todo';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class TodoHttpService {
  private httpClient = inject(HttpClient);

  getTodos() {
   return this.httpClient.get<{items: Todo[]}>('http://localhost:3100/todos')
  }
  postTodo(newTodo: NewTodo) {
   return this.httpClient.post<Todo>('http://localhost:3100/todos', newTodo)
  }
  putTodo(todo: Todo) {
    const payload = { text: todo.text, isCompleted: !todo.isCompleted };
    return this.httpClient.put<Todo>('http://localhost:3100/todos/' + todo.id, payload)
  }
}

import {Component, input, OnChanges, output, signal } from '@angular/core';
import {Todo} from '../types/Todo';
import { FormsModule } from '@angular/forms';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-todo-list-item',
  imports: [
    FormsModule
  ],
  templateUrl: './todo-list-item.html',
  styleUrl: './todo-list-item.css',
})
export class TodoListItem implements OnChanges{
  todo = input.required<Todo>();
  toggleComplete = output<void>();
  public isLoading = signal(false);

  ngOnChanges() {
    this.isLoading.set(false);
  }

  protected onNgModelChange() {
    this.isLoading.set(true);
    this.toggleComplete.emit();
  }
}

import { Component, output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NewTodo } from '../types/Todo';

@Component({
  selector: 'app-todo-form',
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './todo-form.html',
  styleUrl: './todo-form.css',
})
export class TodoForm {
  public createTodo = output<NewTodo>()

  public formGroup = new FormGroup({
    text: new FormControl<string>('', Validators.required)
  });

  onSubmit() {
    const text = this.formGroup.get('text')?.value ?? '';
    const newTodo: NewTodo = {
      isCompleted: false,
      text
    }
    this.createTodo.emit(newTodo)
    this.formGroup.reset();
  }
}

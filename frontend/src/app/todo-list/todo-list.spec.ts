import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TodoList } from './todo-list';
import { TodoListItem } from '../todo-list-item/todo-list-item';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { TodoStateService } from '../state/todo-state-service';
import { MOCK_TODOS } from '../../test/mock-data';

describe('TodoList', () => {

  let component: TodoList;
  let fixture: ComponentFixture<TodoList>;
  let httpTesting: HttpTestingController;
  let state: TodoStateService

  const loadTodos = async () => {
    state.loadTodos();
    httpTesting.expectOne('http://localhost:3100/todos').flush({items: MOCK_TODOS});
    await fixture.whenStable();
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TodoList, TodoListItem],
      providers: [provideHttpClient(), provideHttpClientTesting()],
    })
    .compileComponents();

    fixture = TestBed.createComponent(TodoList);
    component = fixture.componentInstance;
    httpTesting = TestBed.inject(HttpTestingController);
    state  = TestBed.inject(TodoStateService);
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show a list of todos', async () => {
    await loadTodos();
    const elements = fixture.nativeElement.querySelectorAll('app-todo-list-item');
    expect(elements.length).toBe(MOCK_TODOS.length);
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TodoList } from './todo-list';
import { TodoListItem } from '../todo-list-item/todo-list-item';

describe('TodoList', () => {
  let component: TodoList;
  let fixture: ComponentFixture<TodoList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TodoList, TodoListItem]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TodoList);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  //  v   achte drauf .skip zu entfernen
  it.skip('should show a list of todos', () => {

  });

  //  v   achte drauf .skip zu entfernen
  it.skip('should pass-through toggleComplete Events and show a refreshed list', () => {
    // Für diesen Test wirst du alle bisher genutzten Techniken benötigen:
    //  * simulierte UI-Interaktionen
    //  * API-Request Mocking (oder Service Mocking wenn du eher den StateService mocken willst)
  });
});

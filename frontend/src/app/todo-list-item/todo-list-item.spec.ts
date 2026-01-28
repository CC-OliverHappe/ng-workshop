import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TodoListItem } from './todo-list-item';
import { inputBinding, signal } from '@angular/core';
import { MOCK_TODOS } from '../../test/mock-data';

describe('TodoListItem', () => {
  let component: TodoListItem;
  let fixture: ComponentFixture<TodoListItem>;

  let inputTodo = signal(MOCK_TODOS[0])

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TodoListItem],
    })
    .compileComponents();

    fixture = TestBed.createComponent(TodoListItem, {
      bindings: [
        inputBinding('todo', inputTodo), // <-- Binde Testdaten an die Inputs der component
      ]

    });
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show Todo text', () => {
    const nativeElement: HTMLDivElement = fixture.nativeElement; // <-- Das gerenderte HTML Element der component
    expect(nativeElement.textContent).toContain(component.todo().text);
  })

  it('should emit toggle on checkbox click', async () => {
    const checkboxElem: HTMLInputElement = fixture.nativeElement.querySelector('input[type="checkbox"]'); // <-- Query für DOM-Elemente
    const outputSpy = vi.spyOn(component.toggleComplete, 'emit'); // <-- Spy für component output
    checkboxElem.click(); // <-- Klick auf Checkbox

    await fixture.whenStable(); // <-- Angular ChangeDetection abwarten - (meistens) nötig nach einer DOM-Interaktion

    expect(outputSpy).toHaveBeenCalled(); // <-- Output wurde aufgerufen
    expect(checkboxElem.disabled).toBe(true) // <-- Checkbox ist disabled

    inputTodo.set({...MOCK_TODOS[0], isCompleted: true}) // <-- "API" antwortet mit updated Todo

    await fixture.whenStable(); // <-- Angular ChangeDetection abwarten - immer nötig nach "manuellem" update eines Inputs

    expect(checkboxElem.hasAttribute('disabled')).toBe(false) // <-- Checkbox ist nicht mehr disabled
  })

  //  v   achte drauf .skip zu entfernen
  it.skip('should show completed todos with line-through text', () => {

  });

  //  v   achte drauf .skip zu entfernen
  it.skip('should display the correct aria-label based on component status', () => {

  });
});

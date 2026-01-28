import { TestBed } from '@angular/core/testing';

import { TodoStateService } from './todo-state-service';
import { TodoHttpService } from '../http-services/todo-http-service';
import { of, take } from 'rxjs';
import { MOCK_TODOS } from '../../test/mock-data';
import { Mocked } from 'vitest';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';


/**
 * Diese Variante des Mockings zeigt das generelle Mocking von Services via
 * überschriebenen providern am Beispiel des TodoHttpService.
 *
 * Dieser Ansatz ist empfehlenswert wenn du komplexere Business-Logic mocken willst.
 *
 * @see https://angular.dev/guide/testing/services
 */
describe('TodoStateService - Service Mocking', () => {
  const MockTodoHttpService: Mocked<Partial<TodoHttpService>> = {
    getTodos: vi.fn(() => of({items: MOCK_TODOS}).pipe(take(1))) // mock function mit einem observable das nur einmal einen Wert emitted (.pipe(take(1)) )
  }

  let stateService: TodoStateService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [{provide: TodoHttpService, useValue: MockTodoHttpService}] // provider "überschreiben" um Mock statt des echten Service zu nutzen
    });
    stateService = TestBed.inject(TodoStateService); //
  });

  it('should be created', () => {
    expect(stateService).toBeTruthy();
  });

  it('should load todos', () => {
    stateService.loadTodos();
    expect(stateService.todos()).toHaveLength(5);
  });

  //  v   achte drauf .skip zu entfernen
  it.skip('should create todo', () => {
    //
  })

  //  v   achte drauf .skip zu entfernen
  it.skip('should update todos', () => {
    //
  })
});

/**
 * Diese Variante des Mockings zeigt das spezifische Mocking von Services die
 * den HTTPClient nutzen.
 *
 * Dieser Ansatz ist empfehlenswert um möglichst nah an deiner API zu mocken.
 *
 * @see https://angular.dev/guide/http/testing
 */
describe('TodoStateService - HTTPClient Mocking', () => {
  let stateService: TodoStateService;
  let httpTesting: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });
    httpTesting = TestBed.inject(HttpTestingController);
    stateService = TestBed.inject(TodoStateService);
  });

  it('should be created', () => {
    expect(stateService).toBeTruthy();
  });

  it('should load todos', () => {
    stateService.loadTodos(); // auslösen des GET-Requests
    const pendingRequest = httpTesting.expectOne('http://localhost:3100/todos'); // <-- HttpTestingController abfragen ob der Request pending ist
    expect(pendingRequest.request.method).toBe('GET'); // <-- Wir können assertions auf dem request machen

    pendingRequest.flush({items: MOCK_TODOS}); // <-- Response mit mock-value beantworten
    expect(stateService.todos()).toHaveLength(5);
  });

  //  v   achte drauf .skip zu entfernen
  it.skip('should create todo', () => {
    //
  })

  //  v   achte drauf .skip zu entfernen
  it.skip('should update todos', () => {
    //
  })
});

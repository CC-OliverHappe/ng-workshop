# NgWorkshop

## Aufgaben

1. Checkout Repo & npm install
2. Zeige die Todos aus der `data/todos.ts` Datei in deiner app.component an
3. Extrahiere sinnvolle Components
   * zum Beispiel: `TodoList` und `TodoItem`
4. Lade die Daten statt aus Todos.ts von der Api (GET `/todos`)
   * nutze den `HttpClient`
5. Erstelle einen `TodoHttpService` um die Daten zu laden
6. Erstelle einen `TodoStateService` welcher die geladenen Daten als Signal bereitstellt
7. Erstelle eine Component um Todos hinzuzufügen 
   * Erstelle ein Formularfeld und einen Submit Button - nutze `ReactiveForms`
   * Erstelle `createTodo` im StateService und rufe die API im HttpService auf (POST `/todos`)
8. Implementiere das Abschließen von Todos
   * Output aus TodoItem
   * Calle PUT `/todos/:id`
   * Aktuellen Zustand im State abbilden
   * Zeige den Zustand eines Todos im UI
9. Zeige eine Summary deiner Todos (Offen / Gesamt && Abgeschlossene Todos) im UI an
   * nutze computed um den Zustand abzuleiten
10. Lege eine neue Route im Angular-Router an und zeige die TodoList über RouterOutlet an
    * Nutze Lazy-Loading
11. Erstelle eine `TodoDetail`-Component
    * Löse sie über den Angular Router auf (ID als `RouteParameter`)
    * Zeige das Todo an (Wie bekomme ich ein Item aus dem State?)
12. Erstelle einen `RouteGuard` - Prüfe ob die ID im RouteParameter existiert und valide ist
13. Erstelle eine `DateFormat`-Pipe um den createdAt und finishedAt Timestamps als formatierte Datumsangaben anzuzeigen

## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running unit tests

To execute unit tests with the [Vitest](https://vitest.dev/) test runner, use the following command:

```bash
ng test
```

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.

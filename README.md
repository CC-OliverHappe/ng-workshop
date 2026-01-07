# NgWorkshop

Dieser Workshopinhalt führt dich Schritt für Schritt durch die Entwicklung einer modernen Todo-Anwendung mit Angular. Du lernst dabei die wichtigsten Konzepte wie Components, Services, Signals, Routing und HTTP-Kommunikation kennen.

## Voraussetzungen

- Node.js und npm installiert
- Grundkenntnisse in TypeScript
- Ein Code-Editor (z.B. VS Code)

## Setup

### 0. Repository auschecken und Abhängigkeiten installieren

Klone das Repository und installiere alle benötigten Pakete:
```bash
git clone 
cd 
npm install
```

Starte die Entwicklungsumgebung mit `ng serve` und öffne die App im Browser unter `http://localhost:4200`.

### 1. Starte die Beispiel-API

```bash
cd api
npm install
npm run dev
```

Öffne die API-Dokumentation unter `http://localhost:3100/api`.

## Grundlegende Implementierung

### 2. Todos in der App anzeigen

**Lernziel:** Verstehen, wie Daten in Angular Components dargestellt werden.

- Importiere die Todos aus `src/app/data/todos.ts` in die `AppComponent`
- Zeige die Todo-Liste im Template an
- Gib für jedes Todo mindestens den Titel aus

**Hinweis:** Nutze die `@for`-Syntax für das Rendering der Liste.

---

### 3. Sinnvolle Components extrahieren

**Lernziel:** Component-basierte Architektur und Wiederverwendbarkeit verstehen.

Extrahiere die Todo-Darstellung in separate Components:

- **`TodoListComponent`**: Zeigt die gesamte Liste der Todos an
- **`TodoItemComponent`**: Stellt ein einzelnes Todo dar

**Best Practice:** Jede Component sollte eine klar definierte Verantwortlichkeit haben. Nutze `@Input()` um Daten an Child-Components zu übergeben.

---

## API-Integration

### 4. Todos über eine API laden

**Lernziel:** HTTP-Kommunikation in Angular mit dem `HttpClient`.

- Entferne die statischen Imports aus `todos.ts`
- Lade die Todos stattdessen von der API
- **Endpoint:** `GET /todos`
- Importiere `HttpClient` in deine Component
- Speichere die geladenen Todos in einer Component-Property

**Tipp:** Vergiss nicht, den `HttpClient` im `provideHttpClient()` bereitzustellen (in `app.config.ts` oder `main.ts`).

---

### 5. HTTP-Service erstellen

**Lernziel:** Separation of Concerns durch dedizierte Services.

Erstelle einen `TodoHttpService`, der alle API-Aufrufe kapselt:
```bash
ng generate service services/todo-http
```

- Lagere die HTTP-Logik aus der Component in den Service aus
- Der Service sollte Methoden für alle API-Aufrufe bereitstellen
- Injiziere den Service in die Component

**Vorteil:** Wiederverwendbarkeit und einfachere Testbarkeit.

---

## State Management mit Signals

### 6. State-Service mit Signals

**Lernziel:** Modernes State Management mit Angular Signals.

Erstelle einen `TodoStateService`, der den globalen Zustand verwaltet:
```bash
ng generate service services/todo-state
```

- Nutze `signal()` für den Todo-State
- Stelle die Todos als `Signal<Todo[]>` bereit
- Implementiere Methoden zum Laden und Aktualisieren der Todos
- Der Service sollte den `TodoHttpService` nutzen

**Architektur:** 
- `TodoHttpService` → API-Aufrufe
- `TodoStateService` → Zustandsverwaltung
- Components → Darstellung

---

## CRUD-Operationen

### 7. Todos hinzufügen

**Lernziel:** Formulare mit Reactive Forms und POST-Requests.

Erstelle eine Component für neue Todos:
```bash
ng generate component components/todo-form
```

Implementiere folgende Features:
- Formular mit `ReactiveFormsModule`
- Eingabefeld für den Todo-Titel
- Submit-Button
- Validierung (z.B. Pflichtfeld, Mindestlänge)

Erweitere den `TodoStateService`:
- Füge eine `createTodo()`-Methode hinzu
- Aktualisiere das Signal nach erfolgreicher Erstellung

Erweitere den `TodoHttpService`:
- **Endpoint:** `POST /todos`
- Übergib die neuen Todo-Daten im Request-Body

---

### 8. Todos abschließen

**Lernziel:** Component-Kommunikation mit Outputs und PUT-Requests.

Implementiere die Möglichkeit, Todos als erledigt zu markieren:

- Füge einen Button oder Checkbox in `TodoItemComponent` hinzu
- Emitte ein `@Output()` Event, wenn der Status geändert wird
- Fange das Event in der Parent-Component ab
- Aktualisiere das Todo über die API:
  - **Endpoint:** `PUT /todos/:id`
- Aktualisiere den State im `TodoStateService`

Stelle den Status visuell dar:
- Durchgestrichener Text für erledigte Todos
- Unterschiedliche Farben oder Icons

**Tipp:** Nutze CSS-Klassen basierend auf dem Todo-Status.

---

### 9. Todo-Summary anzeigen

**Lernziel:** Abgeleitete Werte mit `computed()`.

Erstelle eine Übersicht mit Statistiken:
- Anzahl offener Todos
- Anzahl abgeschlossener Todos
- Gesamtanzahl

Zeige die Werte in einer separaten Component oder im Header an.

---

## Routing und Navigation

### 10. Routing hinzufügen

**Lernziel:** Single-Page-Application mit Angular Router und Lazy Loading.

Konfiguriere das Routing in deiner App:

- Definiere Routes in der `app.routes.ts`
- Zeige die `TodoListComponent` über ein `<router-outlet>` an
- Implementiere Lazy Loading für bessere Performance:

Erstelle eine Navigation mit `routerLink`-Direktiven.

---

### 11. Todo-Detailansicht

**Lernziel:** Route-Parameter und Detail-Views.

Erstelle eine Detailansicht für einzelne Todos:
```bash
ng generate component components/todo-detail
```

In der Component:
- Lese die ID aus den Route-Parametern (`ActivatedRoute`)
- Hole das entsprechende Todo aus dem `TodoStateService`
- Nutze `computed()` um das Todo basierend auf der ID zu filtern

Zeige detaillierte Informationen an:
- Titel
- Beschreibung
- Status
- Erstellt am / Abgeschlossen am

**Herausforderung:** Wie kann ein einzelnes Todo effizient aus dem State-Signal gelesen werden?

---

### 12. Route Guard implementieren

**Lernziel:** Routing absichern mit Guards.

Erstelle einen Guard, der ungültige Zugriffe verhindert:
```bash
ng generate guard guards/todo-exists
```

Der Guard soll:
- Die ID aus den Route-Parametern auslesen
- Prüfen, ob die ID valide ist (z.B. numerisch)
- Prüfen, ob ein Todo mit dieser ID existiert
- Bei ungültiger ID: Weiterleitung zur Todo-Liste


---

## Fortgeschrittene Features

### 13. Eigene Pipe für Datumsformatierung

**Lernziel:** Custom Pipes für wiederverwendbare Transformationen.

Erstelle eine Pipe für benutzerfreundliche Datumsanzeige:
```bash
ng generate pipe pipes/date-format
```

Die Pipe soll:
- Timestamps in ein lesbares Format umwandeln
- Optional verschiedene Formate unterstützen (z.B. kurz, lang)
- Mit null/undefined-Werten umgehen können

Nutze die Pipe in den Templates:
```html
Erstellt: {{ todo.createdAt | dateFormat }}
Abgeschlossen: {{ todo.finishedAt | dateFormat:'long' }}
```
---

## Zusammenfassung

Herzlichen Glückwunsch! Du hast eine vollständige Angular-Anwendung erstellt und dabei folgende Konzepte gelernt:

✅ Component-basierte Architektur  
✅ HTTP-Kommunikation mit APIs  
✅ State Management mit Signals  
✅ Reactive Forms  
✅ Routing und Lazy Loading  
✅ Route Guards  
✅ Custom Pipes  

## Nächste Schritte

- **Testing:** Schreibe Unit-Tests für Services und Components
- **Error Handling:** Implementiere eine globale Fehlerbehandlung
- **Loading States:** Zeige Ladeindikatoren während API-Aufrufen
- **Offline Support:** Nutze Service Workers für PWA-Features
- **Styling:** Verbessere das UI mit Angular Material oder Tailwind CSS

---

## Ressourcen

- [Angular Dokumentation](https://angular.dev)
- [Angular Signals Guide](https://angular.dev/guide/signals)
- [Angular Router Guide](https://angular.dev/guide/routing)

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

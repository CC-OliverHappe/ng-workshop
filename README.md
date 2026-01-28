# NgWorkshop

Dieser Workshopinhalt führt dich Schritt für Schritt durch die Entwicklung einer modernen Todo-Anwendung mit Angular. Du lernst dabei die wichtigsten Konzepte wie Components, Services, Signals, Routing und HTTP-Kommunikation kennen.

## Voraussetzungen

- Node.js und npm installiert
- Grundkenntnisse in TypeScript
- Eine IDE

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

## Erste Session - Grundlegende Implementierung

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

## Ressourcen

- [Angular Dokumentation](https://angular.dev)
- [Angular Signals Guide](https://angular.dev/guide/signals)
- [Angular Router Guide](https://angular.dev/guide/routing)

---

# Zweite Session - Testing

In der zweiten Session werden wir uns dem Testing von Angular Components und Services widmen.
Wir werden uns auf zwei zentrale Test-Strategien konzentrieren:

* Unit-Testing für Business-Logik
* Component-Testing für UI-Interaktionen

Als Test-Runner nutzen das Projekt Vitest. Starte die Tests entweder über deine IDE oder mit `npm run test`

### Tipps:

* Vermeide es, Implementierungsdetails zu testen. Ein guter Frontend-Test definiert einen Input (Event, User-Interaktion, Function-Call, etc...) der aus der Nutzung der Anwendung ensteht, und testet deren Effekte auf das UI und die API.
* Bedenke, dass Nutzende auf unterschiedliche Weise mit dem UI interagieren. z.B. Maus- und Tastaturbedienung oder auch fehlerhafte Bedienung (z.B. leeres Formular abschicken). Teste nicht nur den Happy-Path deiner Anwendung.
* Zu enge UI-Tests können Refactorings signifikant erschweren. Nutze bei UI-Queries Selektoren so, dass sie dein HTML nicht in Stein gießen.
  `data-testid` Attribute sind hier sehr hilfreich, (z.B. `data-testid="my-target-item"`) anstelle von strikten Selektoren wie `div > div > label ~ input`. Teste die **Semantik** deines html's, nicht die Struktur.


1. Starte im `todo-state-service.spec.ts` Test-File

* Einzelne Tests sind bereits angelegt - Sie helfen dir bei der Implementierung der fehlenden Test-Cases
* Beachte, dass in diesem Test-File zwei verschiedene herangehensweisen beschrieben sind
* Der Fokus dieses Test-Files liegt auf dem Mocking von Services und Testen von Business-Logik

2. Öffne `todo-list-item.spec.ts`

* Auch hier sind schon Test-Cases die dir beim Start helfen können definiert.
* Der Fokus liegt auf dem Testen von UI-Interaktionen und dem "Mocken" des Users

3. Öffne `todo-list.spec.ts`

* Die Tests in dieser Component werden etwas herausfordender sein und Techniken aus den ersten beiden Schritten vorraussetzen

4. Öffne `todo-form.spec.ts`

* In dieser Component sind die UI-Interaktionen etwas komplexer.
* Versuche unterschiedliche Nutzungsarten zu testen (Mausbedienung, Tastaturbedienung)

5. Vervollständigen der Tests in `app.spec.ts` und `todo-http-service.spec.ts`

---

## Fragen aus der Session

1. Wie mocke ich component von libraries die ich in meinem Test nicht betrachten möchte (z.B. PrimeNG Components)?

> Mit Component-Stubs lässt sich eine Component im Template mit einer Mock-Implementierung überschreiben und rendern. https://angular.dev/guide/testing/components-scenarios#stubbing-unneeded-components
> Mit dem Angular `fixture.debugElement` lassen sich Events (outputs, click, etc...) auf den stubs simulieren.

2. Wie kann ich komplexere Mocks schnell erstellen?

> https://www.npmjs.com/package/ng-mocks ngMocks ist eine ziemlich mächtige Mocking Library um umfangreiche Mocks zu erstellen. Zusätzlich kann es eine gute Idee sein,
> komplexere Mocks global zu definieren und bei Bedarf zu importieren. Bei häufig genutzten Mocks (z.B. i18n oder UserState) kann man diese auch in der jest config für alle Tests bereitstellen.

3. Wie typisiere ich partielle Mocks?

> s. Typescripts Utility Types https://www.typescriptlang.org/docs/handbook/utility-types.html
> Besonders nützlich: Partial<T>, Omit<T> (bzw. Exclude<T>) und Pick<T> (bzw. Extract<T>)

4. Wie teste ich komplexere User-Interaktionen (z.B. Tastaturnavigation)?

> Mit der Angular Testing Library  (https://testing-library.com/docs/angular-testing-library/intro/) lassen sich User-Interaktionen sehr realistisch simulieren.
> Außerdem bietet Testing Library viele Assertions um UI-Zustände spezifischer zu testen. (z.B. expect(element).toBeVisible())

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

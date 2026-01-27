export interface Todo {
  id: string;
  text: string;
  isCompleted: boolean;
}

export type NewTodo = Omit<Todo, 'id' | 'completedAt'>;

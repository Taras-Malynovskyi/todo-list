export interface ITodoItem {
  id: string;
  todo: string;
  selected: boolean;
  completed: boolean;
}

export interface ITodoListProps {
  todoList: ITodoItem[];
  chekTodo(todoItem: ITodoItem): void;
  deleteTodo(id: string): void;
}

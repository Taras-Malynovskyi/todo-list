import { ITodoItem } from "../InterfacesModals";
import { makeAutoObservable } from "mobx";

class TodoStore {
  todo: string = "";
  todoList: ITodoItem[] = [];

  doneTodo: number = 0;
  allTodo: number = 0;

  doneList: boolean = false;

  searchTodo: string = "";
  searchList: ITodoItem[] = [];

  constructor() {
    makeAutoObservable(this);
  }

  handleChangeTodo(value: string) {
    this.todo = value;
  }

  addTodo(todoItem: ITodoItem) {
    this.todoList.push(todoItem);
    this.todo = "";
    this.allTodo = this.allTodo + 1;
  }

  deleteTodo(id: string) {
    this.todoList = this.todoList.filter((todo) => todo.id !== id);
    this.countDoneAndAllTodo();
  }

  setDoneTodo(id: string) {
    this.todoList = this.todoList.map((todo) =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    );
    this.countDoneAndAllTodo();
  }

  countDoneAndAllTodo() {
    this.allTodo = this.todoList.length;
    this.doneTodo = this.todoList.filter(
      (item) => item.completed === true
    ).length;
  }

  showDoneList() {
    this.doneList = !this.doneList;
  }

  clearSearch() {
    this.searchList = [];
    this.searchTodo = "";
  }

  handleChangeSearch(value: string) {
    this.searchTodo = value;
  }

  search(list: ITodoItem[]) {
    this.searchList = list;
  }

  deleteSearchTodo(id: string) {
    this.searchList = this.searchList.filter((todo) => todo.id !== id);
    this.deleteTodo(id);
  }

  setDoneSearchTodo(id: string) {
    this.searchList = this.searchList.map((todo) =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    );
    this.setDoneTodo(id);
  }

  setSelectedTodo(id: string) {
    this.todoList = this.todoList.map((todo) =>
      todo.id === id ? { ...todo, selected: !todo.selected } : todo
    );
    this.countDoneAndAllTodo();
  }

  deleteSelected() {
    this.todoList = this.todoList.filter((todo) => todo.selected !== true);
    this.countDoneAndAllTodo();
  }

  setDoneSelected() {
    this.todoList = this.todoList.map((todo) =>
      todo.selected === true
        ? { ...todo, completed: true, selected: false }
        : todo
    );
    this.countDoneAndAllTodo();
  }

  setUndoSelected() {
    this.todoList = this.todoList.map((todo) =>
      todo.selected === true
        ? { ...todo, completed: false, selected: false }
        : todo
    );
    this.countDoneAndAllTodo();
  }
}

export default new TodoStore();

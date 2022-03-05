import { Injectable } from '@angular/core';
import { Todo } from './todo-list';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  todos: Todo[] = [];
  todo: Todo;
  constructor() {
    this.todo = new Todo();
  }

  getAllTodos() {
    const records = localStorage.getItem('todoList');
    if (records !== null) {
      return JSON.parse(records);
    }
  }

  addTodo(todo: Todo) {
    const records = localStorage.getItem('todoList');
    let id;
    if (records !== null) {
      const todoList = JSON.parse(records);
      id = todoList.length + 1;
    } else {
      id = 1;
    }

    todo.id = id;
    const oldTodos = localStorage.getItem('todoList');
    if (oldTodos !== null) {
      const todoList = JSON.parse(oldTodos);
      todoList.push(todo);
      localStorage.setItem('todoList', JSON.stringify(todoList));
    } else {
      const todoArr = [];
      todoArr.push(todo);
      localStorage.setItem('todoList', JSON.stringify(todoArr));
    }
  }

  updateTodo(id: number, updateTodos: Todo) {
    const records = localStorage.getItem('todoList');
    if (records !== null) {
      const todoList = JSON.parse(records);
      todoList.splice(
        todoList.findIndex((a: any) => a.id == id),
        1
      );
      todoList.push(updateTodos);
      localStorage.setItem('todoList', JSON.stringify(todoList));
    }
  }

  deleteTodo(id: number) {
    const records = localStorage.getItem('todoList');
    if (records !== null) {
      const todoList = JSON.parse(records);
      todoList.splice(
        todoList.findIndex((a: any) => a.id == id),
        1
      );
      localStorage.setItem('todoList', JSON.stringify(todoList));
    }
  }
}

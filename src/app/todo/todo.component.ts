import { Component, OnInit } from '@angular/core';
import { Todo } from '../shared/todo-list';
import { TodoService } from '../shared/todo.service';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss'],
})
export class TodoComponent implements OnInit {
  todos: Todo[] = [];
  todo: Todo;
  todoId = null;
  edit = false;

  constructor(private todoService: TodoService) {
    this.todo = new Todo();
  }

  ngOnInit(): void {
    this.todos = this.todoService.getAllTodos();
  }

  saveTodo(id: any) {
    if (this.edit === false) {
      if (this.todo.text !== '') {
        this.todoService.addTodo(this.todo);
        this.todo.text = '';
        this.todos = this.todoService.getAllTodos();
      }
    } else {
      this.todoService.updateTodo(id, this.todo);
      this.todoId = null;
      this.todo.text = '';
      this.todos = this.todoService.getAllTodos();
      this.edit = false;
    }
  }

  get buttonText() {
    if (this.edit === false) {
      return 'Add';
    }
    return 'Edit';
  }

  getTodoById(id: any) {
    const records = localStorage.getItem('todoList');
    if (records !== null) {
      const todoList = JSON.parse(records);
      const currentTodo = todoList.find((m: any) => m.id == id);
      if (currentTodo !== undefined) {
        this.todoId = currentTodo.id;
        this.todo.text = currentTodo.text;
      }
    }
    this.edit = true;
  }

  deleteTodo(id: any) {
    if (confirm('Are you sure to delete this todo?')) {
      this.todoService.deleteTodo(id);
      this.edit = false;
      this.todo.text = '';
      this.todos = this.todoService.getAllTodos();
    }
  }
}

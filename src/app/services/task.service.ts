import { Injectable } from '@angular/core';
import { Task } from '../models/task.model';

const STORAGE_KEY = 'todo_tasks';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private tasks: Task[] = [];

  constructor() {
    this.loadTasks();
  }

  private loadTasks(): void {
    const stored = localStorage.getItem(STORAGE_KEY);
    this.tasks = stored ? JSON.parse(stored) : [];
  }

  private saveTasks(): void {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(this.tasks));
  }

  getTasks(): Task[] {
    return [...this.tasks];
  }

  addTask(title: string, categoryId: string = 'general'): void {
    const newTask: Task = {
      id: Date.now().toString(),
      title: title.trim(),
      completed: false,
      createdAt: Date.now(),
      categoryId,
    };

    this.tasks.unshift(newTask);
    this.saveTasks();
  }

  toggleTask(taskId: string): void {
    const index = this.tasks.findIndex((t) => t.id === taskId);
    if (index > -1) {
      this.tasks[index] = {
        ...this.tasks[index],
        completed: !this.tasks[index].completed,
      };
      this.saveTasks();
    }
  }

  deleteTask(taskId: string): void {
    this.tasks = this.tasks.filter((t) => t.id !== taskId);
    this.saveTasks();
  }

  completeSelectedTasks(): void {
    this.tasks = this.tasks.map((task) =>
      task.selected && !task.completed
        ? { ...task, completed: true, selected: false }
        : task,
    );
    this.saveTasks();
  }

  getTasksByCategory(categoryId: string): Task[] {
    return this.tasks.filter((task) => task.categoryId === categoryId);
  }
}

import { Component, OnInit } from '@angular/core';
import { TaskService } from '../services/task.service';
import { Task } from '../models/task.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  tasks: Task[] = [];
  newTaskTitle = '';

  constructor(private taskService: TaskService) {}

  ngOnInit(): void {
    this.loadTasks();
  }

  loadTasks(): void {
    this.tasks = this.taskService.getTasks();
  }

  addTask(): void {
    if (!this.newTaskTitle.trim()) {
      return;
    }

    this.taskService.addTask(this.newTaskTitle);
    this.newTaskTitle = '';
    this.loadTasks();
  }

  toggleTask(taskId: string): void {
    this.taskService.toggleTask(taskId);
    this.loadTasks();
  }

  deleteTask(taskId: string): void {
    this.taskService.deleteTask(taskId);
    this.loadTasks();
  }

  toggleSelection(task: Task): void {
    task.selected = !task.selected;
  }

  completeSelected(): void {
    this.taskService.completeSelectedTasks();
    this.loadTasks();
  }

  hasSelectedTasks(): boolean {
    return this.tasks.some((t) => t.selected);
  }

  selectedCount(): number {
  return this.tasks.filter(t => t.selected).length;
}
}

import { Component, OnInit } from '@angular/core';
import { TaskService } from '../services/task.service';
import { CategoryService } from '../services/category.service';
import { Task } from '../models/task.model';
import { Category } from '../models/category.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  tasks: Task[] = [];
  categories: Category[] = [];

  newTaskTitle: string = '';
  selectedCategoryId: string = 'general';

  filterCategoryId: string = 'all';

  constructor(
    private taskService: TaskService,
    private categoryService: CategoryService,
  ) {}

  ngOnInit(): void {
    this.loadCategories();
    this.loadTasks();
  }

  loadTasks(): void {
    if (this.filterCategoryId === 'all') {
      this.tasks = this.taskService.getTasks();
    } else {
      this.tasks = this.taskService.getTasksByCategory(this.filterCategoryId);
    }
  }

  loadCategories(): void {
    this.categories = this.categoryService.getCategories();
  }

  addTask(): void {
    if (!this.newTaskTitle.trim()) return;

    this.taskService.addTask(this.newTaskTitle, this.selectedCategoryId);

    this.newTaskTitle = '';
    this.selectedCategoryId = 'general';
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

  completeSelected(): void {
    this.taskService.completeSelectedTasks();
    this.loadTasks();
  }

  hasSelectedTasks(): boolean {
    return this.tasks.some((task) => task.selected);
  }

  selectedCount(): number {
    return this.tasks.filter((task) => task.selected).length;
  }

  getCategoryName(categoryId: string): string {
    const category = this.categories.find((c) => c.id === categoryId);
    return category ? category.name : 'General';
  }

  onFilterChange(): void {
    this.loadTasks();
  }
}

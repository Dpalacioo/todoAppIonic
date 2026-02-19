import { Injectable } from '@angular/core';
import { Category } from '../models/category.model';

const STORAGE_KEY = 'todo_categories';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  private categories: Category[] = [];

  constructor() {
    this.load();
  }

  private load(): void {
    const stored = localStorage.getItem(STORAGE_KEY);
    this.categories = stored
      ? JSON.parse(stored)
      : [{ id: 'general', name: 'General' }];
  }

  private save(): void {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(this.categories));
  }

  getCategories(): Category[] {
    return [...this.categories];
  }

  addCategory(name: string): void {
    this.categories.push({
      id: Date.now().toString(),
      name: name.trim(),
    });
    this.save();
  }

  deleteCategory(id: string): void {
    this.categories = this.categories.filter((c) => c.id !== id);
    this.save();
  }
}

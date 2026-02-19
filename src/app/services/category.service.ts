import { Injectable } from '@angular/core';
import { Category } from '../models/category.model';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  private categories: Category[] = [{ id: 'general', name: 'General' }];

  getCategories(): Category[] {
    return this.categories;
  }

  addCategory(name: string) {
    this.categories.push({
      id: Date.now().toString(),
      name,
    });
  }

  deleteCategory(id: string) {
    this.categories = this.categories.filter((c) => c.id !== id);
  }
}

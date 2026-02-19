import { Component, OnInit } from '@angular/core';
import { Category } from 'src/app/models/category.model';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.page.html',
  styleUrls: ['./categories.page.scss'],
})
export class CategoriesPage implements OnInit {
  categories: Category[] = [];
  newCategory: string = '';

  editingCategoryId: string | null = null;
  editingName: string = '';

  constructor(private categoryService: CategoryService) {}

  ngOnInit(): void {
    this.loadCategories();
  }

  loadCategories(): void {
    this.categories = this.categoryService.getCategories();
  }

  addCategory(): void {
    if (!this.newCategory.trim()) return;

    this.categoryService.addCategory(this.newCategory);
    this.newCategory = '';
    this.loadCategories();
  }

  startEdit(category: Category): void {
    this.editingCategoryId = category.id;
    this.editingName = category.name;
  }

  saveEdit(): void {
    if (!this.editingCategoryId || !this.editingName.trim()) return;

    this.categoryService.updateCategory(
      this.editingCategoryId,
      this.editingName,
    );

    this.editingCategoryId = null;
    this.editingName = '';
    this.loadCategories();
  }

  cancelEdit(): void {
    this.editingCategoryId = null;
    this.editingName = '';
  }

  deleteCategory(id: string): void {
    this.categoryService.deleteCategory(id);
    this.loadCategories();
  }
}

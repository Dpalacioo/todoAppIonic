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
  newCategory = '';

  constructor(private categoryService: CategoryService) {}

  ngOnInit(): void {
    this.loadCategories();
  }

  loadCategories(): void {
    this.categories = this.categoryService.getCategories();
  }

  addCategory(): void {
    if (!this.newCategory.trim()) {
      return;
    }

    this.categoryService.addCategory(this.newCategory);
    this.newCategory = '';
    this.loadCategories();
  }

  deleteCategory(id: string): void {
    this.categoryService.deleteCategory(id);
    this.loadCategories();
  }
}

import { Component, effect } from '@angular/core';
import { PageLayoutComponent } from '../../../shared/layouts/page-layout.component';
import { RecipesService } from '../../../core/services/recipes.service';
import { RecipeCategoriesComponent } from '../../recipes/recipe-categories.component';
import { RecipeCategoryComponent } from '../../recipes/recipe-category.component';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [PageLayoutComponent, RecipeCategoriesComponent, RecipeCategoryComponent],
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent {
  selectedCategory: string | null = null;

  constructor(public recipesService: RecipesService) {
    // Charger les catégories si ce n'est pas déjà fait
    if (!this.recipesService.categories()) {
      this.recipesService.fetchCategories();
    }
    // Sélectionner automatiquement la première catégorie quand elles sont chargées
    effect(() => {
      const cats = this.recipesService.categories();
      if (cats && cats.length > 0 && !this.selectedCategory) {
        this.selectedCategory = cats[0];
      }
    });
  }

  onCategorySelected(category: string) {
    this.selectedCategory = category;
  }
}


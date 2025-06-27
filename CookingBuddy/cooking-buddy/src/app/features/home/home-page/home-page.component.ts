import { Component, effect } from '@angular/core';
import { PageLayoutComponent } from '../../../shared/layouts/page-layout.component';
import { RecipesService } from '../../../core/services/recipes.service';
import { RecipeCategoriesComponent } from '../../recipes/recipe-categories.component';
import { RecipeCategoryComponent } from '../../recipes/recipe-category.component';
import { DetailedRecipeCardComponent } from '../../recipes/detailed-recipe-card.component';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [PageLayoutComponent, RecipeCategoriesComponent, RecipeCategoryComponent, DetailedRecipeCardComponent, MatIconModule, MatFormFieldModule, MatInputModule, RouterModule],
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent {
  selectedCategory: string | null = null;
  search: string = '';

  constructor(public recipesService: RecipesService, private router: Router) {
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

  onSearchChange(value: string) {
    this.search = value;
    if (value && value.trim().length > 0) {
      this.recipesService.searchRecipes(value.trim());
    } else {
      this.recipesService.searchResults.set(null);
    }
  }

  goToRecipe(id: string) {
    this.router.navigate(['/recipe', id]);
  }
}


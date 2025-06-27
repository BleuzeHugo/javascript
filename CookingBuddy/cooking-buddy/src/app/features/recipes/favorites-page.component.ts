import { Component, inject, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FavoritesService } from '../../core/services/favorites.service';
import { RecipesService } from '../../core/services/recipes.service';
import { DetailedRecipeCardComponent } from './detailed-recipe-card.component';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-favorites-page',
  standalone: true,
  imports: [CommonModule, RouterModule, DetailedRecipeCardComponent, MatIconModule],
  template: `
    <h1>Mes recettes favorites</h1>
    <div *ngIf="favoriteRecipes.length; else noFavs">
      <app-detailed-recipe-card
        *ngFor="let recipe of favoriteRecipes"
        [recipe]="recipe"
        (click)="goToRecipe(recipe.idMeal)"
      ></app-detailed-recipe-card>
    </div>
    <ng-template #noFavs>
      <p>Aucune recette favorite pour le moment.</p>
    </ng-template>
  `
})
export class FavoritesPageComponent {
  private favoritesService = inject(FavoritesService);
  private recipesService = inject(RecipesService);
  favoriteRecipes: any[] = [];

  constructor() {
    this.loadFavorites();
    effect(() => {
      this.loadFavorites();
    });
  }

  async loadFavorites() {
    const ids = this.favoritesService.favorites();
    this.favoriteRecipes = [];
    for (const id of ids) {
      const recipe = await this.recipesService.getRecipeById(id);
      if (recipe) this.favoriteRecipes.push(recipe);
    }
  }

  goToRecipe(id: string) {
    window.location.href = '/recipe/' + id;
  }
}

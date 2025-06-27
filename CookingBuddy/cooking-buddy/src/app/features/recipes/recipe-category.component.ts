import { Component, Input, signal } from '@angular/core';
import { RecipeCardComponent } from './recipe-card.component';
import { NgFor } from '@angular/common';
import { RecipesService } from '../../core/services/recipes.service';

@Component({
  selector: 'app-recipe-category',
  standalone: true,
  imports: [RecipeCardComponent, NgFor],
  template: `
    @if (recipes().length > 0) {
      <div>
        <app-recipe-card *ngFor="let recipe of recipes()" [recipe]="recipe"></app-recipe-card>
      </div>
    }
  `,
  styles: [`
    div {
      display: flex;
      flex-wrap: wrap;
      gap: 16px;
      justify-content: flex-start;
    }
  `]
})
export class RecipeCategoryComponent {
  @Input() set category(value: string | null) {
    this._category = value;
    this.loadRecipes();
  }
  get category() {
    return this._category;
  }
  private _category: string | null = null;
  recipes = signal<any[]>([]);

  constructor(private recipesService: RecipesService) {}

  async loadRecipes() {
    if (this._category) {
      const computedRecipes = this.recipesService.recipesResource(this._category);
      this.recipes.set(await computedRecipes());
    } else {
      this.recipes.set([]);
    }
  }
}

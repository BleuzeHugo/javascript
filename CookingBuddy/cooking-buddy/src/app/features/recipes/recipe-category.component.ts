import { Component, Input, Output, EventEmitter, signal } from '@angular/core';
import { RecipeCardComponent } from './recipe-card.component';
import { RecipesService } from '../../core/services/recipes.service';

@Component({
  selector: 'app-recipe-category',
  standalone: true,
  imports: [RecipeCardComponent],
  template: `
    @if (recipes().length > 0) {
      <div>
        @for (recipe of recipes(); track recipe.idMeal) {
          <app-recipe-card [recipe]="recipe" (cardClick)="onRecipeClick(recipe.idMeal)"></app-recipe-card>
        }
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
  @Output() recipeClick = new EventEmitter<string>();

  constructor(private recipesService: RecipesService) {}

  async loadRecipes() {
    if (this._category) {
      const computedRecipes = this.recipesService.recipesResource(this._category);
      this.recipes.set(await computedRecipes());
    } else {
      this.recipes.set([]);
    }
  }

  onRecipeClick(id: string) {
    this.recipeClick.emit(id);
  }
}

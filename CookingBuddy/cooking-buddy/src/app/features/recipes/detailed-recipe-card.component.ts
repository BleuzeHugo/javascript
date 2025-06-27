import { Component, Input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { FavoritesService } from '../../core/services/favorites.service';

@Component({
  selector: 'app-detailed-recipe-card',
  standalone: true,
  imports: [MatCardModule, MatIconModule],
  template: `
    @if (recipe) {
      <mat-card>
        <img mat-card-image [src]="recipe.strMealThumb" [alt]="recipe.strMeal" />
        <mat-card-title>
          {{ recipe.strMeal }}
          <button mat-icon-button (click)="toggleFavorite($event)" style="float:right;">
            <mat-icon color="warn">{{ isFavorite ? 'favorite' : 'favorite_border' }}</mat-icon>
          </button>
        </mat-card-title>
        <mat-card-subtitle>
          Catégorie : {{ recipe.strCategory }}<br />
          Origine : {{ recipe.strArea }}
        </mat-card-subtitle>
        <mat-card-content>
          @if (recipe.ingredients?.length) {
            <strong>Ingrédients :</strong>
            <ul>
              @for (ing of recipe.ingredients; track ing) {
                <li>{{ ing }}</li>
              }
            </ul>
          }
        </mat-card-content>
      </mat-card>
    }
  `,
  styles: [`
    mat-card {
      width: 350px;
      margin: 12px;
      display: inline-block;
      vertical-align: top;
    }
    img {
      object-fit: cover;
      height: 180px;
    }
    ul {
      margin: 0;
      padding-left: 18px;
    }
    button[mat-icon-button] {
      background: white;
      border-radius: 50%;
    }
  `]
})
export class DetailedRecipeCardComponent {
  @Input() recipe: any;
  isFavorite = false;

  constructor(private favoritesService: FavoritesService) {}

  ngOnChanges() {
    this.isFavorite = this.recipe && this.favoritesService.isFavorite(this.recipe.idMeal);
  }

  toggleFavorite(event: Event) {
    event.stopPropagation();
    if (!this.recipe) return;
    if (this.isFavorite) {
      this.favoritesService.removeFavorite(this.recipe.idMeal);
    } else {
      this.favoritesService.addFavorite(this.recipe.idMeal);
    }
    this.isFavorite = !this.isFavorite;
  }
}

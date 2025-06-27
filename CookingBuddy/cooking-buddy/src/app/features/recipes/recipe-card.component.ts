import { Component, Input, Output, EventEmitter } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { FavoritesService } from '../../core/services/favorites.service';

@Component({
  selector: 'app-recipe-card',
  standalone: true,
  imports: [MatCardModule, MatIconModule],
  template: `
    @if (recipe) {
      <mat-card (click)="cardClick.emit()">
        <img mat-card-image [src]="recipe.strMealThumb" [alt]="recipe.strMeal" />
        <mat-card-title>{{ recipe.strMeal }}</mat-card-title>
        <button mat-icon-button (click)="toggleFavorite($event)" style="position:absolute;top:8px;right:8px;z-index:2;">
          <mat-icon color="warn">{{ isFavorite ? 'favorite' : 'favorite_border' }}</mat-icon>
        </button>
      </mat-card>
    }
  `,
  styles: [`
    mat-card {
      width: 250px;
      margin: 8px;
      display: inline-block;
      vertical-align: top;
      position: relative;
    }
    img {
      object-fit: cover;
      height: 180px;
    }
    button[mat-icon-button] {
      background: white;
      border-radius: 50%;
    }
  `]
})
export class RecipeCardComponent {
  @Input() recipe: any;
  @Output() cardClick = new EventEmitter<void>();
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

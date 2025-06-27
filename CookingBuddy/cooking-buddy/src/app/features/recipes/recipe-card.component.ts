import { Component, Input, Output, EventEmitter } from '@angular/core';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-recipe-card',
  standalone: true,
  imports: [MatCardModule],
  template: `
    @if (recipe) {
      <mat-card (click)="cardClick.emit()">
        <img mat-card-image [src]="recipe.strMealThumb" [alt]="recipe.strMeal" />
        <mat-card-title>{{ recipe.strMeal }}</mat-card-title>
      </mat-card>
    }
  `,
  styles: [`
    mat-card {
      width: 250px;
      margin: 8px;
      display: inline-block;
      vertical-align: top;
    }
    img {
      object-fit: cover;
      height: 180px;
    }
  `]
})
export class RecipeCardComponent {
  @Input() recipe: any;
  @Output() cardClick = new EventEmitter<void>();
}

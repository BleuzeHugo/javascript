import { Component, Input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-detailed-recipe-card',
  standalone: true,
  imports: [MatCardModule],
  template: `
    @if (recipe) {
      <mat-card>
        <img mat-card-image [src]="recipe.strMealThumb" [alt]="recipe.strMeal" />
        <mat-card-title>{{ recipe.strMeal }}</mat-card-title>
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
  `]
})
export class DetailedRecipeCardComponent {
  @Input() recipe: any;
}

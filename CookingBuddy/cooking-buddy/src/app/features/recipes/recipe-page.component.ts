import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { RecipesService } from '../../core/services/recipes.service';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { YTHoverPlayDirective } from '../../shared/directives/yt-hover-play.directive';
import { DietDetectorPipe } from '../../shared/pipes/diet-detector.pipe';

@Component({
  selector: 'app-recipe-page',
  standalone: true,
  imports: [CommonModule, RouterModule, MatCardModule, MatButtonModule, YTHoverPlayDirective, DietDetectorPipe],
  template: `
    <ng-container *ngIf="recipe; else loading">
      <mat-card>
        <mat-card-header>
          <mat-card-title>
            {{ recipe.strMeal }}
            <span class="diet-badge" [ngClass]="(recipe.ingredients | dietDetector)">
              {{ recipe.ingredients | dietDetector }}
            </span>
          </mat-card-title>
          <mat-card-subtitle>
            Catégorie : {{ recipe.strCategory }} | Origine : {{ recipe.strArea }}<br />
            <a *ngIf="recipe.strSource" [href]="recipe.strSource" target="_blank">Source originale</a>
          </mat-card-subtitle>
        </mat-card-header>
        <img mat-card-image [src]="recipe.strMealThumb" [alt]="recipe.strMeal" />
        <mat-card-content>
          <h3>Ingrédients</h3>
          <ul>
            <li *ngFor="let ing of recipe.ingredients">{{ ing }}</li>
          </ul>
          <div *ngIf="recipe.strYoutube">
            <h3>Vidéo</h3>
            <iframe width="100%" height="315" [src]="getYoutubeEmbedUrl(recipe.strYoutube)" frameborder="0" allowfullscreen appYTHoverPlay></iframe>
          </div>
          <h3>Instructions</h3>
          <p style="white-space: pre-line">{{ recipe.strInstructions }}</p>
        </mat-card-content>
      </mat-card>
    </ng-container>
    <ng-template #loading>
      <p>Chargement de la recette...</p>
    </ng-template>
  `,
  styles: [`.diet-badge { margin-left: 12px; padding: 2px 10px; border-radius: 12px; font-size: 0.9em; background: #e0e0e0; color: #333; font-weight: bold; } .diet-badge.Vegan { background: #81c784; color: #fff; } .diet-badge.Vegetarian { background: #ffd54f; color: #333; } .diet-badge.Classic { background: #e57373; color: #fff; }`]
})
export class RecipePageComponent {
  private route = inject(ActivatedRoute);
  private recipesService = inject(RecipesService);
  private sanitizer = inject(DomSanitizer);
  recipe: any = null;

  constructor() {
    this.route.paramMap.subscribe(async params => {
      const id = params.get('id');
      if (id) {
        this.recipe = await this.recipesService.getRecipeById(id);
      }
    });
  }

  getYoutubeEmbedUrl(url: string): SafeResourceUrl {
    if (!url) return '';
    const videoId = url.split('v=')[1]?.split('&')[0];
    return this.sanitizer.bypassSecurityTrustResourceUrl(
      videoId ? `https://www.youtube.com/embed/${videoId}?enablejsapi=1` : ''
    );
  }
}

import { Injectable, signal, Signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { rxResource } from '@angular/core/rxjs-interop';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RecipesService {
  // Signal pour stocker les catégories
  private readonly _categories = signal<string[]>([]);
  readonly categories: Signal<string[]> = this._categories.asReadonly();

  // Resource pour récupérer les recettes d'une catégorie
  readonly recipesResource;

  constructor(private http: HttpClient) {
    this.fetchCategories();

    this.recipesResource = rxResource({
      query: (category: string) =>
        this.http
          .get<{ meals: any[] }>(
            `https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`
          )
          .pipe(map((res) => res.meals ?? [])),
      defaultValue: [],
    });
  }

  private fetchCategories() {
    this.http
      .get<{ categories: { strCategory: string }[] }>(
        'https://www.themealdb.com/api/json/v1/1/categories.php'
      )
      .subscribe((res) => {
        this._categories.set(res.categories.map((c) => c.strCategory));
      });
  }
}
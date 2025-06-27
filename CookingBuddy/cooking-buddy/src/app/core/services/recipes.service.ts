import { Injectable, signal, computed } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class RecipesService {
  // Signal pour stocker les catégories de recettes
  readonly categories = signal<string[] | null>(null);

  // Méthode pour charger les catégories depuis TheMealDB
  async fetchCategories() {
    const res = await fetch('https://www.themealdb.com/api/json/v1/1/categories.php');
    const data = await res.json();
    this.categories.set(data.categories.map((cat: any) => cat.strCategory));
  }

  // Resource pour récupérer toutes les recettes d'une catégorie
  public recipesResource(category: string) {
    return computed(async () => {
      if (!category) return [];
      const res = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`);
      const data = await res.json();
      return data.meals || [];
    });
  }

  // Signal pour stocker les résultats de recherche
  readonly searchResults = signal<any[] | null>(null);

  async searchRecipes(query: string) {
    if (!query) {
      this.searchResults.set(null);
      return;
    }
    const res = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${encodeURIComponent(query)}`);
    const data = await res.json();
    // On enrichit chaque recette avec la liste des ingrédients
    const results = (data.meals || []).map((meal: any) => ({
      ...meal,
      ingredients: Array.from({ length: 20 })
        .map((_, i) => {
          const ing = meal[`strIngredient${i + 1}`];
          const measure = meal[`strMeasure${i + 1}`];
          return ing ? `${ing}${measure ? ' (' + measure + ')' : ''}` : null;
        })
        .filter(Boolean),
    }));
    this.searchResults.set(results.length ? results : []);
  }

  async getRecipeById(id: string): Promise<any | null> {
    const res = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
    const data = await res.json();
    if (!data.meals || !data.meals.length) return null;
    const meal = data.meals[0];
    // Ajoute la liste des ingrédients comme dans searchRecipes
    meal.ingredients = Array.from({ length: 20 })
      .map((_, i) => {
        const ing = meal[`strIngredient${i + 1}`];
        const measure = meal[`strMeasure${i + 1}`];
        return ing ? `${ing}${measure ? ' (' + measure + ')' : ''}` : null;
      })
      .filter(Boolean);
    return meal;
  }
}
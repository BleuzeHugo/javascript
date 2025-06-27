import { Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class FavoritesService {
  private readonly STORAGE_KEY = 'favorites';
  private _favorites = signal<string[]>(this.loadFavorites());
  readonly favorites = this._favorites.asReadonly();

  private loadFavorites(): string[] {
    try {
      return JSON.parse(localStorage.getItem(this.STORAGE_KEY) || '[]');
    } catch {
      return [];
    }
  }

  private saveFavorites(favs: string[]) {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(favs));
  }

  addFavorite(id: string) {
    const favs = [...this._favorites()];
    if (!favs.includes(id)) {
      favs.push(id);
      this._favorites.set(favs);
      this.saveFavorites(favs);
    }
  }

  removeFavorite(id: string) {
    const favs = this._favorites().filter(f => f !== id);
    this._favorites.set(favs);
    this.saveFavorites(favs);
  }

  isFavorite(id: string): boolean {
    return this._favorites().includes(id);
  }
}

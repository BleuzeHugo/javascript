import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { NgFor } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { RecipesService } from '../../core/services/recipes.service';

@Component({
  selector: 'app-recipe-categories',
  standalone: true,
  imports: [NgFor, MatButtonModule],
  template: `
    @if (categories) {
      <div>
        <button *ngFor="let cat of categories" mat-raised-button color="primary" (click)="selectCategory(cat)">
          {{ cat }}
        </button>
      </div>
    }
  `,
  styles: [`
    div {
      display: flex;
      flex-wrap: wrap;
      gap: 12px;
      margin-bottom: 24px;
    }
    button {
      text-transform: capitalize;
    }
  `]
})
export class RecipeCategoriesComponent implements OnInit {
  @Input() categories: string[] | null = null;
  @Output() categorySelected = new EventEmitter<string>();

  ngOnInit() {}

  selectCategory(cat: string) {
    this.categorySelected.emit(cat);
  }
}

import { Component, OnInit } from '@angular/core';
import { PageLayoutComponent } from '../../../shared/layouts/page-layout.component';
import { RecipesService } from '../../../core/services/recipes.service';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [PageLayoutComponent],
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {
  categories: any;
  recipesResource: any;

  constructor(private recipesService: RecipesService) {}

  ngOnInit(): void {
    this.categories = this.recipesService.categories;
    this.recipesResource = this.recipesService.recipesResource;
  }
}

import { Routes } from '@angular/router';
import { HomePageComponent } from './features/home/home-page/home-page.component';
import { RegisterPage } from './features/register/register-page/register-page';
import { RecipePageComponent } from './features/recipes/recipe-page.component';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    component: HomePageComponent,
    canActivate: [authGuard],
  },
  {
    path: 'register',
    component: RegisterPage,
  },
  { 
    path: 'recipe/:id', 
    component: RecipePageComponent 
  },

];

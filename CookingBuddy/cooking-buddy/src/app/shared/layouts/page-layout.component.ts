import { Component } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-page-layout',
  standalone: true,
  imports: [MatToolbarModule, MatIconModule, RouterModule],
  templateUrl: './page-layout.component.html',
  styleUrls: ['./page-layout.component.css']
})
export class PageLayoutComponent {}
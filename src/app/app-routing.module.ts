import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HeroesComponent } from './components/heroes/heroes.component';
import { NewHeroeComponent } from './components/new-heroe/new-heroe.component';
import { ViewHeroeComponent } from './components/view-heroe/view-heroe.component';


const routes: Routes = [
  {
    path: 'heroes',
    children: [
      {
        path: '',
        component: HeroesComponent,
        pathMatch: 'full'
      },
      {
        path: 'new',
        component: NewHeroeComponent,
        pathMatch: 'full'
      },
      {
        path: ':id/view',
        component: ViewHeroeComponent,
        pathMatch: 'full'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GratitudeListComponent } from './gratitude-list/gratitude-list.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { AboutComponent } from './components/about/about.component';
import { HomeComponent } from './components/home/home.component';


const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'home' },
  { path: 'home', component: HomeComponent },
  { path: 'about', component: AboutComponent},
  { path: 'gratitude/:id', component: GratitudeListComponent},
  { path: 'gratitude', component: GratitudeListComponent},
  { path: '**', component: NotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NoticiaComponent } from './noticia/noticia.component';
import { ErrorPageComponent } from './error-page/error-page.component';
import { ComentsComponent } from './coments/coments.component';


const routes: Routes = [
  {
    path: '',
    redirectTo: 'top' , pathMatch: 'full'
  },
  {
    path: 'top',
    component: NoticiaComponent
  },
  {
    path: 'story/:id',
    component: ComentsComponent
  },
  {
    path: '404',
    component: ErrorPageComponent
  },
  {
    path: '**',
    redirectTo: '404'
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

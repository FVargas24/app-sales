import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { SaleFormComponent } from './components/sale-form/sale-form.component'; 


const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'ventas/nueva', component: SaleFormComponent },
  { path: '', redirectTo: 'home', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

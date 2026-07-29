import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { SaleFormComponent } from './components/sale-form/sale-form.component'; 
import { SaleListComponent } from './components/sale-list/sale-list.component'; // Importar


const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'ventas', component: SaleListComponent },
  { path: 'ventas/nueva', component: SaleFormComponent },
  { path: '', redirectTo: 'home', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

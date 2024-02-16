import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoryComponent } from './components/category/category.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { PostProductComponent } from './components/post-product/post-product.component';

const routes: Routes = [
  {path:"dashboard", component:DashboardComponent},
  {path:"category", component:CategoryComponent},
  {path: "product", component:PostProductComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }

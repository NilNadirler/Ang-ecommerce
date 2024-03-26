import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserGuard } from '../guards/user-guard/user.guard';
import { CartComponent } from './components/cart/cart.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { MyOrdersComponent } from './components/my-orders/my-orders.component';

const routes: Routes = [
  {path:"dashboard", component:DashboardComponent, canActivate: [UserGuard]},
  {path:"cart", component:CartComponent, canActivate: [UserGuard]},
  {path:"my_orders", component:MyOrdersComponent, canActivate: [UserGuard]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }

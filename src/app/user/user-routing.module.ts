import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserGuard } from '../guards/user-guard/user.guard';
import { CartComponent } from './components/cart/cart.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { MyOrdersComponent } from './components/my-orders/my-orders.component';
import { ReviewOrderedProductComponent } from './components/review-ordered-product/review-ordered-product.component';
import { ViewOrderProductComponent } from './components/view-order-product/view-order-product.component';
import { ViewProductDetailComponent } from './components/view-product-detail/view-product-detail.component';

const routes: Routes = [
  {path:"dashboard", component:DashboardComponent, canActivate: [UserGuard]},
  {path:"cart", component:CartComponent, canActivate: [UserGuard]},
  {path:"my_orders", component:MyOrdersComponent, canActivate: [UserGuard]},
  {path:"ordered_product/:orderId", component:ViewOrderProductComponent, canActivate: [UserGuard]},
  {path:"review/:productId", component:ReviewOrderedProductComponent, canActivate: [UserGuard]},
  {path:"product/:productId", component:ViewProductDetailComponent, canActivate: [UserGuard]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }

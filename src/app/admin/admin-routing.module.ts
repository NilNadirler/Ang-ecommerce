import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoryComponent } from './components/category/category.component';
import { CouponsComponent } from './components/coupons/coupons.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { OrdersComponent } from './components/orders/orders.component';
import { PostCouponComponent } from './components/post-coupon/post-coupon.component';
import { PostProductFaqComponent } from './components/post-product-faq/post-product-faq.component';
import { PostProductComponent } from './components/post-product/post-product.component';

const routes: Routes = [
  {path:"dashboard", component:DashboardComponent},
  {path:"category", component:CategoryComponent},
  {path: "product", component:PostProductComponent},
  {path: "post-coupon", component:PostCouponComponent},
  {path: "coupons", component:CouponsComponent},
  {path: "orders", component: OrdersComponent},
  {path: "faq/:productId", component: PostProductFaqComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }

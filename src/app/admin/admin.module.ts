import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { CategoryComponent } from './components/category/category.component';
import { HttpClientModule } from '@angular/common/http';
import { SharedModule } from 'src/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PostProductComponent } from './components/post-product/post-product.component';
import { PostCouponComponent } from './components/post-coupon/post-coupon.component';
import { CouponsComponent } from './components/coupons/coupons.component';
import { OrdersComponent } from './components/orders/orders.component';
import { PostProductFaqComponent } from './components/post-product-faq/post-product-faq.component';


@NgModule({
  declarations: [
    DashboardComponent,
    CategoryComponent,
    PostProductComponent,
    PostCouponComponent,
    CouponsComponent,
    OrdersComponent,
    PostProductFaqComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    SharedModule
  ]
})
export class AdminModule { }

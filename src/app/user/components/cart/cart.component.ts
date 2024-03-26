import { throwDialogContentAlreadyAttachedError } from '@angular/cdk/dialog';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { UserService } from '../../user.service';
import { PlaceOrderComponent } from '../place-order/place-order.component';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent {

  cartItems:any[]=[];
  order:any
  couponForm:FormGroup
  orderForm:FormGroup

  constructor(private userService:UserService,private fb:FormBuilder,
    private toastr:ToastrService, public matDialog:MatDialog){}

    ngOnInit():void{
       this.getCart();

      this.couponForm= this.fb.group({
        code :[null]
      })
    }



    getCart(): Observable<any>{
      this.cartItems =[];
      this.userService.getCartByUserId().subscribe(res=>{
        this.order=res;
        console.log(this.order)
        res.cartItems.forEach(element => {
          element.processedImg = 'data:image/jpeg;base64,'+ element.returnedImg
          this.cartItems.push(element)
          console.log(this.cartItems)
        });
      })

      return this.order;
    }

    applyCoupon(){     
       this.userService.applyCoupon(this.couponForm.get(['code'])!.value).subscribe((res)=>{
          console.log(res)
          this.toastr.success("Coupon added")
       })
       this.getCart()
    }

    increaseQuantity(productId:any){
   
      this.userService.increaseQuantity(productId).subscribe(res=>{
    
        this.getCart();
      })
      
    }
    decreaseQuantity(productId:any){

      this.userService.decreaseQuantity(productId).subscribe(res=>{
       
        this.getCart();
      })
     
    }

    placeOrder(){
      this.matDialog.open(PlaceOrderComponent)
    }

}

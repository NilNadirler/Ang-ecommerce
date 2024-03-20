import { throwDialogContentAlreadyAttachedError } from '@angular/cdk/dialog';
import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { UserService } from '../../user.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent {

  cartItems:any[]=[];
  order:any

  constructor(private userService:UserService,private fb:FormBuilder,
    private toastr:ToastrService, public matDialog:MatDialog){}

    ngOnInit():void{
       this.getCart();
    }

    getCart(){
      this.cartItems =[];
      this.userService.getCartByUserId().subscribe(res=>{
        this.order=res;
        res.cartItems.forEach(element => {
          element.processedImg = 'data:image/jpeg;base64,'+ element.returnImg
          this.cartItems.push(element);
          console.log(this.cartItems)
        });
      })
    }

}

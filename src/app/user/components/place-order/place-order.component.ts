import { throwDialogContentAlreadyAttachedError } from '@angular/cdk/dialog';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserService } from '../../user.service';

@Component({
  selector: 'app-place-order',
  templateUrl: './place-order.component.html',
  styleUrls: ['./place-order.component.css']
})
export class PlaceOrderComponent {

  orderForm:FormGroup

  constructor(private userService:UserService,private fb:FormBuilder,
    private toastr:ToastrService, public matDialog:MatDialog,private router:Router){}

    ngOnInit(){
      this.orderForm = this.fb.group({
        address:[null, [Validators.required]],
        orderDescription:[null]
      })
    }
    
    placeOrder(){
      this.userService.placeOrder(this.orderForm.value).subscribe(res=>{
        if(res.id !=null){
          this.toastr.success("Order places Successfully")
          this.router.navigateByUrl("/my_orders")
          this.closeForm()
        }else{
          this.toastr.error("something went wrong")
        }
      })
    }

    closeForm(){
      this.matDialog.closeAll();
    }



}

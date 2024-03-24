import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AdminService } from '../../service/admin.service';

@Component({
  selector: 'app-post-coupon',
  templateUrl: './post-coupon.component.html',
  styleUrls: ['./post-coupon.component.css']
})
export class PostCouponComponent {

  couponForm:FormGroup;

  constructor(private fb:FormBuilder, private router:Router, private toastr:ToastrService
    , private adminService:AdminService){}


    ngOnInit(){
      this.couponForm = this.fb.group({
        name:[null,[Validators.required]],
        code:[null,[Validators.required]],
        discount:[null,[Validators.required]],
        expirationDate:[null,[Validators.required]],
      })
    }

    addCoupon(){
      if(this.couponForm.valid){
        this.adminService.addCoupon(this.couponForm.value).subscribe(res=>{
          if(res.id != null){
            this.toastr.success("Coupon added succeafullty")
          }else{
            this.toastr.error(res.message);
          }
        })
      }
    }
}

import { Component } from '@angular/core';
import { AdminService } from '../../service/admin.service';

@Component({
  selector: 'app-coupons',
  templateUrl: './coupons.component.html',
  styleUrls: ['./coupons.component.css']
})
export class CouponsComponent {

  coupons:any

  constructor(private adminService:AdminService){}

  ngOnInit(){
      this.getCoupon();
  }

  getCoupon(){
    this.adminService.getAllCoupons().subscribe(res=>{
      this.coupons=res;
    })
  }
}

import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AdminService } from '../../service/admin.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent {

  orders:any

  constructor(private adminService:AdminService, private toastr:ToastrService){}

  ngOnInit(){
    
    this.getPlacedOrders();
  }

  getPlacedOrders(){
    this.adminService.getPlacedOrder().subscribe(res=>{
      this.orders =res;
      console.log(this.orders)
    })
  }

  changeOrderStatus(orderId:number, status:string){
    this.adminService.changeOrderStatus(orderId,status).subscribe(res=>{
      if(res.id !=null){
        this.toastr.success("Order status change")
        this.getPlacedOrders();
      }else{
        this.toastr.error("Somethin went wrong")
      }
    })
  }
}

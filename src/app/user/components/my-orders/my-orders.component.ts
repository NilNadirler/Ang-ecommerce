import { Component } from '@angular/core';
import { UserService } from '../../user.service';

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.css']
})
export class MyOrdersComponent {

  myOrders:any;

  constructor(private userService:UserService){}

  ngOnInit(){
    
    this.getMyOrders();
  }

  getMyOrders(){
    this.userService.getOrderByUserId().subscribe(res=>{
     console.log(res)
     this.myOrders=res;
    })
  }
}
